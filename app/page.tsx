import BannerSlider from '@/components/BannerSlider';
import AboutSection from '@/components/AboutSection';
import BrandsSlider from '@/components/BrandsSlider';
import { getBanners, getBrands, initializeData } from '@/lib/storage';
import Link from 'next/link';
import styles from './page.module.css';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  // Initialize data on first load
  await initializeData();
  
  const banners = await getBanners();
  const brands = await getBrands();

  return (
    <div className={styles.home}>
      <BannerSlider banners={banners} />
      
      <AboutSection />
      
      <BrandsSlider brands={brands} />
      
      <section className={styles.cta}>
        <div className={styles.ctaContainer}>
          <h2>Ready to Place Your Order?</h2>
          <p>Explore our wide range of products and request a wholesale quote today!</p>
          <Link href="/shop" className="btn btn-primary">
            Browse Products
          </Link>
        </div>
      </section>
    </div>
  );
}
