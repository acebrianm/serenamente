# Stripe Testing Setup with ngrok

## 1. Install ngrok

### Option A: Download and install
```bash
# Download ngrok
curl -s https://ngrok-agent.s3.amazonaws.com/ngrok.asc | sudo tee /etc/apt/trusted.gpg.d/ngrok.asc
echo "deb https://ngrok-agent.s3.amazonaws.com buster main" | sudo tee /etc/apt/sources.list.d/ngrok.list
sudo apt update && sudo apt install ngrok

# Or use snap
sudo snap install ngrok
```

### Option B: Use npm (alternative)
```bash
npm install -g ngrok
```

## 2. Configure ngrok

1. Sign up at https://ngrok.com/
2. Get your auth token from the dashboard
3. Configure ngrok:
```bash
ngrok config add-authtoken YOUR_NGROK_TOKEN
```

## 3. Start your backend server
```bash
cd apps/backend
npm run dev
# Server should be running on port 3001 (or your configured port)
```

## 4. Start ngrok tunnel
```bash
# In a new terminal
ngrok http 3001
```

This will give you a public URL like: `https://abcd1234.ngrok.io`

## 5. Configure Stripe Webhook

1. Go to Stripe Dashboard → Developers → Webhooks
2. Click "Add endpoint"
3. Enter your ngrok URL + webhook path: `https://abcd1234.ngrok.io/api/payments/webhook`
4. Select events to send:
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
   - `payment_intent.created`
   - `payment_intent.processing`
5. Click "Add endpoint"
6. Copy the **Webhook signing secret** (starts with `whsec_`)

## 6. Update your .env file
```bash
# Add to apps/backend/.env
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
```

## 7. Test the webhook

Use Stripe CLI or the dashboard to send test events:
```bash
# Install Stripe CLI if not already installed
curl -s https://packages.stripe.com/api/security/keypair/stripe-cli-gpg/public | gpg --dearmor | sudo tee /usr/share/keyrings/stripe.gpg
echo "deb [signed-by=/usr/share/keyrings/stripe.gpg] https://packages.stripe.com/stripe-cli-debian-local stable main" | sudo tee -a /etc/apt/sources.list.d/stripe.list
sudo apt update
sudo apt install stripe

# Login to Stripe
stripe login

# Send test events
stripe events resend evt_test_webhook --webhook-endpoint https://abcd1234.ngrok.io/api/payments/webhook
```

## 8. Monitor webhook events

Watch your backend logs and ngrok dashboard:
- Backend: Check console for webhook processing logs
- ngrok: Visit http://127.0.0.1:4040 for request inspection

## Notes

- **ngrok URL changes**: Free ngrok URLs change each restart. Update Stripe webhooks accordingly.
- **Persistent URLs**: Consider ngrok paid plan for static URLs in development.
- **Security**: ngrok exposes your local server. Only use for development.
- **HTTPS**: Stripe requires HTTPS for webhooks (ngrok provides this automatically).

## Troubleshooting

1. **Webhook signature verification fails**: Check STRIPE_WEBHOOK_SECRET matches Stripe dashboard
2. **404 on webhook**: Verify the webhook URL path in Stripe matches your route
3. **Timeout**: Check if your backend is running and accessible via ngrok URL
4. **ngrok not found**: Ensure ngrok is properly installed and in PATH