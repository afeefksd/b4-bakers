# Deployment Guide for B4-Baking Website

This guide will walk you through deploying the B4-Baking website to Vercel.

## Prerequisites

- GitHub account
- Vercel account (sign up at https://vercel.com)
- Node.js installed locally (for testing)

## Step-by-Step Deployment

### Option 1: Deploy via Vercel Dashboard (Recommended)

#### 1. Push Code to GitHub

```bash
cd b4baking-web
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin <your-github-repo-url>
git push -u origin main
```

#### 2. Import to Vercel

1. Go to https://vercel.com/dashboard
2. Click "Add New..." → "Project"
3. Import your GitHub repository
4. Configure project:
   - **Framework Preset**: Next.js
   - **Root Directory**: ./
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`

#### 3. Add Environment Variables

Before clicking Deploy, add these environment variables:

```
ADMIN_PASSWORD=your_secure_password_here
WHATSAPP_NUMBER=919876543210
```

(Replace with your actual values)

#### 4. Deploy

Click "Deploy" and wait for the build to complete.

#### 5. Set Up Vercel KV Storage

1. After deployment, go to your project dashboard
2. Click on "Storage" tab
3. Click "Create Database" → "KV"
4. Name it (e.g., "b4baking-kv")
5. Select the same region as your deployment
6. Click "Create"
7. Connect to your project (this automatically adds KV environment variables)

#### 6. Set Up Vercel Blob Storage

1. Still in the Storage tab
2. Click "Create Database" → "Blob"
3. Name it (e.g., "b4baking-blob")
4. Click "Create"
5. Connect to your project (this adds BLOB_READ_WRITE_TOKEN)

#### 7. Redeploy

1. Go to "Deployments" tab
2. Click on the three dots (...) on your latest deployment
3. Click "Redeploy"
4. Check "Use existing Build Cache"
5. Click "Redeploy"

This ensures your app has access to the storage environment variables.

### Option 2: Deploy via Vercel CLI

#### 1. Install Vercel CLI

```bash
npm install -g vercel
```

#### 2. Login

```bash
vercel login
```

#### 3. Navigate to Project

```bash
cd b4baking-web
```

#### 4. Deploy

```bash
vercel
```

Follow the prompts:
- "Set up and deploy"? → Yes
- Which scope? → Select your account
- Link to existing project? → No (first time)
- Project name? → b4baking (or your choice)
- Directory? → ./
- Override settings? → No

#### 5. Set Environment Variables

```bash
vercel env add ADMIN_PASSWORD
# Enter: your_secure_password

vercel env add WHATSAPP_NUMBER
# Enter: 919876543210
```

#### 6. Add Storage (via Dashboard)

Follow steps 5-6 from Option 1 above to add KV and Blob storage.

#### 7. Deploy to Production

```bash
vercel --prod
```

## Post-Deployment Setup

### 1. Initialize Data

Visit your website URL. The first load will automatically initialize:
- Banner images (from the 9 uploaded banners)
- Brand logos (from the 5 uploaded brands)
- Sample products

### 2. Access Admin Panel

1. Go to `https://your-domain.vercel.app/admin/login`
2. Enter the password you set in ADMIN_PASSWORD
3. You should now have access to the admin panel

### 3. Add Your Products

1. Navigate to "Products"
2. Click "+ Add Product"
3. Fill in product details
4. Upload product images
5. Save

### 4. Test WhatsApp Integration

1. Browse shop as a customer
2. Add items to cart
3. Go to quote page
4. Fill in details
5. Click "Send Quote Request via WhatsApp"
6. Verify the WhatsApp message is formatted correctly

## Updating Your Site

### Update Code

```bash
# Make your changes
git add .
git commit -m "Your update message"
git push
```

Vercel will automatically deploy your changes.

### Update Environment Variables

Via Vercel Dashboard:
1. Project Settings → Environment Variables
2. Edit or add variables
3. Redeploy for changes to take effect

## Troubleshooting

### Issue: "KV is not defined" or similar errors

**Solution**: Make sure you've created and connected the Vercel KV database to your project, then redeploy.

### Issue: Image uploads failing

**Solution**: Ensure Vercel Blob is set up and the BLOB_READ_WRITE_TOKEN is available in your environment variables.

### Issue: Can't login to admin

**Solution**: Check that ADMIN_PASSWORD environment variable is set correctly. Note: Environment variable changes require a redeployment.

### Issue: Banners/Brands not showing

**Solution**: Make sure the image files are in the public folder and committed to your repository.

### Issue: WhatsApp link not working

**Solution**: Verify WHATSAPP_NUMBER is in the correct format (country code + number without + or spaces, e.g., 919876543210)

## Vercel Free Tier Limits

Your B4-Baking website is designed to work within Vercel's free tier:

- **Bandwidth**: 100GB/month
- **Function Executions**: 100GB-Hours
- **KV Storage**: 256MB, 100K commands/month
- **Blob Storage**: 1GB

These limits are typically sufficient for a small to medium wholesale business website.

## Custom Domain (Optional)

To add a custom domain:

1. Go to Project Settings → Domains
2. Add your domain
3. Follow DNS configuration instructions
4. Wait for DNS propagation (can take up to 48 hours)

## Security Best Practices

1. **Use a strong admin password**: At least 12 characters with mix of letters, numbers, and symbols
2. **Regularly update dependencies**: Run `npm update` periodically
3. **Monitor access logs**: Check Vercel analytics for unusual activity
4. **Keep admin URL private**: Don't share the /admin path publicly

## Support

If you encounter any issues during deployment:

1. Check Vercel deployment logs in the dashboard
2. Review the project README.md
3. Check Vercel documentation: https://vercel.com/docs
4. Contact B4-Baking technical support

## Success! 🎉

Your B4-Baking website should now be live. Share your URL with customers and start receiving quote requests!

