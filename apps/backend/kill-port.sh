#!/bin/bash

# Script to kill processes running on a specific port
# Usage: ./kill-port.sh [PORT]

PORT=${1:-3001}

echo "🔍 Buscando procesos en el puerto $PORT..."

# Find processes using the port
PIDS=$(lsof -ti:$PORT)

if [ -z "$PIDS" ]; then
    echo "✅ No hay procesos ejecutándose en el puerto $PORT"
    exit 0
fi

echo "📋 Procesos encontrados:"
lsof -i:$PORT

echo ""
echo "🛑 Terminando procesos: $PIDS"

# Kill processes gracefully first
for PID in $PIDS; do
    echo "   Enviando SIGTERM a PID $PID..."
    kill -TERM $PID 2>/dev/null
done

# Wait a moment for graceful shutdown
sleep 2

# Check if any processes are still running
REMAINING=$(lsof -ti:$PORT)

if [ ! -z "$REMAINING" ]; then
    echo "⚠️  Algunos procesos no respondieron a SIGTERM, forzando cierre..."
    for PID in $REMAINING; do
        echo "   Enviando SIGKILL a PID $PID..."
        kill -KILL $PID 2>/dev/null
    done
    sleep 1
fi

# Final check
FINAL_CHECK=$(lsof -ti:$PORT)

if [ -z "$FINAL_CHECK" ]; then
    echo "✅ Puerto $PORT liberado correctamente"
else
    echo "❌ Error: Algunos procesos siguen activos en el puerto $PORT"
    lsof -i:$PORT
    exit 1
fi