import { amazonJpUrl, amazonItUrl } from '@/lib/affiliate';

interface AffiliateLinksProps {
  asin: string | null;
}

export function AffiliateLinks({ asin }: AffiliateLinksProps) {
  if (!asin) return null;

  return (
    <div className="flex flex-col gap-2">
      <a
        href={amazonJpUrl(asin)}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 rounded-lg bg-[#ff9900] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#e88b00] transition-colors"
      >
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M.045 18.02c.071-.116.36-.198.544-.227.185-.028.4-.014.656.042.255.056.47.13.645.22.175.09.336.2.482.32.146.12.276.26.392.418.116.158.21.34.282.546.072.206.122.434.15.684.028.25.042.52.042.812v.69c0 .245-.014.456-.042.634-.028.178-.07.32-.128.428-.056.108-.128.188-.214.24-.086.052-.186.078-.3.078s-.228-.028-.342-.084c-.114-.056-.2-.142-.258-.258l-.028-.028c-.076-.114-.13-.248-.164-.402-.034-.154-.05-.332-.05-.534v-.4c0-.268-.01-.494-.028-.678s-.05-.336-.092-.456c-.042-.12-.098-.208-.168-.264-.07-.056-.16-.084-.268-.084-.126 0-.23.04-.312.12-.082.08-.148.198-.196.354-.048.156-.082.344-.1.566-.018.222-.028.472-.028.75v.4c0 .214-.012.39-.036.528-.024.138-.068.246-.132.324-.064.078-.148.118-.252.118-.104 0-.188-.04-.252-.118-.064-.078-.108-.186-.132-.324-.024-.138-.036-.314-.036-.528v-3.264c0-.214.012-.39.036-.528.024-.138.068-.246.132-.324.064-.078.148-.118.252-.118.104 0 .188.04.252.118.064.078.108.186.132.324.024.138.036.314.036.528v.448l.028.028c.064-.178.166-.316.306-.414.14-.098.31-.148.51-.148z" />
        </svg>
        Compra su Amazon JP
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
