# Quick Start Guide - B4-Baking Website

## 🚀 Your Website is Live!

**URL**: https://b4baking-mrse5lfxz-oasis-techwyses-projects.vercel.app

---

## ⚡ 5-Minute Setup

### Step 1: Set Environment Variables (2 min)

1. Visit: https://vercel.com/oasis-techwyses-projects/b4baking-web/settings/environment-variables

2. Click "Add New"

3. Add **ADMIN_PASSWORD**:
   ```
   Name: ADMIN_PASSWORD
   Value: YourSecurePassword123
   Apply to: Production, Preview, Development
   ```

4. Add **WHATSAPP_NUMBER**:
   ```
   Name: WHATSAPP_NUMBER  
   Value: 919876543210 (your number in format: country code + number)
   Apply to: Production, Preview, Development
   ```

### Step 2: Add Storage (2 min)

1. Visit: https://vercel.com/oasis-techwyses-projects/b4baking-web/stores

2. Click "Create" → "KV" → Name it "b4baking-kv" → Create → Connect to project

3. Click "Create" → "Blob" → Name it "b4baking-blob" → Create → Connect to project

### Step 3: Redeploy (1 min)

1. Visit: https://vercel.com/oasis-techwyses-projects/b4baking-web

2. Go to "Deployments" tab

3. Click (...) on latest → "Redeploy" → Confirm

**OR** run: `vercel --prod` in terminal

---

## ✅ Test Your Website

### Test 1: Homepage
Visit: https://b4baking-mrse5lfxz-oasis-techwyses-projects.vercel.app

Should see:
- ✅ Banner slider
- ✅ About us section  
- ✅ Brand logos slider

### Test 2: Admin Login
Visit: https://b4baking-mrse5lfxz-oasis-techwyses-projects.vercel.app/admin/login

- Enter your ADMIN_PASSWORD
- Should redirect to products page

### Test 3: Add a Product
1. In admin → Products → "+ Add Product"
2. Fill details, upload image
3. Save
4. Visit shop page to see it

### Test 4: Quote Request
1. Browse /shop
2. Add items to cart
3. Go to /quote
4. Fill details → Send to WhatsApp
5. Check WhatsApp message format

---

## 🎯 Common Tasks

### Add Products
```
1. Login to admin panel
2. Products → + Add Product
3. Fill: name, description, price, category
4. Upload image
5. Save
```

### Update Banners
```
1. Login to admin panel
2. Banners → + Add Banner
3. Upload image (1920x500px recommended)
4. Delete old banners if needed
```

### Change Password
```
1. Vercel Dashboard → Settings → Environment Variables
2. Edit ADMIN_PASSWORD
3. Redeploy
```

### Change WhatsApp Number
```
1. Vercel Dashboard → Settings → Environment Variables
2. Edit WHATSAPP_NUMBER
3. Redeploy
```

---

## 🆘 Troubleshooting

### Can't login to admin
- Check ADMIN_PASSWORD is set in Vercel
- Make sure you redeployed after adding it

### Images not uploading
- Verify Vercel Blob is connected
- Check BLOB_READ_WRITE_TOKEN exists

### Products not loading
- Verify Vercel KV is connected
- Check KV_* environment variables exist

### WhatsApp not working
- Verify WHATSAPP_NUMBER format (919876543210)
- No + or spaces

---

## 📚 Full Documentation

- **PROJECT_SUMMARY.md** - Complete project overview
- **DEPLOYMENT_GUIDE.md** - Detailed deployment steps
- **VERCEL_SETUP.md** - Post-deployment configuration
- **README.md** - Full documentation

---

## 🎨 Quick Customizations

### Change Brand Colors
Edit `app/globals.css`:
```css
:root {
  --primary-orange: #ff8c42; /* Your color here */
  --primary-brown: #8b4513;
  --accent-blue: #4a90e2;
}
```

### Update About Text
Edit `components/AboutSection.tsx`

### Change Logo
Replace `public/LOGO.png` with your logo (60x60px recommended)

---

## 🎉 You're All Set!

Your B4-Baking website is ready for customers!

**Next:**
1. ✅ Complete 5-minute setup above
2. ✅ Add your products  
3. ✅ Share URL with customers
4. ✅ Start receiving quote requests!

---

**Need Help?**
- Check documentation files
- Review Vercel deployment logs
- Verify environment variables

**Happy Selling! 🎊**

