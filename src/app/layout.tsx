import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { CartProvider } from '@/components/cart/cart-provider';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: 'BX Deals - Risparmia su Beyblade X da Amazon Giappone',
    template: '%s | BX Deals',
  },
  description:
    'Confronta i prezzi di Beyblade X tra Amazon Giappone e Italia. Risparmia fino al 60% con la spedizione consolidata.',
  openGraph: {
    title: 'BX Deals - Risparmia su Beyblade X da Amazon Giappone',
    description:
      'Confronta i prezzi di Beyblade X tra Amazon Giappone e Italia. Risparmia fino al 60%.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it">
      <body className={`${inter.variable} min-h-screen flex flex-col bg-slate-50 text-slate-900 antialiased`}>
        <CartProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
