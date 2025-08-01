# Comprehensive Stripe Testing Plan

## Overview
This document outlines a systematic approach to testing Stripe integration for the Serenamente events platform, covering payment flows, webhook handling, error scenarios, and security considerations.

## 1. Environment Setup

### Test Mode Configuration
- ✅ Use Stripe Test API keys (starts with `pk_test_` and `sk_test_`)
- ✅ Configure test webhook endpoints
- ✅ Set up ngrok for local webhook testing
- ✅ Use test payment methods only

### Required Test Credentials
```bash
# Test API Keys (from Stripe Dashboard)
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_test_...
```

## 2. Test Payment Methods

### Successful Payment Cards
```javascript
// Visa - Always succeeds
4242424242424242

// Mastercard - Always succeeds  
5555555555554444

// American Express - Always succeeds
378282246310005

// Discover - Always succeeds
6011111111111117
```

### Error Testing Cards
```javascript
// Generic decline
4000000000000002

// Insufficient funds
4000000000009995

// Lost card
4000000000009987

// Stolen card
4000000000009979

// Expired card
4000000000000069

// Incorrect CVC
4000000000000127

// Processing error
4000000000000119

// Requires authentication (3D Secure)
4000000000003220
```

### International Testing
```javascript
// Mexico (MXN) - Your primary currency
4000000000003220

// US (USD)
4242424242424242

// Europe (EUR)  
4000000000000598
```

## 3. Testing Scenarios

### 3.1 Happy Path Testing

#### Single Ticket Purchase
1. **Setup**: Create test event with price $100
2. **Action**: Purchase 1 ticket for "Test User"
3. **Expected Results**:
   - Payment intent created successfully
   - PaymentElement renders correctly
   - Payment completes successfully
   - Webhook received and processed
   - Ticket created in database
   - Confirmation email sent
   - User redirected to success page

#### Multiple Ticket Purchase
1. **Setup**: Same test event
2. **Action**: Purchase 3 tickets for ["User1", "User2", "User3"]
3. **Expected Results**:
   - Payment intent for $300 created
   - All 3 tickets created in single transaction
   - Multiple confirmation emails sent
   - Success page shows all attendees

### 3.2 Payment Flow Testing

#### Test Payment Intent Creation
```javascript
// Test payload
{
  "eventId": "550e8400-e29b-41d4-a716-446655440001",
  "attendees": ["Test User 1", "Test User 2"]
}

// Expected response
{
  "message": "Intención de pago creada exitosamente",
  "payment": {
    "clientSecret": "pi_xxx_secret_xxx",
    "paymentIntentId": "pi_xxx",
    "amount": 200,
    "currency": "MXN",
    "eventName": "Test Event",
    "ticketCount": 2,
    "pricePerTicket": 100
  }
}
```

#### Test Payment Confirmation
1. Complete payment in Stripe
2. Verify webhook receives `payment_intent.succeeded`
3. Check tickets created in database
4. Verify email notifications sent

### 3.3 Error Scenario Testing

#### Backend Errors
- **Invalid Event ID**: Non-existent event UUID
- **Inactive Event**: Event with `isActive: false`
- **Invalid User**: Non-existent or inactive user
- **Empty Attendees**: Empty or invalid attendees array
- **Database Errors**: Simulate database connection issues

#### Payment Errors
- **Declined Cards**: Test with declined card numbers
- **Network Issues**: Simulate network timeouts
- **Invalid Amounts**: Test with negative or zero amounts
- **Currency Mismatches**: Test unsupported currencies

#### Webhook Errors
- **Invalid Signatures**: Test with wrong webhook secrets
- **Duplicate Events**: Test idempotency handling
- **Processing Failures**: Simulate ticket creation failures
- **Timeout Scenarios**: Test webhook timeout handling

### 3.4 Security Testing

#### Authentication Testing
- **Valid JWT**: Test with authenticated user
- **Invalid JWT**: Test with malformed tokens
- **Expired JWT**: Test with expired tokens
- **Missing JWT**: Test unauthenticated requests

#### Input Validation
- **SQL Injection**: Test malicious input in attendee names
- **XSS Prevention**: Test script injection in form fields
- **Large Payloads**: Test with oversized request bodies
- **Invalid UUIDs**: Test with malformed event/user IDs

#### Rate Limiting (if implemented)
- **Burst Requests**: Test rapid successive payments
- **Concurrent Payments**: Test simultaneous payment attempts

## 4. Webhook Testing

### 4.1 Event Types to Test
```javascript
// Primary events
'payment_intent.succeeded'     // ✅ Implemented
'payment_intent.payment_failed' // ✅ Implemented

// Additional events to consider
'payment_intent.requires_action'
'payment_intent.processing'
'payment_intent.canceled'
'charge.dispute.created'
```

### 4.2 Webhook Validation
- **Signature Verification**: Test valid/invalid signatures
- **Idempotency**: Test duplicate webhook delivery
- **Ordering**: Test out-of-order event delivery
- **Retry Logic**: Test webhook retry behavior

### 4.3 Using Stripe CLI for Webhook Testing
```bash
# Forward webhooks to local server
stripe listen --forward-to localhost:3001/api/payments/webhook

# Trigger specific events
stripe trigger payment_intent.succeeded
stripe trigger payment_intent.payment_failed

# Trigger with custom data
stripe trigger payment_intent.succeeded --add payment_intent:metadata[eventId]=test-event-id
```

## 5. Integration Testing

### 5.1 End-to-End Flow
1. **User Registration/Login**: Create and authenticate test user
2. **Event Creation**: Create test event (admin user)
3. **Event Browsing**: Navigate to event page
4. **Ticket Selection**: Add multiple attendees
5. **Payment Process**: Complete payment flow
6. **Confirmation**: Verify success page and emails
7. **Ticket Management**: Check "My Tickets" page

### 5.2 Database State Verification
```sql
-- Verify payment intent metadata
SELECT * FROM tickets WHERE eventId = 'test-event-id';

-- Check user tickets
SELECT t.*, e.name, u.email 
FROM tickets t 
JOIN events e ON t.eventId = e.id 
JOIN users u ON t.userId = u.id 
WHERE u.email = 'test@example.com';

-- Verify ticket counts
SELECT eventId, COUNT(*) as ticket_count 
FROM tickets 
GROUP BY eventId;
```

## 6. Performance Testing

### 6.1 Load Testing
- **Concurrent Payments**: Test multiple simultaneous purchases
- **Large Events**: Test with high-capacity events
- **Payment Spikes**: Simulate flash sale scenarios

### 6.2 Timeout Testing
- **Payment Intent Creation**: Test under database load
- **Webhook Processing**: Test with slow external services
- **Email Delivery**: Test with email service delays

## 7. Monitoring & Debugging

### 7.1 Logging Strategy
```javascript
// Payment Intent Creation
console.log('Payment request received:', {
  eventId, attendees, userId, timestamp: new Date().toISOString()
});

// Webhook Processing
console.log('Webhook received:', {
  type: event.type,
  paymentIntentId: event.data.object.id,
  status: event.data.object.status
});

// Error Handling
console.error('Payment error:', {
  error: error.message,
  stack: error.stack,
  context: { eventId, userId, attendees }
});
```

### 7.2 Monitoring Tools
- **Stripe Dashboard**: Monitor payments and webhooks
- **ngrok Inspector**: http://127.0.0.1:4040 for request debugging
- **Database Logs**: Monitor transaction failures
- **Application Logs**: Track payment flow errors

## 8. Test Automation

### 8.1 Unit Tests
```javascript
// Example test structure
describe('Payment Service', () => {
  describe('createPaymentIntent', () => {
    it('should create payment intent for single ticket', async () => {
      // Test implementation
    });
    
    it('should create payment intent for multiple tickets', async () => {
      // Test implementation
    });
    
    it('should throw error for invalid event', async () => {
      // Test implementation
    });
  });
});
```

### 8.2 Integration Tests
```javascript
// API endpoint testing
describe('POST /api/payments/create-payment-intent', () => {
  it('should return 201 with valid payment data', async () => {
    // Test implementation
  });
  
  it('should return 400 for invalid request', async () => {
    // Test implementation
  });
  
  it('should return 401 for unauthenticated request', async () => {
    // Test implementation
  });
});
```

## 9. Production Readiness Checklist

### 9.1 Security
- [ ] All API keys are environment variables
- [ ] Webhook signatures are validated
- [ ] Input validation on all endpoints
- [ ] Rate limiting implemented
- [ ] HTTPS enforced
- [ ] Error messages don't leak sensitive data

### 9.2 Reliability
- [ ] Database transactions for ticket creation
- [ ] Idempotent webhook handling
- [ ] Proper error handling and rollbacks
- [ ] Monitoring and alerting setup
- [ ] Backup and recovery procedures

### 9.3 Compliance
- [ ] PCI compliance requirements met
- [ ] Data privacy regulations followed
- [ ] Terms of service updated
- [ ] Refund policy implemented

## 10. Common Testing Pitfalls

### 10.1 Avoid These Mistakes
- **Using real payment methods**: Always use test cards
- **Skipping webhook testing**: Webhooks are critical for completion
- **Not testing failures**: Error scenarios are as important as success
- **Ignoring race conditions**: Test concurrent operations
- **Hardcoded test data**: Use dynamic test data generation

### 10.2 Best Practices
- **Test in isolation**: Each test should be independent
- **Clean up after tests**: Remove test data between runs
- **Use realistic data**: Test with production-like scenarios
- **Document edge cases**: Keep track of unusual scenarios
- **Regular testing**: Run tests frequently during development

## Conclusion

This comprehensive testing plan ensures robust Stripe integration. Start with basic happy path testing, then gradually cover edge cases and error scenarios. Regular testing throughout development prevents integration issues in production.

Remember: **Never use real payment methods or live API keys during testing!**