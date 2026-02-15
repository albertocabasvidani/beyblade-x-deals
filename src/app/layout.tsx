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

const BASE_URL = 'https://beyblade-x-deals.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'BX Deals - Risparmia su Beyblade X da Amazon Giappone',
    template: '%s | BX Deals',
  },
  description:
    'Confronta i prezzi di Beyblade X tra Amazon Giappone e Italia. Risparmia fino al 60% con la spedizione consolidata.',
  keywords: [
    'beyblade x', 'beyblade x prezzo', 'beyblade x amazon giappone',
    'comprare beyblade x dal giappone', 'beyblade x risparmio',
    'beyblade x spedizione italia', 'amazon japan beyblade',
    'beyblade x economici', 'beyblade x offerte',
  ],
  openGraph: {
    title: 'BX Deals - Risparmia su Beyblade X da Amazon Giappone',
    description:
      'Confronta i prezzi di Beyblade X tra Amazon Giappone e Italia. Risparmia fino al 60% con la spedizione consolidata.',
    type: 'website',
    url: BASE_URL,
    siteName: 'BX Deals',
    locale: 'it_IT',
  },
  twitter: {
    card: 'summary',
    title: 'BX Deals - Risparmia su Beyblade X da Amazon Giappone',
    description:
      'Confronta i prezzi di Beyblade X tra Amazon Giappone e Italia. Risparmia fino al 60%.',
  },
  alternates: {
    canonical: BASE_URL,
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
