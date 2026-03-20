import type { MetadataRoute } from 'next';
import { getAllProducts, getExportDate } from '@/lib/data';
import { getAllCategorySlugs } from '@/lib/categories';

const BASE_URL = 'https://trottolebeybladex.it';

export default function sitemap(): MetadataRoute.Sitemap {
  const products = getAllProducts();
  const lastModified = new Date(getExportDate());

  const productPages = products.map(p => ({
    url: `${BASE_URL}/products/${p.slug}`,
    lastModified,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const categoryPages = getAllCategorySlugs().map(slug => ({
    url: `${BASE_URL}/${slug}`,
    lastModified,
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  const guidePages = [
    {
      url: `${BASE_URL}/guida/comprare-da-amazon-giappone`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/guida/migliori-beyblade-x`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
  ];

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
    ...categoryPages,
    ...guidePages,
    ...productPages,
  ];
}
