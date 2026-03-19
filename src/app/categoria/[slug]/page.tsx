import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { getProductsByCategory } from '@/lib/data';
import { CATEGORIES_SEO, getCategorySEOBySlug, getAllCategorySlugs } from '@/lib/categories';
import { ProductCard } from '@/components/catalog/product-card';

const BASE_URL = 'https://beyblade-x-deals.vercel.app';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllCategorySlugs().map(slug => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const cat = getCategorySEOBySlug(slug);
  if (!cat) return {};

  const title = `${cat.title} — Prezzi Amazon JP vs IT`;

  return {
    title,
    description: cat.description,
    keywords: ['beyblade x', ...cat.keywords],
    openGraph: {
      title,
      description: cat.description,
      url: `${BASE_URL}/categoria/${slug}`,
      type: 'website',
    },
    alternates: {
      canonical: `${BASE_URL}/categoria/${slug}`,
    },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const cat = getCategorySEOBySlug(slug);
  if (!cat) notFound();

  const products = getProductsByCategory(cat.category);

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Catalogo', item: BASE_URL },
      { '@type': 'ListItem', position: 2, name: cat.title },
    ],
  };

  const collectionJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: cat.title,
    description: cat.description,
    url: `${BASE_URL}/categoria/${slug}`,
    numberOfItems: products.length,
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }} />

      <nav className="mb-4 text-sm text-slate-500">
        <Link href="/" className="hover:text-brand">Catalogo</Link>
        <span className="mx-2">/</span>
        <span className="text-slate-900">{cat.title}</span>
      </nav>

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
          {cat.title}: Prezzi Amazon Giappone vs Italia
        </h1>
        <p className="mt-2 text-sm text-slate-600 max-w-3xl">
          {cat.intro}
        </p>
        <p className="mt-2 text-xs text-slate-400">
          {products.length} prodotti disponibili
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {products.length === 0 && (
        <p className="text-center text-slate-500 py-12">
          Nessun prodotto disponibile in questa categoria al momento.
        </p>
      )}

      <nav className="mt-10 border-t border-slate-200 pt-6">
        <h2 className="text-sm font-semibold text-slate-700 mb-3">Altre categorie</h2>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES_SEO.filter(c => c.slug !== slug).map(c => (
            <Link
              key={c.slug}
              href={`/categoria/${c.slug}`}
              className="rounded-full border border-slate-200 px-3 py-1 text-sm text-slate-600 hover:border-brand hover:text-brand transition-colors"
            >
              {c.title}
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
}
