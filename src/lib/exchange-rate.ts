interface ExchangeRate {
  jpy_eur: number;
  fetchedAt: string;
}

const CACHE_KEY = 'bx-exchange-rate';
const CACHE_TTL = 60 * 60 * 1000; // 1 hour

export async function getExchangeRate(): Promise<ExchangeRate> {
  if (typeof window !== 'undefined') {
    const cached = sessionStorage.getItem(CACHE_KEY);
    if (cached) {
      const data = JSON.parse(cached) as ExchangeRate & { cachedAt: number };
      if (Date.now() - data.cachedAt < CACHE_TTL) {
        return { jpy_eur: data.jpy_eur, fetchedAt: data.fetchedAt };
      }
    }
  }

  const res = await fetch('https://api.frankfurter.app/latest?from=JPY&to=EUR');
  const data = await res.json();
  const rate: ExchangeRate = {
    jpy_eur: data.rates.EUR,
    fetchedAt: new Date().toISOString(),
  };

  if (typeof window !== 'undefined') {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify({ ...rate, cachedAt: Date.now() }));
  }

  return rate;
}
