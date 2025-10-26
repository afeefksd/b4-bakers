'use client';

import { useState, useEffect } from 'react';
import { AboutContent, AboutOffering } from '@/types';
import styles from './about.module.css';

export default function AdminAboutPage() {
  const [content, setContent] = useState<AboutContent | null>(null);
  const [title, setTitle] = useState('');
  const [intro, setIntro] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [offerings, setOfferings] = useState<AboutOffering[]>([]);
  const [outro, setOutro] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const response = await fetch('/api/about');
      if (response.ok) {
        const data = await response.json();
        setContent(data);
        setTitle(data.title);
        setIntro(data.intro);
        setSubtitle(data.subtitle);
        setOfferings(data.offerings);
        setOutro(data.outro);
      }
    } catch (error) {
      console.error('Error fetching about content:', error);
      setMessage('Failed to load content');
    } finally {
      setLoading(false);
    }
  };

  const handleAddOffering = () => {
    setOfferings([...offerings, { icon: '🍞', title: '', description: '' }]);
  };

  const handleRemoveOffering = (index: number) => {
    setOfferings(offerings.filter((_, i) => i !== index));
  };

  const handleOfferingChange = (index: number, field: keyof AboutOffering, value: string) => {
    const updated = [...offerings];
    updated[index] = { ...updated[index], [field]: value };
    setOfferings(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');

    try {
      const response = await fetch('/api/about', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          intro,
          subtitle,
          offerings,
          outro,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setContent(data);
        setMessage('Content updated successfully!');
        setTimeout(() => setMessage(''), 3000);
      } else {
        const error = await response.json();
        setMessage(error.error || 'Failed to update content');
      }
    } catch (error) {
      console.error('Error updating content:', error);
      setMessage('Failed to update content');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>Loading...</div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Manage About Section</h1>
        <p>Update the content displayed on the About section of the homepage</p>
      </div>

      {message && (
        <div className={`${styles.message} ${message.includes('success') ? styles.success : styles.error}`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="title">Main Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="Your Trusted Partner in..."
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="intro">Introduction Paragraph</label>
          <textarea
            id="intro"
            value={intro}
            onChange={(e) => setIntro(e.target.value)}
            required
            rows={4}
            placeholder="Brief introduction about the company..."
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="subtitle">Offerings Section Title</label>
          <input
            type="text"
            id="subtitle"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            required
            placeholder="Explore Our Offerings"
          />
        </div>

        <div className={styles.offeringsSection}>
          <div className={styles.offeringsHeader}>
            <label>Offerings</label>
            <button
              type="button"
              onClick={handleAddOffering}
              className={styles.addButton}
            >
              + Add Offering
            </button>
          </div>

          {offerings.map((offering, index) => (
            <div key={index} className={styles.offering}>
              <div className={styles.offeringHeader}>
                <h3>Offering {index + 1}</h3>
                {offerings.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveOffering(index)}
                    className={styles.removeButton}
                  >
                    Remove
                  </button>
                )}
              </div>

              <div className={styles.offeringFields}>
                <div className={styles.formGroup}>
                  <label>Icon (Emoji)</label>
                  <input
                    type="text"
                    value={offering.icon}
                    onChange={(e) => handleOfferingChange(index, 'icon', e.target.value)}
                    required
                    placeholder="🧈"
                    maxLength={2}
                  />
                  <small>Enter an emoji (e.g., 🧈 🍹 🍞 🥛)</small>
                </div>

                <div className={styles.formGroup}>
                  <label>Title</label>
                  <input
                    type="text"
                    value={offering.title}
                    onChange={(e) => handleOfferingChange(index, 'title', e.target.value)}
                    required
                    placeholder="Premium Ghee"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>Description</label>
                  <textarea
                    value={offering.description}
                    onChange={(e) => handleOfferingChange(index, 'description', e.target.value)}
                    required
                    rows={2}
                    placeholder="A diverse selection of pure and high-quality ghee"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="outro">Closing Paragraph</label>
          <textarea
            id="outro"
            value={outro}
            onChange={(e) => setOutro(e.target.value)}
            required
            rows={4}
            placeholder="Closing statement about the business..."
          />
        </div>

        <div className={styles.actions}>
          <button type="submit" disabled={saving} className={styles.saveButton}>
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
}

