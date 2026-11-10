// Deploy helper: copy the Worker secrets set in GitHub (Settings → Secrets → Actions) to Cloudflare.
// Only non-empty values are sent, so secrets set directly in Cloudflare are never erased.
import { execSync } from 'node:child_process';
import { writeFileSync, unlinkSync } from 'node:fs';

const names = ['OWNER_KEY', 'VIEW_KEY'];
const vals = Object.fromEntries(names.filter(n => process.env[n]).map(n => [n, process.env[n]]));
if (!Object.keys(vals).length) { console.log('No Worker secrets in GitHub: skipping'); process.exit(0); }
writeFileSync('.secrets.json', JSON.stringify(vals));
try { execSync('npx wrangler secret bulk .secrets.json', { stdio: 'inherit' }); }
finally { unlinkSync('.secrets.json'); }
console.log('Synced:', Object.keys(vals).join(', '));
