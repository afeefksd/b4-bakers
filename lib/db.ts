import { Pool, QueryResult, QueryResultRow } from 'pg';

// Create a connection pool
let pool: Pool | null = null;

export function getPool(): Pool {
  if (!pool) {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
      max: 20,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 2000,
    });

    pool.on('error', (err) => {
      console.error('Unexpected error on idle client', err);
    });
  }

  return pool;
}

// Helper function to execute queries
export async function query<T extends QueryResultRow = QueryResultRow>(
  text: string,
  params?: unknown[]
): Promise<QueryResult<T>> {
  const pool = getPool();
  try {
    return await pool.query<T>(text, params);
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  }
}

// Initialize database tables
export async function initializeDatabase(): Promise<void> {
  const pool = getPool();

  try {
    // Create products table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS products (
        id VARCHAR(255) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        price DECIMAL(10, 2) NOT NULL,
        image TEXT NOT NULL,
        category VARCHAR(100) NOT NULL,
        created_at BIGINT NOT NULL
      );
    `);

    // Create banners table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS banners (
        id VARCHAR(255) PRIMARY KEY,
        image TEXT NOT NULL,
        "order" INTEGER NOT NULL DEFAULT 0,
        created_at BIGINT NOT NULL
      );
    `);

    // Create brands table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS brands (
        id VARCHAR(255) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        logo TEXT NOT NULL,
        created_at BIGINT NOT NULL
      );
    `);

    // Create indexes for better performance
    await pool.query(`
      CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
    `);

    await pool.query(`
      CREATE INDEX IF NOT EXISTS idx_banners_order ON banners("order");
    `);

    console.log('Database tables initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
}

// Close the pool (useful for testing or graceful shutdown)
export async function closePool(): Promise<void> {
  if (pool) {
    await pool.end();
    pool = null;
  }
}

