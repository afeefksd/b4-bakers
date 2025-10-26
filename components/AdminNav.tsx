'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import styles from './AdminNav.module.css';

export default function AdminNav() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/admin/login');
  };

  const isActive = (path: string) => pathname === path;

  return (
    <nav className={styles.nav}>
      <div className={styles.container}>
        <div className={styles.brand}>
          <h2>Admin Panel</h2>
        </div>

        <div className={styles.links}>
          <Link 
            href="/admin/products" 
            className={isActive('/admin/products') ? styles.active : ''}
          >
            Products
          </Link>
          <Link 
            href="/admin/banners" 
            className={isActive('/admin/banners') ? styles.active : ''}
          >
            Banners
          </Link>
          <Link 
            href="/admin/brands" 
            className={isActive('/admin/brands') ? styles.active : ''}
          >
            Brands
          </Link>
          <Link 
            href="/admin/about" 
            className={isActive('/admin/about') ? styles.active : ''}
          >
            About
          </Link>
          <Link href="/" className={styles.viewSite}>
            View Site
          </Link>
          <button onClick={handleLogout} className={styles.logoutButton}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

