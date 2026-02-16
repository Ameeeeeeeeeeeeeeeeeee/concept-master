# 🚀 ConceptMaster Deployment Guide

This guide will walk you through deploying the ConceptMaster platform to production using **Vercel** (Frontend/API), **Neon** (PostgreSQL), and **Upstash** (Redis).

---

## 🏗️ Architecture Overview

- **Frontend & API**: Next.js 14 App Router deployed on Vercel.
- **Database**: PostgreSQL hosted on Neon (Serverless).
- **Caching**: Redis hosted on Upstash (Serverless).
- **AI**: Google Gemini API via Vercel Edge/Serverless functions.
- **Authentication**: JWT stored in HTTP-only cookies.

---

## 🛠️ Prerequisites

Ensure you have accounts on:

1. [Vercel](https://vercel.com/)
2. [Neon](https://neon.tech/)
3. [Upstash](https://upstash.com/)
4. [Google AI Studio](https://aistudio.google.com/)

---

## Step 1: Database Setup (Neon)

1. **Create a new project** in Neon.
2. **Copy the Connection String**. It will look like:
   `postgresql://neondb_owner:********@ep-cool-cloud-123456.us-east-2.aws.neon.tech/neondb?sslmode=require`
3. Since we use Prisma, ensure you append `?pgbouncer=true&connect_timeout=15` if using connection pooling later, but for now the direct connection string is fine for standard serverless functions.

---

## Step 2: Redis Setup (Upstash)

1. **Create a Redis database** in Upstash.
2. Select the region closest to your Vercel deployment (e.g., us-east-1).
3. **Copy the Redis URL** from the dashboard. It will look like:
   `redis://default:********@apt-shark-33230.upstash.io:33230`

---

## Step 3: Environment Variables

Prepare your environment variables. You'll need to add these to your Vercel project settings later.

```env
# Database (Neon)
DATABASE_URL="postgresql://neondb_owner:********@ep-cool-cloud-123456.us-east-2.aws.neon.tech/neondb?sslmode=require"

# Redis (Upstash)
REDIS_URL="redis://default:********@apt-shark-33230.upstash.io:33230"

# Authentication
JWT_SECRET="generate-a-long-random-string-here"
JWT_EXPIRES_IN="7d"

# AI Integration
GEMINI_API_KEY="AIzaSy..."

# App Config
NEXT_PUBLIC_APP_URL="https://your-project.vercel.app"
NEXT_PUBLIC_APP_NAME="ConceptMaster"
```

---

## Step 4: Deploy to Vercel

1. **Push your code to GitHub**.
2. **Import the project** in Vercel.
3. **Configure Build Command**:
   - Framework Preset: Next.js
   - Build Command: `npx prisma generate && next build`
     _(Important: You must run `prisma generate` before building)_
   - Output Directory: `.next`
   - Install Command: `npm install`
4. **Add Environment Variables**: Copy and paste the variables from Step 3.
5. **Click Deploy**.

---

## Step 5: Initialize Database

Once deployed, or locally before deployment, you need to push the schema to the database.

**Option A: Run from your local machine (easiest)**

1. Update your local `.env` with the **production DATABASE_URL**.
2. Run migration:
   ```bash
   npx prisma db push
   ```
   _(Note: `db push` is great for prototyping. For production workflows, use `prisma migrate deploy`)_

**Option B: Run via Vercel Command (if configured)**
You can add a "build" script in `package.json`:
`"build": "prisma generate && prisma db push && next build"`
_(Warning: `db push` may cause data loss if schema changes are destructive. Use with caution in production)_

---

## Step 6: Verify Deployment

1. Visit your Vercel URL (e.g., `https://concept-master.vercel.app`).
2. **Sign Up** for a new account.
3. **Ask AI** a question to verify API keys are working.
4. **Take a Quiz** to verify database reads/writes.

---

## ⚡ Performance Optimization Tips

- **Edge Caching**: AI responses are cached in Redis. Upstash is fast, but ensure it's in the same region as your Vercel functions for lowest latency.
- **Database Indexing**: The schema already includes indexes on `grade`, `subject`, `slug`, etc.
- **Static Content**: The landing page and grade listings are statically optimized by Next.js.

## 🐛 Troubleshooting

- **504 Gateway Timeout on AI Generation**: The Gemini API might take time. We use streaming to prevent this, but if Vercel times out (10s limit on free tier), consider upgrading to Pro or optimizing the prompt for shorter answers.
- **Prisma Connection Errors**: Ensure `DATABASE_URL` is correct and Neon is active. If you see connection limit errors, enable connection pooling in Neon and update the URL.
