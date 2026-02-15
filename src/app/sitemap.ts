import type { MetadataRoute } from 'next';
import { getAllProducts, getExportDate } from '@/lib/data';

const BASE_URL = 'https://beyblade-x-deals.vercel.app';

export default function sitemap(): MetadataRoute.Sitemap {
  const products = getAllProducts();
  const lastModified = new Date(getExportDate());

  const productPages = products.map(p => ({
    url: `${BASE_URL}/products/${p.slug}`,
    lastModified,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: BASE_URL,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    ...productPages,
  ];
}
