import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { isAuthenticated } from '@/lib/auth';
import { AboutContent, AboutOffering } from '@/types';

interface AboutContentRow {
  id: string;
  title: string;
  intro: string;
  subtitle: string;
  offerings: AboutOffering[];
  outro: string;
  updated_at: string;
}

// GET - Fetch about content
export async function GET() {
  try {
    const result = await query<AboutContentRow>('SELECT * FROM about_content LIMIT 1');
    
    if (result.rows.length === 0) {
      // Return default content if none exists
      const defaultContent: AboutContent = {
        id: 'default',
        title: 'Your Trusted Partner in Bulk Dairy and Bakery Supplies',
        intro: 'Since 2000, B4 BAKING has been the reliable choice for bulk suppliers of dairy products and bakery ingredients across Kasaragod, Kerala. We serve as your comprehensive wholesaler, offering a wide variety of premium ingredients and supplies.',
        subtitle: 'Explore Our Offerings',
        offerings: [
          {
            icon: '🧈',
            title: 'Premium Ghee',
            description: 'A diverse selection of pure and high-quality ghee'
          },
          {
            icon: '🍹',
            title: 'Fruit Crushes',
            description: 'Fresh and delicious fruit crushes in various flavors'
          },
          {
            icon: '🍞',
            title: 'Baking Supplies',
            description: 'Essential baking supplies for all your needs'
          },
          {
            icon: '🥛',
            title: 'Dairy Products',
            description: 'Complete range of dairy products for commercial use'
          }
        ],
        outro: 'Enhance your creations with our high-quality products tailored for hotels and catering. We proudly distribute esteemed brands, ensuring you have access to the finest options for all your culinary requirements.',
        updatedAt: Date.now()
      };
      return NextResponse.json(defaultContent);
    }

    const row = result.rows[0];
    const content: AboutContent = {
      id: row.id,
      title: row.title,
      intro: row.intro,
      subtitle: row.subtitle,
      offerings: row.offerings,
      outro: row.outro,
      updatedAt: parseInt(row.updated_at)
    };

    return NextResponse.json(content);
  } catch (error) {
    console.error('Error fetching about content:', error);
    return NextResponse.json(
      { error: 'Failed to fetch about content' },
      { status: 500 }
    );
  }
}

// PUT - Update about content (admin only)
export async function PUT(request: NextRequest) {
  try {
    const authenticated = await isAuthenticated();
    if (!authenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { title, intro, subtitle, offerings, outro } = body;

    // Validate required fields
    if (!title || !intro || !subtitle || !offerings || !outro) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Validate offerings
    if (!Array.isArray(offerings) || offerings.length === 0) {
      return NextResponse.json(
        { error: 'Offerings must be a non-empty array' },
        { status: 400 }
      );
    }

    for (const offering of offerings) {
      if (!offering.icon || !offering.title || !offering.description) {
        return NextResponse.json(
          { error: 'Each offering must have icon, title, and description' },
          { status: 400 }
        );
      }
    }

    const id = 'about-content';
    const updatedAt = Date.now();

    // Check if content exists
    const existingResult = await query('SELECT id FROM about_content WHERE id = $1', [id]);

    if (existingResult.rows.length === 0) {
      // Insert new content
      await query(
        `INSERT INTO about_content (id, title, intro, subtitle, offerings, outro, updated_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [id, title, intro, subtitle, JSON.stringify(offerings), outro, updatedAt]
      );
    } else {
      // Update existing content
      await query(
        `UPDATE about_content 
         SET title = $2, intro = $3, subtitle = $4, offerings = $5, outro = $6, updated_at = $7
         WHERE id = $1`,
        [id, title, intro, subtitle, JSON.stringify(offerings), outro, updatedAt]
      );
    }

    const content: AboutContent = {
      id,
      title,
      intro,
      subtitle,
      offerings,
      outro,
      updatedAt
    };

    return NextResponse.json(content);
  } catch (error) {
    console.error('Error updating about content:', error);
    return NextResponse.json(
      { error: 'Failed to update about content' },
      { status: 500 }
    );
  }
}

