import { amazonJpCartUrl, amazonJpUrl, amazonItUrl } from '@/lib/affiliate';

interface AffiliateLinksProps {
  asin: string | null;
}

export function AffiliateLinks({ asin }: AffiliateLinksProps) {
  if (!asin) return null;

  return (
    <div className="flex flex-col gap-2">
      <a
        href={amazonJpCartUrl([{ asin, qty: 1 }])}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 rounded-lg bg-[#ff9900] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#e88b00] transition-colors"
      >
        Aggiungi al carrello Amazon JP
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
        </svg>
      </a>
      <a
        href={amazonJpUrl(asin)}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
      >
        Vedi su Amazon JP
      </a>
      <a
        href={amazonItUrl(asin)}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
      >
        Confronta su Amazon IT
      </a>
    </div>
  );
}
