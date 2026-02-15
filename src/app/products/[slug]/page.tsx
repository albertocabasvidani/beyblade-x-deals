import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { getAllSlugs, getProductBySlug } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import { PriceComparison } from '@/components/product/price-comparison';
import { AffiliateLinks } from '@/components/product/affiliate-links';
import { PriceHistoryChart } from '@/components/product/price-history-chart';
import { AddToCartButton } from '@/components/cart/add-to-cart-button';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllSlugs().map(slug => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};

  return {
    title: `${product.name} - Prezzo Amazon JP vs IT`,
    description: `Confronta il prezzo di ${product.name} tra Amazon Giappone e Italia. ${
      product.savings_pct && product.savings_pct > 0
        ? `Risparmia ${product.savings_pct.toFixed(0)}%!`
        : ''
    }`,
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  return (
    <div className="mx-auto max-w-5xl px-4 py-6">
      <nav className="mb-4 text-sm text-slate-500">
        <Link href="/" className="hover:text-brand">Catalogo</Link>
        <span className="mx-2">/</span>
        {product.category && (
          <>
            <span>{product.category}</span>
            <span className="mx-2">/</span>
          </>
        )}
        <span className="text-slate-900">{product.name}</span>
      </nav>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="relative aspect-square overflow-hidden rounded-xl border border-slate-200 bg-white">
          {product.image_url ? (
            <Image
              src={product.image_url}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-contain p-4"
              priority
            />
          ) : (
            <div className="flex h-full items-center justify-center text-slate-300">
              <svg className="h-24 w-24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
                <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-4">
          <div>
            <div className="flex flex-wrap gap-2 mb-2">
              {product.fulfilled_by_amazon && <Badge variant="fba">FBA</Badge>}
              {product.category && <Badge variant="category">{product.category}</Badge>}
            </div>
            <h1 className="text-2xl font-bold">{product.name}</h1>
            {product.name_it && product.name_it !== product.name && (
              <p className="mt-1 text-slate-500">{product.name_it}</p>
            )}
            {product.asin && (
              <p className="mt-1 text-xs text-slate-400">ASIN: {product.asin}</p>
            )}
          </div>

          <PriceComparison product={product} />

          <AddToCartButton
            productId={product.id}
            disabled={!product.fulfilled_by_amazon || !product.price_jp_eur}
            size="md"
          />

          <AffiliateLinks asin={product.asin} />
        </div>
      </div>

      <div className="mt-8">
        <h2 className="mb-4 text-lg font-semibold">Storico Prezzi</h2>
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <PriceHistoryChart
            historyJp={product.price_history_jp}
            historyIt={product.price_history_it}
          />
        </div>
      </div>
    </div>
  );
}
