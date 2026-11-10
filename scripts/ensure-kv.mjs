// Deploy helper: make sure the KV namespace exists and put its id in wrangler.toml.
import { execSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';

const NAME = 'home-office';
const run = cmd => execSync(cmd, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'inherit'] });
const list = () => { const out = run('npx wrangler kv namespace list'); return JSON.parse(out.slice(out.indexOf('['))); };
const find = () => list().find(n => n.title === NAME || n.title === `${NAME}-KV` || n.title.endsWith(`-${NAME}`));

let ns = find();
if (!ns) {
  console.log(`Creating KV namespace ${NAME}…`);
  run(`npx wrangler kv namespace create ${NAME}`);
  ns = find();
}
if (!ns?.id) throw new Error('KV namespace not found after creation');
const toml = readFileSync('wrangler.toml', 'utf8');
writeFileSync('wrangler.toml', toml.replace('__KV_ID__', ns.id));
console.log(`KV ${ns.title}: ${ns.id}`);
