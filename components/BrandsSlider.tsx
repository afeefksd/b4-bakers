'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import styles from './BrandsSlider.module.css';

interface Brand {
  id: string;
  name: string;
  logo: string;
}

interface BrandsSliderProps {
  brands: Brand[];
}

export default function BrandsSlider({ brands }: BrandsSliderProps) {
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    let scrollAmount = 0;
    const scrollStep = 1;
    const scrollInterval = 30;

    const autoScroll = setInterval(() => {
      scrollAmount += scrollStep;
      if (slider.scrollLeft >= slider.scrollWidth / 2) {
        slider.scrollLeft = 0;
        scrollAmount = 0;
      } else {
        slider.scrollLeft = scrollAmount;
      }
    }, scrollInterval);

    return () => clearInterval(autoScroll);
  }, []);

  // Duplicate brands for infinite scroll effect
  const duplicatedBrands = [...brands, ...brands, ...brands];

  if (brands.length === 0) {
    return null;
  }

  return (
    <section className={styles.brandsSection}>
      <div className={styles.container}>
        <h2 className={styles.title}>Our Trusted Brands</h2>
        
        <div className={styles.sliderWrapper}>
          <div className={styles.slider} ref={sliderRef}>
            {duplicatedBrands.map((brand, index) => (
              <div key={`${brand.id}-${index}`} className={styles.brandCard}>
                <div className={styles.imageWrapper}>
                  <Image
                    src={brand.logo}
                    alt={brand.name}
                    width={150}
                    height={100}
                    style={{ objectFit: 'contain' }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

