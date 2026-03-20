/**
 * Script di monitoraggio SEO via Google Search Console API.
 * Raccoglie: pagine indicizzate, query con impression/click/posizione.
 * Salva i risultati in seo-reports/{data}.json
 *
 * Uso: node scripts/gsc-monitor.js
 * Task Windows: eseguire quotidianamente
 */

const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');

require('dotenv').config({ path: path.join(__dirname, '..', '.env.local') });

const CLIENT_ID = process.env.GSC_CLIENT_ID;
const CLIENT_SECRET = process.env.GSC_CLIENT_SECRET;
const REFRESH_TOKEN = process.env.GSC_REFRESH_TOKEN;
const SITE_URL = process.env.GSC_SITE_URL || 'https://beyblade-x-deals.vercel.app/';

if (!CLIENT_ID || !CLIENT_SECRET || !REFRESH_TOKEN) {
  console.error('Mancano credenziali GSC in .env.local. Esegui prima: node scripts/gsc-auth.js');
  process.exit(1);
}

const oauth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET);
oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const searchconsole = google.searchconsole({ version: 'v1', auth: oauth2Client });

// Date: ultimi 28 giorni
const endDate = new Date();
endDate.setDate(endDate.getDate() - 2); // GSC ha 2 giorni di ritardo
const startDate = new Date(endDate);
startDate.setDate(startDate.getDate() - 28);

function formatDate(d) {
  return d.toISOString().split('T')[0];
}

function formatDateIT(d) {
  const dd = String(d.getDate()).padStart(2, '0');
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const yyyy = d.getFullYear();
  return `${dd}/${mm}/${yyyy}`;
}

async function getSearchAnalytics() {
  try {
    const res = await searchconsole.searchanalytics.query({
      siteUrl: SITE_URL,
      requestBody: {
        startDate: formatDate(startDate),
        endDate: formatDate(endDate),
        dimensions: ['query'],
        rowLimit: 100,
        type: 'web',
      },
    });
    return res.data.rows || [];
  } catch (err) {
    console.error('Errore search analytics:', err.message);
    return [];
  }
}

async function getPageAnalytics() {
  try {
    const res = await searchconsole.searchanalytics.query({
      siteUrl: SITE_URL,
      requestBody: {
        startDate: formatDate(startDate),
        endDate: formatDate(endDate),
        dimensions: ['page'],
        rowLimit: 100,
        type: 'web',
      },
    });
    return res.data.rows || [];
  } catch (err) {
    console.error('Errore page analytics:', err.message);
    return [];
  }
}

async function getIndexStatus() {
  try {
    const res = await searchconsole.sitemaps.list({ siteUrl: SITE_URL });
    return (res.data.sitemap || []).map(s => ({
      path: s.path,
      lastSubmitted: s.lastSubmitted,
      lastDownloaded: s.lastDownloaded,
      isPending: s.isPending,
      warnings: s.warnings,
      errors: s.errors,
    }));
  } catch (err) {
    console.error('Errore sitemap status:', err.message);
    return [];
  }
}

async function main() {
  console.log(`\n=== SEO Monitor BX Deals — ${formatDateIT(new Date())} ===\n`);
  console.log(`Periodo: ${formatDateIT(startDate)} - ${formatDateIT(endDate)}\n`);

  const [queries, pages, sitemaps] = await Promise.all([
    getSearchAnalytics(),
    getPageAnalytics(),
    getIndexStatus(),
  ]);

  // Calcola totali
  const totalClicks = queries.reduce((sum, r) => sum + (r.clicks || 0), 0);
  const totalImpressions = queries.reduce((sum, r) => sum + (r.impressions || 0), 0);
  const avgPosition = queries.length > 0
    ? queries.reduce((sum, r) => sum + (r.position || 0), 0) / queries.length
    : 0;

  // Carica report precedente per confronto
  const reportsDir = path.join(__dirname, '..', 'seo-reports');
  let prevReport = null;
  if (fs.existsSync(reportsDir)) {
    const files = fs.readdirSync(reportsDir)
      .filter(f => f.endsWith('.json') && f !== 'latest.json')
      .sort()
      .reverse();
    if (files.length > 0) {
      try {
        prevReport = JSON.parse(fs.readFileSync(path.join(reportsDir, files[0]), 'utf-8'));
      } catch {}
    }
  }

  // Funzione per mostrare variazione
  function delta(current, previous, lowerIsBetter = false) {
    if (previous === undefined || previous === null) return '';
    const diff = current - previous;
    if (diff === 0) return ' (=)';
    const arrow = lowerIsBetter ? (diff < 0 ? ' ↑' : ' ↓') : (diff > 0 ? ' ↑' : ' ↓');
    const sign = diff > 0 ? '+' : '';
    return ` (${sign}${typeof current === 'number' && !Number.isInteger(current) ? diff.toFixed(1) : diff}${arrow})`;
  }

  // Report console
  console.log('--- RIEPILOGO ---');
  const prev = prevReport?.summary;
  console.log(`Click totali: ${totalClicks}${delta(totalClicks, prev?.totalClicks)}`);
  console.log(`Impression totali: ${totalImpressions}${delta(totalImpressions, prev?.totalImpressions)}`);
  console.log(`Posizione media: ${avgPosition.toFixed(1)}${delta(+avgPosition.toFixed(1), prev?.avgPosition, true)}`);
  console.log(`Query uniche: ${queries.length}${delta(queries.length, prev?.uniqueQueries)}`);
  console.log(`Pagine con traffico: ${pages.length}`);

  // Alert miglioramento/peggioramento
  if (prev) {
    console.log('');
    console.log('--- VARIAZIONI ---');
    const impChange = totalImpressions - (prev.totalImpressions || 0);
    const clickChange = totalClicks - (prev.totalClicks || 0);
    const posChange = prev.avgPosition ? +(avgPosition - prev.avgPosition).toFixed(1) : 0;
    const queryChange = queries.length - (prev.uniqueQueries || 0);

    if (impChange > 0 || clickChange > 0 || posChange < 0 || queryChange > 0) {
      console.log('MIGLIORAMENTI:');
      if (clickChange > 0) console.log(`  + ${clickChange} click in piu`);
      if (impChange > 0) console.log(`  + ${impChange} impression in piu`);
      if (posChange < 0) console.log(`  + Posizione migliorata di ${Math.abs(posChange)} posti`);
      if (queryChange > 0) console.log(`  + ${queryChange} nuove query`);
    }

    if (impChange < 0 || clickChange < 0 || posChange > 0) {
      console.log('PEGGIORAMENTI:');
      if (clickChange < 0) console.log(`  - ${Math.abs(clickChange)} click in meno`);
      if (impChange < 0) console.log(`  - ${Math.abs(impChange)} impression in meno`);
      if (posChange > 0) console.log(`  - Posizione peggiorata di ${posChange} posti`);
    }

    if (impChange === 0 && clickChange === 0 && posChange === 0 && queryChange === 0) {
      console.log('Nessuna variazione rispetto al report precedente.');
    }

    // Nuove query rispetto al report precedente
    const prevQueries = new Set((prevReport.topQueries || []).map(q => q.query));
    const newQueries = queries
      .filter(q => !prevQueries.has(q.keys?.[0]))
      .sort((a, b) => (b.impressions || 0) - (a.impressions || 0))
      .slice(0, 10);

    if (newQueries.length > 0) {
      console.log('');
      console.log('NUOVE QUERY (non presenti nel report precedente):');
      for (const q of newQueries) {
        console.log(`  "${q.keys?.[0]}" — ${q.impressions || 0} impr., pos. ${(q.position || 0).toFixed(1)}`);
      }
    }

    // Query che hanno perso posizioni
    const prevQueryMap = new Map((prevReport.topQueries || []).map(q => [q.query, q]));
    const lostPositions = queries
      .filter(q => {
        const pq = prevQueryMap.get(q.keys?.[0]);
        return pq && (q.position || 0) > pq.position + 2; // peggiorato di 2+ posti
      })
      .map(q => ({
        query: q.keys?.[0],
        posNow: +(q.position || 0).toFixed(1),
        posPrev: prevQueryMap.get(q.keys?.[0]).position,
      }));

    if (lostPositions.length > 0) {
      console.log('');
      console.log('QUERY IN CALO (peggioramento > 2 posizioni):');
      for (const q of lostPositions) {
        console.log(`  "${q.query}" — da pos. ${q.posPrev} a ${q.posNow} (${(q.posNow - q.posPrev).toFixed(1)} posti)`);
      }
    }
  }
  console.log('');

  if (queries.length > 0) {
    console.log('--- TOP 20 QUERY ---');
    const topQueries = [...queries]
      .sort((a, b) => (b.impressions || 0) - (a.impressions || 0))
      .slice(0, 20);

    console.log('Query'.padEnd(50) + 'Click'.padStart(8) + 'Impr.'.padStart(8) + 'Pos.'.padStart(8));
    console.log('-'.repeat(74));
    for (const q of topQueries) {
      const query = (q.keys?.[0] || '').substring(0, 48);
      console.log(
        query.padEnd(50) +
        String(q.clicks || 0).padStart(8) +
        String(q.impressions || 0).padStart(8) +
        (q.position || 0).toFixed(1).padStart(8)
      );
    }
    console.log('');
  }

  if (pages.length > 0) {
    console.log('--- TOP 20 PAGINE ---');
    const topPages = [...pages]
      .sort((a, b) => (b.impressions || 0) - (a.impressions || 0))
      .slice(0, 20);

    console.log('Pagina'.padEnd(60) + 'Click'.padStart(8) + 'Impr.'.padStart(8));
    console.log('-'.repeat(76));
    for (const p of topPages) {
      const page = (p.keys?.[0] || '').replace(SITE_URL, '/').substring(0, 58);
      console.log(
        page.padEnd(60) +
        String(p.clicks || 0).padStart(8) +
        String(p.impressions || 0).padStart(8)
      );
    }
    console.log('');
  }

  // Salva report JSON
  if (!fs.existsSync(reportsDir)) {
    fs.mkdirSync(reportsDir, { recursive: true });
  }

  const today = new Date().toISOString().split('T')[0];
  const report = {
    date: today,
    period: { start: formatDate(startDate), end: formatDate(endDate) },
    summary: { totalClicks, totalImpressions, avgPosition: +avgPosition.toFixed(1), uniqueQueries: queries.length },
    topQueries: queries
      .sort((a, b) => (b.impressions || 0) - (a.impressions || 0))
      .slice(0, 50)
      .map(q => ({
        query: q.keys?.[0],
        clicks: q.clicks || 0,
        impressions: q.impressions || 0,
        ctr: +(q.ctr || 0).toFixed(4),
        position: +(q.position || 0).toFixed(1),
      })),
    topPages: pages
      .sort((a, b) => (b.impressions || 0) - (a.impressions || 0))
      .slice(0, 50)
      .map(p => ({
        page: p.keys?.[0],
        clicks: p.clicks || 0,
        impressions: p.impressions || 0,
        position: +(p.position || 0).toFixed(1),
      })),
    sitemaps,
  };

  const reportPath = path.join(reportsDir, `${today}.json`);
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  console.log(`Report salvato: seo-reports/${today}.json\n`);
}

main().catch(err => {
  console.error('Errore fatale:', err.message);
  process.exit(1);
});
