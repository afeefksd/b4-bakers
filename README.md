# B4-Baking Website

A modern, colorful wholesale website for B4-Baking, specializing in bulk dairy and bakery supplies.

## Features

- **Homepage**
  - Auto-rotating banner slider
  - About us section
  - Trusted brands showcase
  
- **Shop**
  - Product catalog with category filtering
  - Add to cart functionality
  - Responsive product grid

- **Quote Request**
  - Cart review with quantity adjustment
  - Customer information form
  - WhatsApp integration for quote requests

- **Admin Panel**
  - Product management (CRUD operations)
  - Banner management
  - Brand management
  - Image upload with filesystem storage
  - Password-protected access

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Custom CSS with modern design
- **Database**: PostgreSQL
- **File Storage**: Filesystem (persistent volume)
- **Deployment**: Railway

## Getting Started

### Prerequisites

- Node.js 18+ installed
- PostgreSQL database (local or Railway)
- Railway account (for deployment)

### Local Development

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd b4baking-web
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env.local` file:
   ```env
   DATABASE_URL=postgresql://user:password@localhost:5432/b4baking
   ADMIN_PASSWORD=your_admin_password
   WHATSAPP_NUMBER=919876543210
   ```

4. Initialize the database:
   - Start your local PostgreSQL server
   - Run the development server (see next step)
   - Visit `http://localhost:3000/api/init` to create tables and seed data

5. Run development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000)

## Deployment to Railway

Railway provides an easy and cost-effective way to deploy your application with built-in PostgreSQL database.

### Step 1: Create Railway Account

1. Visit [Railway.app](https://railway.app)
2. Sign up using GitHub (recommended)

### Step 2: Create New Project

1. Click "New Project" in Railway dashboard
2. Select "Deploy from GitHub repo"
3. Authorize Railway to access your GitHub repositories
4. Select your `b4baking-web` repository

### Step 3: Add PostgreSQL Database

1. In your Railway project, click "+ New"
2. Select "Database" → "Add PostgreSQL"
3. Railway will automatically provision a PostgreSQL database
4. The `DATABASE_URL` environment variable will be automatically added

### Step 4: Configure Environment Variables

1. Click on your web service in Railway
2. Go to "Variables" tab
3. Add the following environment variables:

```env
ADMIN_PASSWORD=your_secure_admin_password
WHATSAPP_NUMBER=919876543210
```

Note: `DATABASE_URL` is automatically provided by Railway's PostgreSQL service.

### Step 5: Deploy

1. Railway will automatically deploy your application
2. Wait for the build and deployment to complete
3. You'll get a public URL like `your-app.up.railway.app`

### Step 6: Initialize Database

After your first deployment:

1. Visit `https://your-app.up.railway.app/api/init`
2. This will create the database tables and seed initial data
3. You should see: `{"message":"Database initialized successfully","success":true}`

### Step 7: Access Your Application

- **Homepage**: `https://your-app.up.railway.app`
- **Admin Panel**: `https://your-app.up.railway.app/admin/login`

### Railway CLI (Optional)

You can also deploy using Railway CLI:

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Link to project
railway link

# Deploy
railway up
```

## Admin Panel Access

Access the admin panel at: `https://your-app.up.railway.app/admin/login`

Default password is set in your environment variables (`ADMIN_PASSWORD`).

## Usage

### Managing Products

1. Login to admin panel
2. Navigate to "Products"
3. Click "+ Add Product" to create new products
4. Fill in product details and upload image
5. Edit or delete existing products

### Managing Banners

1. Navigate to "Banners" in admin panel
2. Click "+ Add Banner" to upload banner images
3. Recommended size: 1920x500px
4. Delete banners as needed

### Managing Brands

1. Navigate to "Brands" in admin panel
2. Add brand name and logo
3. Brands will appear in the homepage slider

### Customer Quote Process

1. Customers browse products on `/shop`
2. Add items to cart
3. Go to `/quote` to review cart
4. Fill in contact details
5. Click "Send Quote Request via WhatsApp"
6. Order details are formatted and sent to your WhatsApp

## Customization

### Colors

Edit `app/globals.css` to change the color scheme:

```css
:root {
  --primary-orange: #ff8c42;
  --primary-brown: #8b4513;
  --primary-cream: #fef5e7;
  --accent-blue: #4a90e2;
  /* ... more colors */
}
```

### WhatsApp Number

Update the `WHATSAPP_NUMBER` in your environment variables (format: country code + number without +)

### About Us Content

Edit `components/AboutSection.tsx` to modify the about us section.

## File Structure

```
b4baking-web/
├── app/
│   ├── admin/          # Admin panel pages
│   ├── api/            # API routes
│   │   └── init/       # Database initialization endpoint
│   ├── shop/           # Shop page
│   ├── quote/          # Quote request page
│   └── page.tsx        # Homepage
├── components/         # Reusable components
├── lib/
│   ├── db.ts           # PostgreSQL connection and setup
│   ├── storage.ts      # Data operations (products, banners, brands)
│   └── file-storage.ts # File upload handling
├── types/             # TypeScript types
├── public/
│   └── uploads/        # User-uploaded images (created at runtime)
└── railway.json       # Railway deployment configuration
```

## Important Notes

### Database & File Storage

- **Database**: PostgreSQL is provided by Railway. The connection URL is automatically set.
- **Uploaded Files**: Stored in `/public/uploads/` on Railway's persistent volume.
- **Persistence**: Files will persist across deployments when using Railway's volume feature.

### Cost Considerations

Railway offers:
- **Free Tier**: $5 monthly credit (suitable for small projects)
- **PostgreSQL**: Included in your Railway plan
- **File Storage**: Uses persistent volumes (included)
- **Estimated Cost**: Small websites typically stay within free tier or cost $5-10/month

### Environment Variables Required

```env
DATABASE_URL=<automatically provided by Railway>
ADMIN_PASSWORD=your_secure_password
WHATSAPP_NUMBER=919876543210
```

## Support

For issues or questions, contact B4-Baking support.

## License

© 2000-2025 B4-Baking. All rights reserved.
