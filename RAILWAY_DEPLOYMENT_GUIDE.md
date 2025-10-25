# Railway Deployment Guide

Complete guide for deploying B4-Baking website on Railway with PostgreSQL database.

## Why Railway?

Railway was chosen for this deployment because it offers:

✅ **Cost-Effective**: Free tier with $5 monthly credit
✅ **Built-in PostgreSQL**: No external database service needed
✅ **Persistent Storage**: File uploads persist across deployments
✅ **Automatic Deployments**: Push to GitHub and it deploys automatically
✅ **Easy Setup**: No complex configuration required

## Prerequisites

Before you begin, ensure you have:

- GitHub account
- Your code pushed to a GitHub repository
- Railway account (sign up at [railway.app](https://railway.app))

## Step-by-Step Deployment

### 1. Prepare Your Repository

Make sure your code is pushed to GitHub:

```bash
git add .
git commit -m "Prepare for Railway deployment"
git push origin main
```

### 2. Create Railway Project

1. Go to [Railway Dashboard](https://railway.app/dashboard)
2. Click **"New Project"**
3. Select **"Deploy from GitHub repo"**
4. If first time, authorize Railway to access your GitHub
5. Select your `b4baking-web` repository
6. Railway will automatically detect it's a Next.js project

### 3. Add PostgreSQL Database

1. In your Railway project dashboard, click **"+ New"**
2. Select **"Database"**
3. Choose **"Add PostgreSQL"**
4. Railway will provision a database and automatically set `DATABASE_URL`

### 4. Configure Environment Variables

1. Click on your **web service** (the one with your code)
2. Go to **"Variables"** tab
3. Click **"+ New Variable"**
4. Add these variables:

| Variable Name | Example Value | Description |
|---------------|---------------|-------------|
| `ADMIN_PASSWORD` | `MySecurePass123!` | Password for admin panel |
| `WHATSAPP_NUMBER` | `919876543210` | WhatsApp number (country code + number, no +) |

**Note**: `DATABASE_URL` is automatically provided by the PostgreSQL service, don't add it manually.

### 5. Wait for Deployment

1. Railway will automatically build and deploy your application
2. Watch the **"Deployments"** tab for progress
3. Build typically takes 2-5 minutes
4. Once complete, you'll see a green checkmark

### 6. Get Your Public URL

1. In your web service, go to **"Settings"** tab
2. Scroll to **"Domains"** section
3. Click **"Generate Domain"**
4. You'll get a URL like: `b4baking-web-production.up.railway.app`
5. Copy this URL

### 7. Initialize the Database

This is a **critical step** - you must do this once after first deployment:

1. Visit: `https://your-app.up.railway.app/api/init`
2. You should see:
   ```json
   {
     "message": "Database initialized successfully",
     "success": true
   }
   ```
3. This creates all database tables and seeds initial data

### 8. Verify Your Deployment

Test these URLs:

- **Homepage**: `https://your-app.up.railway.app`
- **Shop**: `https://your-app.up.railway.app/shop`
- **Admin Login**: `https://your-app.up.railway.app/admin/login`

## Common Issues & Solutions

### Issue: "Cannot connect to database"

**Solution**: Make sure PostgreSQL service is running and linked:
1. Check PostgreSQL service status (should be green)
2. Verify `DATABASE_URL` variable exists in your web service
3. Try redeploying the web service

### Issue: "401 Unauthorized" when uploading images

**Solution**: Make sure you're logged in to the admin panel:
1. Go to `/admin/login`
2. Enter your `ADMIN_PASSWORD`
3. Try uploading again

### Issue: Uploaded images don't persist

**Solution**: Railway requires persistent volumes for file storage:
1. In your web service, go to "Settings"
2. Scroll to "Volumes"
3. Add a volume mounted at `/app/public/uploads`
4. Redeploy the service

### Issue: Database initialization fails

**Solution**: Check PostgreSQL logs:
1. Click on PostgreSQL service
2. Check "Logs" tab for errors
3. Ensure database is fully provisioned (takes 1-2 minutes)
4. Try visiting `/api/init` again

### Issue: Build fails

**Solution**: Check the build logs:
1. Go to "Deployments" tab
2. Click on failed deployment
3. Check error messages
4. Common fixes:
   - Ensure all dependencies are in `package.json`
   - Check for TypeScript errors
   - Verify Node.js version compatibility

## Managing Your Application

### Viewing Logs

1. Click on your web service
2. Go to **"Logs"** tab
3. See real-time application logs
4. Use for debugging issues

### Redeploying

**Automatic**: Push to GitHub main branch
```bash
git push origin main
```

**Manual**: In Railway dashboard
1. Go to "Deployments"
2. Click "Deploy" on latest commit

### Environment Variable Changes

After changing environment variables:
1. Railway automatically redeploys
2. Wait for deployment to complete
3. Changes take effect immediately

### Database Backups

Railway Pro plans include automatic backups:
1. Click on PostgreSQL service
2. Go to "Backups" tab
3. Configure backup schedule

Free tier: Use manual backups via pg_dump

### Monitoring Usage

Check your usage to stay within free tier:
1. Go to Railway dashboard
2. Click "Usage" in sidebar
3. Monitor:
   - Execution hours
   - Network bandwidth
   - Database storage

## Cost Optimization

### Free Tier Limits

Railway provides $5 credit monthly:
- Typically covers small to medium traffic sites
- ~500 hours of runtime
- PostgreSQL included

### Staying Within Free Tier

1. **Optimize Images**: Compress before uploading
2. **Monitor Traffic**: Check usage regularly
3. **Efficient Queries**: Database queries are optimized
4. **Static Assets**: Images served from same server (no CDN costs)

### When You Outgrow Free Tier

If you exceed $5/month:
1. Railway charges overage at pay-as-you-go rates
2. Typically $5-10/month for small business sites
3. Still very cost-effective compared to competitors

## Security Best Practices

### 1. Strong Admin Password

```env
ADMIN_PASSWORD=Use@Strong#Password123!
```

- Minimum 12 characters
- Mix of letters, numbers, symbols
- Don't share publicly

### 2. Environment Variables

- Never commit `.env` files to Git
- Always use Railway's Variables tab
- Rotate passwords periodically

### 3. Database Security

- Railway PostgreSQL is private by default
- Only accessible within your project
- SSL enabled automatically

### 4. Regular Updates

Keep dependencies updated:
```bash
npm update
npm audit fix
```

## Scaling Your Application

### Horizontal Scaling

Railway supports multiple instances:
1. Go to web service "Settings"
2. Increase "Replicas" count
3. Load balancing automatic

### Database Scaling

1. Upgrade PostgreSQL plan in Railway
2. More storage, RAM, CPU available
3. Pricing scales with usage

## Next Steps

After successful deployment:

1. ✅ Test all functionality
2. ✅ Add products via admin panel
3. ✅ Upload custom banners
4. ✅ Add brand logos
5. ✅ Test quote request flow
6. ✅ Share your site URL with customers

## Support

### Railway Support

- Documentation: [docs.railway.app](https://docs.railway.app)
- Discord: [Railway Community](https://discord.gg/railway)
- Help Center: Available in Railway dashboard

### Application Support

For issues specific to B4-Baking website:
- Check application logs in Railway
- Review README.md for configuration details
- Verify all environment variables are set correctly

## Migration from Vercel

If you're migrating from Vercel:

### Data Migration

1. **Export from Vercel KV**: Not directly compatible
2. **Manual Data Entry**: Re-add products, banners, brands through admin panel
3. **Image Migration**: Upload images again through new admin interface

### DNS Updates

1. Keep Vercel deployment running
2. Test Railway deployment thoroughly
3. Update DNS records to point to Railway URL
4. Monitor for 24-48 hours
5. Decommission Vercel deployment

### Environment Variables

Copy from Vercel to Railway:
- `ADMIN_PASSWORD`
- `WHATSAPP_NUMBER`

New in Railway:
- `DATABASE_URL` (automatically provided)

No longer needed:
- Vercel Blob tokens
- Vercel KV credentials

---

**Congratulations!** 🎉 Your B4-Baking website is now live on Railway!

