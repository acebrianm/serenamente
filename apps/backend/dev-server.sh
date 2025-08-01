#!/bin/bash

# Development server script with automatic port cleanup
# This script ensures clean server restarts without "address in use" errors

PORT=${1:-3001}
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo "🚀 Iniciando servidor de desarrollo en puerto $PORT"

# Function to cleanup on exit
cleanup() {
    echo ""
    echo "🛑 Limpiando procesos..."
    
    # Kill any remaining processes on the port
    PIDS=$(lsof -ti:$PORT 2>/dev/null)
    if [ ! -z "$PIDS" ]; then
        echo "   Terminando procesos en puerto $PORT: $PIDS"
        kill -TERM $PIDS 2>/dev/null
        sleep 1
        
        # Force kill if still running
        REMAINING=$(lsof -ti:$PORT 2>/dev/null)
        if [ ! -z "$REMAINING" ]; then
            kill -KILL $REMAINING 2>/dev/null
        fi
    fi
    
    echo "✅ Limpieza completada"
    exit 0
}

# Set up trap to cleanup on script exit
trap cleanup SIGINT SIGTERM EXIT

# Kill any existing processes on the port
echo "🔍 Verificando puerto $PORT..."
EXISTING_PIDS=$(lsof -ti:$PORT 2>/dev/null)

if [ ! -z "$EXISTING_PIDS" ]; then
    echo "⚠️  Puerto $PORT está en uso. Liberando..."
    "$SCRIPT_DIR/kill-port.sh" $PORT
    sleep 1
fi

# Start the development server
echo "▶️  Iniciando tsx watch..."
exec tsx watch src/index.ts