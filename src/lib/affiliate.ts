const JP_TAG = process.env.NEXT_PUBLIC_AFFILIATE_TAG_JP || '';
const IT_TAG = process.env.NEXT_PUBLIC_AFFILIATE_TAG_IT || '';

export function amazonJpUrl(asin: string): string {
  const base = `https://www.amazon.co.jp/-/en/dp/${asin}`;
  return JP_TAG ? `${base}?tag=${JP_TAG}` : base;
}

export function amazonItUrl(asin: string): string {
  const base = `https://www.amazon.it/dp/${asin}`;
  return IT_TAG ? `${base}?tag=${IT_TAG}` : base;
}

export function amazonJpCartUrl(items: Array<{ asin: string; qty: number }>): string {
  const params = items
    .map((item, i) => `ASIN.${i + 1}=${item.asin}&Quantity.${i + 1}=${item.qty}`)
    .join('&');
  const tag = JP_TAG ? `&tag=${JP_TAG}` : '';
  return `https://www.amazon.co.jp/-/en/gp/aws/cart/add.html?${params}${tag}`;
}
