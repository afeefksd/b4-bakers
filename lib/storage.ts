import { query } from './db';
import { Product, Banner, Brand } from '@/types';

// Products
export async function getProducts(): Promise<Product[]> {
  try {
    const result = await query<Product>(
      'SELECT id, name, description, price, image, category, created_at as "createdAt" FROM products ORDER BY created_at DESC'
    );
    // Convert price from string to number (PostgreSQL DECIMAL returns as string)
    return result.rows.map(row => ({
      ...row,
      price: typeof row.price === 'string' ? parseFloat(row.price) : row.price
    }));
  } catch (error) {
    console.error('Error getting products:', error);
    return [];
  }
}

export async function getProduct(id: string): Promise<Product | null> {
  try {
    const result = await query<Product>(
      'SELECT id, name, description, price, image, category, created_at as "createdAt" FROM products WHERE id = $1',
      [id]
    );
    const product = result.rows[0] || null;
    // Convert price from string to number (PostgreSQL DECIMAL returns as string)
    if (product && typeof product.price === 'string') {
      product.price = parseFloat(product.price);
    }
    return product;
  } catch (error) {
    console.error('Error getting product:', error);
    return null;
  }
}

export async function createProduct(product: Product): Promise<void> {
  try {
    await query(
      'INSERT INTO products (id, name, description, price, image, category, created_at) VALUES ($1, $2, $3, $4, $5, $6, $7)',
      [product.id, product.name, product.description, product.price, product.image, product.category, product.createdAt]
    );
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
}

export async function updateProduct(id: string, updates: Partial<Product>): Promise<void> {
  try {
    const fields: string[] = [];
    const values: unknown[] = [];
    let paramCount = 1;

    if (updates.name !== undefined) {
      fields.push(`name = $${paramCount++}`);
      values.push(updates.name);
    }
    if (updates.description !== undefined) {
      fields.push(`description = $${paramCount++}`);
      values.push(updates.description);
    }
    if (updates.price !== undefined) {
      fields.push(`price = $${paramCount++}`);
      values.push(updates.price);
    }
    if (updates.image !== undefined) {
      fields.push(`image = $${paramCount++}`);
      values.push(updates.image);
    }
    if (updates.category !== undefined) {
      fields.push(`category = $${paramCount++}`);
      values.push(updates.category);
    }

    if (fields.length > 0) {
      values.push(id);
      await query(
        `UPDATE products SET ${fields.join(', ')} WHERE id = $${paramCount}`,
        values
      );
    }
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
}

export async function deleteProduct(id: string): Promise<void> {
  try {
    await query('DELETE FROM products WHERE id = $1', [id]);
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
}

// Banners
export async function getBanners(): Promise<Banner[]> {
  try {
    const result = await query<Banner>(
      'SELECT id, image, "order", created_at as "createdAt" FROM banners ORDER BY "order" ASC'
    );
    return result.rows;
  } catch (error) {
    console.error('Error getting banners:', error);
    return [];
  }
}

export async function createBanner(banner: Banner): Promise<void> {
  try {
    await query(
      'INSERT INTO banners (id, image, "order", created_at) VALUES ($1, $2, $3, $4)',
      [banner.id, banner.image, banner.order, banner.createdAt]
    );
  } catch (error) {
    console.error('Error creating banner:', error);
    throw error;
  }
}

export async function deleteBanner(id: string): Promise<void> {
  try {
    await query('DELETE FROM banners WHERE id = $1', [id]);
  } catch (error) {
    console.error('Error deleting banner:', error);
    throw error;
  }
}

export async function updateBannerOrder(id: string, order: number): Promise<void> {
  try {
    await query('UPDATE banners SET "order" = $1 WHERE id = $2', [order, id]);
  } catch (error) {
    console.error('Error updating banner order:', error);
    throw error;
  }
}

// Brands
export async function getBrands(): Promise<Brand[]> {
  try {
    const result = await query<Brand>(
      'SELECT id, name, logo, created_at as "createdAt" FROM brands ORDER BY created_at DESC'
    );
    return result.rows;
  } catch (error) {
    console.error('Error getting brands:', error);
    return [];
  }
}

export async function createBrand(brand: Brand): Promise<void> {
  try {
    await query(
      'INSERT INTO brands (id, name, logo, created_at) VALUES ($1, $2, $3, $4)',
      [brand.id, brand.name, brand.logo, brand.createdAt]
    );
  } catch (error) {
    console.error('Error creating brand:', error);
    throw error;
  }
}

export async function deleteBrand(id: string): Promise<void> {
  try {
    await query('DELETE FROM brands WHERE id = $1', [id]);
  } catch (error) {
    console.error('Error deleting brand:', error);
    throw error;
  }
}

// Initialize default data (run once)
export async function initializeData(): Promise<void> {
  const products = await getProducts();
  const banners = await getBanners();
  const brands = await getBrands();

  // Initialize banners from existing images
  if (banners.length === 0) {
    const defaultBanners: Banner[] = [
      { id: '1', image: '/banner 1.jpg', order: 1, createdAt: Date.now() },
      { id: '2', image: '/banner 2.jpg', order: 2, createdAt: Date.now() },
      { id: '3', image: '/banner 3.jpg', order: 3, createdAt: Date.now() },
      { id: '4', image: '/banner 4.jpg', order: 4, createdAt: Date.now() },
      { id: '5', image: '/banner 5.jpg', order: 5, createdAt: Date.now() },
      { id: '6', image: '/banner 6.jpg', order: 6, createdAt: Date.now() },
      { id: '7', image: '/banner 7.jpg', order: 7, createdAt: Date.now() },
      { id: '8', image: '/banner 8.jpg', order: 8, createdAt: Date.now() },
      { id: '9', image: '/banner 9 (2).jpg', order: 9, createdAt: Date.now() },
    ];
    for (const banner of defaultBanners) {
      await createBanner(banner);
    }
  }

  // Initialize brands from existing images
  if (brands.length === 0) {
    const defaultBrands: Brand[] = [
      { id: '1', name: '1 TO 3', logo: '/brands/1 TO 3.png', createdAt: Date.now() },
      { id: '2', name: 'MALAS', logo: '/brands/MALAS.png', createdAt: Date.now() },
      { id: '3', name: 'MANAMA', logo: '/brands/MANAMA.png', createdAt: Date.now() },
      { id: '4', name: 'NANDHINI', logo: '/brands/NANDHINI.png', createdAt: Date.now() },
      { id: '5', name: 'RKG', logo: '/brands/RKG.png', createdAt: Date.now() },
    ];
    for (const brand of defaultBrands) {
      await createBrand(brand);
    }
  }

  // Initialize sample products if none exist
  if (products.length === 0) {
    const sampleProducts: Product[] = [
      {
        id: '1',
        name: 'Premium Ghee 1kg',
        description: 'Pure and premium quality ghee for all your cooking needs',
        price: 450,
        image: '/placeholder-product.jpg',
        category: 'Ghee',
        createdAt: Date.now(),
      },
      {
        id: '2',
        name: 'Mango Fruit Crush 700ml',
        description: 'Fresh and delicious mango fruit crush',
        price: 180,
        image: '/placeholder-product.jpg',
        category: 'Fruit Crushes',
        createdAt: Date.now(),
      },
    ];
    for (const product of sampleProducts) {
      await createProduct(product);
    }
  }
}

