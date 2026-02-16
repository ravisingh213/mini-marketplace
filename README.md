# 🛒 Mini Marketplace Payment System

A production-style Mini Marketplace Payment System demonstrating
webhook-based payment confirmation, vendor onboarding lifecycle,
commission calculation, and wallet accounting.

------------------------------------------------------------------------

## 📌 Overview

This project simulates a real-world marketplace payment architecture
similar to Stripe Connect.

Key Highlights:

-   Vendor onboarding lifecycle
-   Backend-controlled 10% commission
-   Webhook-driven payment confirmation
-   Atomic wallet updates using `$inc`
-   Idempotent webhook handling
-   Clean modular backend structure

------------------------------------------------------------------------

## 🏗 Tech Stack

### Frontend

-   React

### Backend

-   Node.js
-   Express.js
-   MongoDB
-   Mongoose

------------------------------------------------------------------------

## 👥 Roles

  Role       Description
  ---------- ---------------------------
  Customer   Purchases products\
  Vendor     Onboards & receives funds\
  Platform   Collects 10% commission

------------------------------------------------------------------------

## 🔄 Payment Flow

Customer → Frontend → Backend\
Create Payment (status = pending)\
Simulated Webhook Event\
Update Payment → success\
Credit Vendor Wallet (90%)\
Credit Platform Wallet (10%)

------------------------------------------------------------------------

## 💳 Commission Logic

Example:

Product Price: ₹1000\
Platform Fee (10%): ₹100\
Vendor Receives: ₹900

All calculations are handled securely on the backend.

------------------------------------------------------------------------

## 🔐 Vendor Onboarding

Vendor Status:

-   not_connected
-   pending
-   active

Rules:

-   Vendor must be ACTIVE before receiving payments.
-   Resume onboarding allowed if status = pending.

------------------------------------------------------------------------

## 📡 API Endpoints

### POST /vendor/onboard

Start or resume onboarding.

### GET /vendor/wallet/:vendorId

Fetch vendor wallet balance.

### POST /create-payment

Create payment (status = pending).

### POST /webhook

Handle simulated payment.success event.

### GET /payment/:id

Fetch payment status.

### GET /platform/wallet

Fetch admin wallet balance.

------------------------------------------------------------------------

## 🗄 Database Collections

-   users
-   vendors
-   products
-   payments (paymentIntentId indexed & unique)
-   wallets

------------------------------------------------------------------------

## 🧠 Idempotency Strategy

-   Unique index on paymentIntentId
-   Ignore webhook if payment already success
-   Atomic wallet update using `$inc`

------------------------------------------------------------------------

## 📂 Project Structure

src/ ├── controllers/ ├── services/ ├── models/ ├── routes/ ├──
middlewares/ └── utils/

------------------------------------------------------------------------

## ⚙ Environment Variables

Create a `.env` file in backend:

PORT=5000\
MONGO_URI="your mongodb url"\
WEBHOOK_SECRET=mock_secret

------------------------------------------------------------------------

## 🚀 Run Project

### Backend

npm install\
nodemon server.js

### Frontend

npm install\
npm run start


























-   Wallet updates are atomic and idempotent.
-   Commission is securely calculated on backend.
