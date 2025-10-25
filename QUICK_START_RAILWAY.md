# Quick Start: Deploy to Railway in 5 Minutes

## Prerequisites
- GitHub account with your code pushed
- Railway account ([sign up here](https://railway.app))

## Step 1: Create Railway Project (2 min)

1. Go to https://railway.app/dashboard
2. Click **"New Project"**
3. Select **"Deploy from GitHub repo"**
4. Choose your `b4baking-web` repository
5. Railway detects Next.js and starts building

## Step 2: Add PostgreSQL (1 min)

1. In the project, click **"+ New"**
2. Select **"Database"** → **"Add PostgreSQL"**
3. Done! `DATABASE_URL` is automatically configured

## Step 3: Set Environment Variables (1 min)

1. Click your web service
2. Go to **"Variables"** tab
3. Add these:

```
ADMIN_PASSWORD=YourSecurePassword123
WHATSAPP_NUMBER=919876543210
```

## Step 4: Get Your URL (30 sec)

1. Go to **"Settings"** tab
2. Under **"Domains"**, click **"Generate Domain"**
3. Copy your URL: `your-app.up.railway.app`

## Step 5: Initialize Database (30 sec)

1. Visit: `https://your-app.up.railway.app/api/init`
2. You should see: `{"message":"Database initialized successfully","success":true}`

## Done! 🎉

Your site is now live:
- **Homepage**: `https://your-app.up.railway.app`
- **Admin Panel**: `https://your-app.up.railway.app/admin/login`

## First Steps After Deployment

1. Login to admin panel with your `ADMIN_PASSWORD`
2. Add your products
3. Upload custom banners (if desired)
4. Add brand logos
5. Test the quote request flow

## Need Help?

- Full guide: See `RAILWAY_DEPLOYMENT_GUIDE.md`
- Issues: Check Railway logs in your dashboard
- Support: Railway Discord or docs.railway.app

---

**Total deployment time: ~5 minutes** ⚡

