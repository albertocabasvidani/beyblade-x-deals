import type { Product, ProductData, ProductCategory } from './types';
import productsData from '../data/products.json';

const data = productsData as ProductData;

export function getAllProducts(): Product[] {
  return data.products;
}

export function getProductBySlug(slug: string): Product | undefined {
  return data.products.find(p => p.slug === slug);
}

export function getProductById(id: number): Product | undefined {
  return data.products.find(p => p.id === id);
}

export function getCategories(): ProductCategory[] {
  return data.categories;
}

export function getExportDate(): string {
  return data.exportedAt;
}

export function getExchangeRate() {
  return data.exchangeRate;
}

export function getAllSlugs(): string[] {
  return data.products.map(p => p.slug);
}
