'use client';

import { useEffect, useState } from 'react';
import { Banner } from '@/types';
import Image from 'next/image';
import styles from './banners.module.css';

export default function AdminBannersPage() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    try {
      const response = await fetch('/api/banners');
      const data = await response.json();
      setBanners(data);
    } catch (error) {
      console.error('Error fetching banners:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const uploadResponse = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const uploadData = await uploadResponse.json();

      const response = await fetch('/api/banners', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: uploadData.url }),
      });

      if (response.ok) {
        fetchBanners();
      } else {
        alert('Failed to add banner');
      }
    } catch {
      alert('Error uploading banner');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this banner?')) return;

    try {
      const response = await fetch(`/api/banners?id=${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchBanners();
      } else {
        alert('Failed to delete banner');
      }
    } catch {
      alert('Error deleting banner');
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>Manage Banners</h1>
          <label className={styles.uploadButton}>
            {uploading ? 'Uploading...' : '+ Add Banner'}
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              disabled={uploading}
              style={{ display: 'none' }}
            />
          </label>
        </div>

        <p className={styles.info}>
          Upload banner images for the homepage slider. Recommended size: 1920x500px
        </p>

        {loading ? (
          <div className={styles.loading}>Loading banners...</div>
        ) : (
          <div className={styles.bannersGrid}>
            {banners.map((banner) => (
              <div key={banner.id} className={styles.bannerCard}>
                <div className={styles.bannerImage}>
                  <Image
                    src={banner.image}
                    alt={`Banner ${banner.order}`}
                    width={400}
                    height={200}
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div className={styles.bannerFooter}>
                  <span className={styles.order}>Order: {banner.order}</span>
                  <button 
                    onClick={() => handleDelete(banner.id)} 
                    className={styles.deleteButton}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && banners.length === 0 && (
          <div className={styles.empty}>
            <p>No banners yet. Add your first banner!</p>
          </div>
        )}
      </div>
    </div>
  );
}

