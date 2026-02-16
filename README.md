🛒 Mini Marketplace Payment System

A full-stack Mini Marketplace Payment System built using:

Frontend: React

Backend: Node.js + Express

Database: MongoDB

Payment Simulation: Mock Stripe-like Webhook System

📌 Objective

Build a Mini Marketplace Payment System that demonstrates:

Vendor onboarding flow

Backend-controlled commission calculation

Webhook-based payment confirmation

Wallet accounting with atomic updates

Idempotent webhook handling

The system simulates real-world marketplace payment architecture similar to Stripe Connect.

👥 System Roles
1️⃣ Customer

View products

Click Pay Now

Track payment status

2️⃣ Vendor

Complete onboarding

Receive funds in wallet

View wallet balance

3️⃣ Platform (Admin)

Collect 10% commission

Maintain platform wallet

🏗 High-Level Architecture
Customer
↓
Frontend (React)
↓
Backend (Node.js + Express)
↓
Create Payment (status = pending)
↓
Simulated Webhook Event
↓
Update Payment Status → success
↓
Credit Vendor Wallet (90%)
Credit Platform Wallet (10%)

💳 Payment Flow (Step-by-Step)
1️⃣ Vendor Onboarding

Vendor status types:

not_connected

pending

active

Vendor must be ACTIVE before receiving payments.

2️⃣ Create Payment
Endpoint:
POST /create-payment

Request Body:
{
"productId": "PRODUCT_ID",
"customerId": "CUSTOMER_ID"
}

Backend Logic:

Validate vendor is ACTIVE

Calculate 10% platform fee

Generate paymentIntentId

Save payment with:

status = pending

3️⃣ Webhook Simulation (Single Source of Truth)
Endpoint:
POST /webhook

Payload:
{
"eventType": "payment.success",
"paymentIntentId": "xyz123"
}

Webhook Responsibilities:

Verify signature (mock allowed)

Prevent duplicate processing (idempotency)

Update payment status → success

Credit vendor wallet

Credit platform wallet

⚠ Payment success must ONLY happen via webhook.

💰 Commission Logic

Example:

Product Price = ₹1000
Platform Fee (10%) = ₹100
Vendor Receives = ₹900

Wallet Updates (Atomic using $inc):

Vendor Wallet +900
Platform Wallet +100

🗄 Database Collections
1️⃣ users

name

email

password

role (customer / vendor / admin)

2️⃣ vendors

userId

status (not_connected / pending / active)

onboardingLink

3️⃣ products

name

price

vendorId

4️⃣ payments

productId

customerId

vendorId

amount

platformFee

paymentIntentId (unique + indexed)

status (pending / success / failed)

5️⃣ wallets

ownerId

ownerType (vendor / platform)

balance

🔐 Important Architectural Rules

✅ Frontend must NOT mark payment as success
✅ Webhook is the single source of truth
✅ Platform fee calculated on backend only
✅ Duplicate webhook events must not double-credit wallets
✅ paymentIntentId must have unique index

🔄 Idempotency Handling

To prevent duplicate wallet credit:

Unique index on paymentIntentId

Check payment status before processing webhook

Ignore if already success

📡 API Endpoints
Vendor
POST /vendor/onboard

Start or resume onboarding

GET /vendor/wallet

Get vendor wallet balance

Payment
POST /create-payment

Create payment (pending state)

POST /webhook

Simulated gateway event

GET /payment/:id

Fetch payment status

📂 Project Structure
src/controllers/
src/routes/
src/services/
src/models/
src/middlewares/
src/utils/

Responsibilities:

Controllers → Handle request/response

Services → Business logic

Models → Mongoose schemas

Routes → API mapping

Middlewares → Validation & error handling

🚀 How to Run
Backend
npm install
node server.js

Frontend
npm install
npm run start

🧠 Key Concepts Demonstrated

Marketplace architecture

Vendor onboarding lifecycle

Webhook-driven payment confirmation

Commission calculation logic

Wallet accounting

Idempotent event handling

Clean modular backend architecture
