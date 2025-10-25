'use client';

import { useEffect, useState } from 'react';
import { Brand } from '@/types';
import Image from 'next/image';
import styles from './brands.module.css';

export default function AdminBrandsPage() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    logo: '',
  });

  useEffect(() => {
    fetchBrands();
  }, []);

  const fetchBrands = async () => {
    try {
      const response = await fetch('/api/brands');
      const data = await response.json();
      setBrands(data);
    } catch (error) {
      console.error('Error fetching brands:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const formDataUpload = new FormData();
      formDataUpload.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formDataUpload,
      });

      const data = await response.json();
      setFormData(prev => ({ ...prev, logo: data.url }));
    } catch {
      alert('Failed to upload logo');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/brands', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        fetchBrands();
        resetForm();
        setShowForm(false);
      } else {
        alert('Failed to add brand');
      }
    } catch {
      alert('Error adding brand');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this brand?')) return;

    try {
      const response = await fetch(`/api/brands?id=${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchBrands();
      } else {
        alert('Failed to delete brand');
      }
    } catch {
      alert('Error deleting brand');
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      logo: '',
    });
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>Manage Brands</h1>
          <button 
            className={styles.addButton}
            onClick={() => {
              resetForm();
              setShowForm(!showForm);
            }}
          >
            {showForm ? 'Cancel' : '+ Add Brand'}
          </button>
        </div>

        {showForm && (
          <div className={styles.formCard}>
            <h2>Add New Brand</h2>
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formGroup}>
                <label>Brand Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className={styles.formGroup}>
                <label>Brand Logo *</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  disabled={uploading}
                />
                {formData.logo && (
                  <div className={styles.logoPreview}>
                    <Image src={formData.logo} alt="Preview" width={150} height={100} style={{ objectFit: 'contain' }} />
                  </div>
                )}
                <small>Or enter logo URL:</small>
                <input
                  type="text"
                  placeholder="https://..."
                  value={formData.logo}
                  onChange={(e) => setFormData({ ...formData, logo: e.target.value })}
                />
              </div>

              <button type="submit" className={styles.submitButton} disabled={uploading}>
                {uploading ? 'Uploading...' : 'Add Brand'}
              </button>
            </form>
          </div>
        )}

        {loading ? (
          <div className={styles.loading}>Loading brands...</div>
        ) : (
          <div className={styles.brandsGrid}>
            {brands.map((brand) => (
              <div key={brand.id} className={styles.brandCard}>
                <div className={styles.brandLogo}>
                  <Image
                    src={brand.logo}
                    alt={brand.name}
                    width={150}
                    height={100}
                    style={{ objectFit: 'contain' }}
                  />
                </div>
                <div className={styles.brandContent}>
                  <h3>{brand.name}</h3>
                  <button 
                    onClick={() => handleDelete(brand.id)} 
                    className={styles.deleteButton}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && brands.length === 0 && (
          <div className={styles.empty}>
            <p>No brands yet. Add your first brand!</p>
          </div>
        )}
      </div>
    </div>
  );
}

