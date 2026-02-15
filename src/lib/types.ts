export type ProductCategory =
  | 'Starter'
  | 'Random Booster'
  | 'Launcher'
  | 'Stadium'
  | 'Parts'
  | 'Set'
  | 'String Launcher'
  | 'Grip'
  | 'Custom Parts'
  | 'Blade';

export interface PricePoint {
  date: string;
  price_eur: number;
}

export interface Product {
  id: number;
  slug: string;
  asin: string | null;
  name: string;
  name_it: string | null;
  category: ProductCategory;
  image_url: string | null;
  available_jp: boolean;

  price_jp_eur: number | null;
  shipping_jp_eur: number | null;
  fulfilled_by_amazon: boolean;
  seller_jp: string | null;

  price_it_eur: number | null;

  savings_eur: number | null;
  savings_pct: number | null;

  price_history_jp: PricePoint[];
  price_history_it: PricePoint[];

  search_terms: string[];
}

export interface ProductData {
  exportedAt: string;
  exchangeRate: {
    jpy_eur: number;
    fetchedAt: string;
  };
  products: Product[];
  categories: ProductCategory[];
}

export interface CartItem {
  productId: number;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  updatedAt: string;
}

export interface ShippingEstimate {
  estimated: number | null;
  itemsWithData: number;
  totalItems: number;
  hasLargeItems: boolean;
  needsCalibration: boolean;
}
