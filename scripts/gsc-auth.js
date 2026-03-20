/**
 * Script di autenticazione OAuth2 per Google Search Console API.
 * Eseguire UNA VOLTA per ottenere il refresh token.
 *
 * Uso: node scripts/gsc-auth.js
 *
 * Apre il browser per il consenso Google, poi salva il refresh token in .env.local
 */

const { google } = require('googleapis');
const http = require('http');
const fs = require('fs');
const path = require('path');

require('dotenv').config({ path: path.join(__dirname, '..', '.env.local') });

const CLIENT_ID = process.env.GSC_CLIENT_ID;
const CLIENT_SECRET = process.env.GSC_CLIENT_SECRET;
const REDIRECT_PORT = 3901;
const REDIRECT_URI = `http://localhost:${REDIRECT_PORT}/callback`;

if (!CLIENT_ID || !CLIENT_SECRET) {
  console.error('Mancano GSC_CLIENT_ID o GSC_CLIENT_SECRET in .env.local');
  process.exit(1);
}

const oauth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

const authUrl = oauth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: ['https://www.googleapis.com/auth/webmasters.readonly'],
  prompt: 'consent',
});

console.log('\n=== Autenticazione Google Search Console ===\n');
console.log('Apri questo URL nel browser:\n');
console.log(authUrl);
console.log('\nIn attesa del callback...\n');

const server = http.createServer(async (req, res) => {
  if (!req.url.startsWith('/callback')) {
    res.writeHead(404);
    res.end();
    return;
  }

  const url = new URL(req.url, `http://localhost:${REDIRECT_PORT}`);
  const code = url.searchParams.get('code');

  if (!code) {
    res.writeHead(400);
    res.end('Errore: nessun codice ricevuto');
    server.close();
    return;
  }

  try {
    const { tokens } = await oauth2Client.getToken(code);
    const refreshToken = tokens.refresh_token;

    if (!refreshToken) {
      res.writeHead(500);
      res.end('Errore: nessun refresh token ricevuto. Riprova con prompt=consent.');
      server.close();
      return;
    }

    // Aggiungi refresh token a .env.local
    const envPath = path.join(__dirname, '..', '.env.local');
    let envContent = fs.readFileSync(envPath, 'utf-8');

    if (envContent.includes('GSC_REFRESH_TOKEN=')) {
      envContent = envContent.replace(/GSC_REFRESH_TOKEN=.*/, `GSC_REFRESH_TOKEN=${refreshToken}`);
    } else {
      envContent += `\nGSC_REFRESH_TOKEN=${refreshToken}\n`;
    }

    fs.writeFileSync(envPath, envContent);

    console.log('Refresh token salvato in .env.local');
    console.log('Ora puoi eseguire: node scripts/gsc-monitor.js\n');

    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end('<h1>Autenticazione completata!</h1><p>Puoi chiudere questa finestra.</p>');
  } catch (err) {
    console.error('Errore:', err.message);
    res.writeHead(500);
    res.end('Errore: ' + err.message);
  }

  server.close();
});

server.listen(REDIRECT_PORT, () => {
  // Apri il browser automaticamente
  const { exec } = require('child_process');
  exec(`start "" "${authUrl}"`);
});
