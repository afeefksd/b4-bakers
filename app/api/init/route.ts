import { NextResponse } from 'next/server';
import { initializeDatabase } from '@/lib/db';
import { initializeData } from '@/lib/storage';

export async function GET() {
  try {
    // Initialize database tables
    await initializeDatabase();

    // Initialize default data
    await initializeData();

    return NextResponse.json({ 
      message: 'Database initialized successfully',
      success: true 
    });
  } catch (error) {
    console.error('Database initialization error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to initialize database',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

