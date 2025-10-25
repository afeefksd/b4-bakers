import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import './globals.css';

export const metadata: Metadata = {
  title: 'B4-Baking | Wholesale Dairy & Bakery Supplies',
  description: 'Your trusted partner in bulk dairy and bakery supplies since 2000. Serving Kasaragod, Kerala with premium ghee, fruit crushes, and baking ingredients.',
  keywords: 'wholesale dairy, bakery supplies, ghee, fruit crushes, Kasaragod, Kerala, bulk supplies',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
