import type { Product, ShippingEstimate } from './types';

const BASE_FEE = 16.50;
const LARGE_ITEM_THRESHOLD = 30;

export function estimateConsolidatedShipping(
  items: Array<{ shipping_jp_eur: number | null; quantity: number }>
): ShippingEstimate {
  let SUM = 0;
  let N = 0;
  let itemsWithData = 0;
  let hasLargeItems = false;

  for (const item of items) {
    const qty = item.quantity || 1;
    if (item.shipping_jp_eur && item.shipping_jp_eur > BASE_FEE) {
      SUM += (item.shipping_jp_eur - BASE_FEE) * qty;
      itemsWithData += qty;
      if (item.shipping_jp_eur > LARGE_ITEM_THRESHOLD) {
        hasLargeItems = true;
      }
    }
    N += qty;
  }

  if (N === 0 || SUM <= 0) {
    return { estimated: null, itemsWithData: 0, totalItems: N, hasLargeItems, needsCalibration: false };
  }

  const estimated = BASE_FEE + SUM * Math.pow(N, -0.194);

  return {
    estimated: Math.round(estimated * 100) / 100,
    itemsWithData,
    totalItems: N,
    hasLargeItems,
    needsCalibration: hasLargeItems,
  };
}

export function calculateCartTotals(
  products: Product[],
  cartItems: Array<{ productId: number; quantity: number }>
) {
  const itemsWithData = cartItems
    .map(ci => {
      const product = products.find(p => p.id === ci.productId);
      if (!product) return null;
      return {
        product,
        quantity: ci.quantity,
        shipping_jp_eur: product.shipping_jp_eur,
      };
    })
    .filter((i): i is NonNullable<typeof i> => i !== null);

  const shipping = estimateConsolidatedShipping(itemsWithData);

  const productsTotal = itemsWithData.reduce(
    (sum, i) => sum + (i.product.price_jp_eur || 0) * i.quantity,
    0
  );

  const italyTotal = itemsWithData.reduce(
    (sum, i) => sum + (i.product.price_it_eur || 0) * i.quantity,
    0
  );

  const totalWithShipping = productsTotal + (shipping.estimated || 0);
  const savingsEur = italyTotal > 0 ? italyTotal - totalWithShipping : 0;
  const savingsPct = italyTotal > 0 ? (savingsEur / italyTotal) * 100 : 0;

  return {
    productsTotal: Math.round(productsTotal * 100) / 100,
    shipping,
    totalWithShipping: Math.round(totalWithShipping * 100) / 100,
    italyTotal: Math.round(italyTotal * 100) / 100,
    savingsEur: Math.round(savingsEur * 100) / 100,
    savingsPct: Math.round(savingsPct * 10) / 10,
    itemCount: itemsWithData.reduce((sum, i) => sum + i.quantity, 0),
  };
}

export { BASE_FEE, LARGE_ITEM_THRESHOLD };
