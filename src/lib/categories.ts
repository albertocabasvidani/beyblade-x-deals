import type { ProductCategory } from './types';

export interface CategorySEO {
  category: ProductCategory;
  slug: string;
  title: string;
  description: string;
  intro: string;
  keywords: string[];
}

export const CATEGORIES_SEO: CategorySEO[] = [
  {
    category: 'Beyblade',
    slug: 'beyblade-x-trottole',
    title: 'Trottole Beyblade X',
    description: 'Confronta i prezzi delle trottole Beyblade X Takara Tomy tra Amazon Giappone e Italia. Risparmia sulla spedizione consolidata.',
    intro: 'Tutte le trottole Beyblade X disponibili su Amazon Giappone con spedizione in Italia. Confronta i prezzi con Amazon Italia e scopri quanto puoi risparmiare su ogni singola trottola.',
    keywords: ['trottole beyblade x', 'beyblade x beys', 'beyblade x trottole', 'beyblade x takara tomy'],
  },
  {
    category: 'Stadium',
    slug: 'beyblade-x-stadium',
    title: 'Arene e Stadium Beyblade X',
    description: 'Arene e stadium Beyblade X: prezzi Amazon Giappone vs Italia. Beystadium e set da combattimento con spedizione consolidata.',
    intro: 'Le arene ufficiali Beyblade X (Beystadium) disponibili su Amazon Giappone. Confronta i prezzi con Amazon Italia e scopri se conviene comprare dal Giappone, tenendo conto della spedizione per prodotti grandi.',
    keywords: ['beyblade x stadium', 'beyblade x arena', 'beystadium beyblade x'],
  },
  {
    category: 'Starter',
    slug: 'beyblade-x-starter',
    title: 'Starter Set Beyblade X',
    description: 'Starter set Beyblade X con trottola e lanciatore: prezzi Amazon Giappone vs Italia. Ideali per iniziare a giocare.',
    intro: 'Gli starter set includono trottola e lanciatore, ideali per chi inizia con Beyblade X. Confronta i prezzi tra Amazon Giappone e Italia per trovare l\'offerta migliore.',
    keywords: ['beyblade x starter', 'beyblade x set iniziale', 'beyblade x con lanciatore'],
  },
  {
    category: 'Set',
    slug: 'beyblade-x-set',
    title: 'Set Beyblade X',
    description: 'Set e confezioni Beyblade X: prezzi Amazon Giappone vs Italia. Set da combattimento e bundle con spedizione consolidata.',
    intro: 'Set e confezioni speciali Beyblade X disponibili su Amazon Giappone. Include set da combattimento, bundle e confezioni con più trottole. Confronta i prezzi con Amazon Italia.',
    keywords: ['beyblade x set', 'beyblade x set da combattimento', 'beyblade x xtreme battle set'],
  },
  {
    category: 'Launcher',
    slug: 'beyblade-x-lanciatore',
    title: 'Lanciatori Beyblade X',
    description: 'Lanciatori Beyblade X: prezzi Amazon Giappone vs Italia. String launcher, grip e accessori per il lancio.',
    intro: 'I lanciatori ufficiali Beyblade X disponibili su Amazon Giappone. Confronta i prezzi dei lanciatori a corda e a strappo con Amazon Italia.',
    keywords: ['beyblade x lanciatore', 'beyblade x launcher', 'beyblade x string launcher'],
  },
  {
    category: 'Random booster',
    slug: 'beyblade-x-random-booster',
    title: 'Random Booster Beyblade X',
    description: 'Random booster Beyblade X: prezzi Amazon Giappone vs Italia. Trottole casuali con possibilità di varianti rare.',
    intro: 'I random booster Beyblade X contengono una trottola casuale tra diverse varianti, incluse quelle rare. Confronta i prezzi con Amazon Italia.',
    keywords: ['beyblade x random booster', 'beyblade x booster casuale'],
  },
  {
    category: 'Accessory',
    slug: 'beyblade-x-accessori',
    title: 'Accessori Beyblade X',
    description: 'Accessori Beyblade X: custodie, valigette e ricambi. Prezzi Amazon Giappone vs Italia.',
    intro: 'Accessori ufficiali Beyblade X disponibili su Amazon Giappone: custodie, valigette, organizer e ricambi. Confronta i prezzi con Amazon Italia.',
    keywords: ['beyblade x accessori', 'beyblade x valigetta', 'beyblade x custodia'],
  },
  {
    category: 'Booster',
    slug: 'beyblade-x-booster',
    title: 'Booster Beyblade X',
    description: 'Booster Beyblade X: trottole singole senza lanciatore. Prezzi Amazon Giappone vs Italia.',
    intro: 'I booster Beyblade X contengono una trottola singola senza lanciatore. Confronta i prezzi con Amazon Italia per trovare le migliori offerte.',
    keywords: ['beyblade x booster', 'beyblade x trottola singola'],
  },
];

export function getCategorySEOBySlug(slug: string): CategorySEO | undefined {
  return CATEGORIES_SEO.find(c => c.slug === slug);
}

export function getCategorySEOByCategory(category: string): CategorySEO | undefined {
  return CATEGORIES_SEO.find(c => c.category === category);
}

export function getAllCategorySlugs(): string[] {
  return CATEGORIES_SEO.map(c => c.slug);
}
