'use client';

import { useEffect, useState } from 'react';
import { AboutContent } from '@/types';
import styles from './AboutSection.module.css';

export default function AboutSection() {
  const [content, setContent] = useState<AboutContent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch('/api/about');
        if (response.ok) {
          const data = await response.json();
          setContent(data);
        }
      } catch (error) {
        console.error('Error fetching about content:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  if (loading || !content) {
    return null;
  }

  return (
    <section className={styles.about}>
      <div className={styles.container}>
        <h2 className={styles.title}>{content.title}</h2>
        
        <div className={styles.content}>
          <div className={styles.text}>
            <p className={styles.intro}>
              {content.intro}
            </p>

            <h3 className={styles.subtitle}>{content.subtitle}</h3>
            
            <div className={styles.offerings}>
              {content.offerings.map((offering, index) => (
                <div key={index} className={styles.offering}>
                  <div className={styles.icon}>{offering.icon}</div>
                  <h4>{offering.title}</h4>
                  <p>{offering.description}</p>
                </div>
              ))}
            </div>

            <p className={styles.outro}>
              {content.outro}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

