import { decide, parseCoords } from './logic.js';
import { HOME_SVG, OFFICE_SVG, KENITRA_SVG, GYM_SVG, UNKNOWN_SVG, CHIBI_CSS } from './chibi.js';

const YEAR = 60 * 60 * 24 * 365;

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname.replace(/\/+$/, '') || '/';

    if (path === '/health') return new Response('ok');

    // Password form: typed once, remembered by the phone for a year (nothing in the URL).
    if (path === '/login' && request.method === 'POST') {
      const form = await request.formData();
      const pw = String(form.get('pw') || '').trim();
      const next = form.get('next') === '/me' ? '/me' : '/';
      const h = new Headers({ location: next });
      if (env.OWNER_KEY && pw === env.OWNER_KEY) h.append('set-cookie', cookie('ho', pw));
      else if (env.VIEW_KEY && pw === env.VIEW_KEY) h.append('set-cookie', cookie('hv', pw));
      else return html(lockedPage(next, true), 401);
      return new Response(null, { status: 303, headers: h });
    }

    const owner = isOwner(request, url, env);
    const viewer = owner || isViewer(request, url, env);
    const cookies = [];
    if (url.searchParams.get('k')) {
      const k = url.searchParams.get('k');
      if (env.OWNER_KEY && k === env.OWNER_KEY) cookies.push(cookie('ho', k));
      else if (env.VIEW_KEY && k === env.VIEW_KEY) cookies.push(cookie('hv', k));
    }

    // Location update (from the /me page, iPhone Shortcuts, OwnTracks, Tasker…)
    if (path === '/api/location') {
      if (!owner) return json({ error: 'unauthorized' }, 401);
      let body = {};
      if (request.method === 'POST') {
        const ct = request.headers.get('content-type') || '';
        try {
          body = ct.includes('json') ? await request.json()
            : Object.fromEntries(await request.formData());
        } catch { body = {}; }
      }
      const params = { ...Object.fromEntries(url.searchParams), ...body };
      const isOwnTracks = body._type !== undefined;
      if (isOwnTracks && body._type !== 'location') return json([]);

      let record;
      if (['home', 'gym', 'kenitra', 'office'].includes(params.state)) {
        record = { state: params.state, manual: true };
      } else {
        let c = parseCoords(params);
        if (!c) return json({ error: 'missing or invalid lat/lon' }, 400);
        let acc = Number(params.acc ?? params.accuracy) || null;
        const MAX_PIN = 150;  // a pin must be precise to the street
        const MAX_FIX = 500;  // coarser readings (e.g. Chrome "approximate" location, ±2 km) are ignored
        if (isOwnTracks) await env.KV.put('lastfix', JSON.stringify({ ...c, acc, at: new Date().toISOString() }));

        const setPlace = params.setplace || ((params.sethome === true || params.sethome === 'true') ? 'home' : null);
        if (setPlace === 'home' || setPlace === 'gym') {
          // Use the most precise of: this page's GPS reading, or OwnTracks' last fix (if under 20 min old).
          const last = JSON.parse((await env.KV.get('lastfix')) || 'null');
          const cands = [{ ...c, acc: acc ?? 9999, from: 'page' }];
          if (last && last.acc != null && Date.now() - new Date(last.at) < 20 * 60e3) cands.push({ lat: last.lat, lon: last.lon, acc: last.acc, from: 'owntracks' });
          const best = cands.filter(x => x.acc <= MAX_PIN).sort((a, b) => a.acc - b.acc)[0];
          if (!best) return json({ error: 'imprecise', acc: Math.round(acc ?? 0) }, 422);
          await env.KV.put(setPlace, JSON.stringify({ lat: best.lat, lon: best.lon, acc: Math.round(best.acc), from: best.from, savedAt: new Date().toISOString() }));
          c = { lat: best.lat, lon: best.lon }; acc = best.acc;
        } else if (acc != null && acc > MAX_FIX) {
          return json({ error: 'imprecise', acc: Math.round(acc) }, 422);
        }
        const homePt = await getPin(env, 'home');
        const gymPt = await getPin(env, 'gym');
        record = decide(c.lat, c.lon, {
          home: homePt, gym: gymPt, accM: acc,
          homeRadiusKm: Number(env.HOME_RADIUS_KM || 0.2), gymRadiusKm: Number(env.GYM_RADIUS_KM || 0.1), cityRadiusKm: Number(env.CITY_RADIUS_KM || 15),
        });
        if (acc) record.accM = Math.round(acc);
      }
      record.updatedAt = new Date().toISOString();
      record.source = isOwnTracks ? 'owntracks' : (params.source || 'api');
      await env.KV.put('status', JSON.stringify(record));
      const log = JSON.parse((await env.KV.get('log')) || '[]');
      const entry = { at: record.updatedAt, state: record.state, source: record.source, km: record.distanceKm ?? null, acc: record.accM ?? null };
      const prev = log[0];
      // Same place, same source, less than 10 min ago: refresh that line instead of adding a new one.
      if (prev && prev.state === entry.state && prev.source === entry.source && Date.now() - new Date(prev.at) < 10 * 60e3) log[0] = entry;
      else log.unshift(entry);
      await env.KV.put('log', JSON.stringify(log.slice(0, 15)));
      return isOwnTracks ? json([]) : json(record);
    }

    if (path === '/api/status') {
      if (!viewer) return json({ error: 'unauthorized' }, 401);
      const s = await getStatus(env);
      return json({ state: s.state, updatedAt: s.updatedAt });
    }

    if (path === '/me') {
      if (!owner) return html(lockedPage('/me'), 401);
      const log = JSON.parse((await env.KV.get('log')) || '[]');
      const home = await getPin(env, 'home');
      const gym = await getPin(env, 'gym');
      return html(mePage(env, log, home, gym), 200, cookies);
    }

    if (path === '/') {
      if (!viewer) return html(lockedPage('/'), 401);
      const s = await getStatus(env);
      return html(statusPage(env, s), 200, cookies);
    }

    return new Response('Not found', { status: 404 });
  },
};

// Saved places are only trusted if they were pinned with a precise reading (old imprecise pins are ignored).
async function getPin(env, name) {
  const p = JSON.parse((await env.KV.get(name)) || 'null');
  return p && p.acc != null && p.acc <= 150 ? p : undefined;
}

async function getStatus(env) {
  const raw = await env.KV.get('status');
  return raw ? JSON.parse(raw) : { state: 'unknown', updatedAt: null };
}

function readCookie(request, name) {
  const m = (request.headers.get('cookie') || '').match(new RegExp(`(?:^|;\\s*)${name}=([^;]+)`));
  return m ? decodeURIComponent(m[1]) : null;
}
function given(request, url) {
  const auth = request.headers.get('authorization') || '';
  if (/^Basic\s+/i.test(auth)) { // OwnTracks: any user name, password = key
    try { const dec = atob(auth.replace(/^Basic\s+/i, '')); return dec.slice(dec.indexOf(':') + 1); } catch { return null; }
  }
  return url.searchParams.get('k') || request.headers.get('x-key') || auth.replace(/^Bearer\s+/i, '') || null;
}
function isOwner(request, url, env) {
  if (!env.OWNER_KEY) return true; // no key configured = open (only Bassim and Ouiame have the links)
  return given(request, url) === env.OWNER_KEY || readCookie(request, 'ho') === env.OWNER_KEY;
}
function isViewer(request, url, env) {
  if (!env.VIEW_KEY) return true; // no key configured = open page
  return given(request, url) === env.VIEW_KEY || readCookie(request, 'hv') === env.VIEW_KEY;
}
const cookie = (n, v) => `${n}=${encodeURIComponent(v)}; Path=/; Max-Age=${YEAR}; HttpOnly; Secure; SameSite=Lax`;

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status, headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' },
  });
}
function html(body, status = 200, cookies = []) {
  const h = new Headers({ 'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-store' });
  cookies.forEach(c => h.append('set-cookie', c));
  return new Response(body, { status, headers: h });
}

const LABELS = {
  home: { emoji: '🏠', text: 'à la maison', sub: 'Kénitra', bg: '#e8f5e9', fg: '#1b5e20' },
  office: { emoji: '🏢', text: 'au bureau', sub: 'hors de Kénitra', bg: '#e3f2fd', fg: '#0d47a1' },
  gym: { emoji: '💪', text: 'à la salle', sub: 'Legends of Fighters · CrossFit', bg: '#ffe3d8', fg: '#b71c1c' },
  kenitra: { emoji: '☕', text: 'à Kénitra', sub: 'en ville, pause café', bg: '#f3e5d8', fg: '#5d4037' },
  unknown: { emoji: '❔', text: 'introuvable', sub: 'pas encore de position', bg: '#f5f5f5', fg: '#424242' },
};

const shell = (title, body, bg = '#fafafa', css = '', manifest = '/app.webmanifest') => `<!doctype html><html lang="fr"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<link rel="manifest" href="${manifest}"><meta name="theme-color" content="${bg}">
<link rel="apple-touch-icon" href="/icon-180.png"><meta name="apple-mobile-web-app-capable" content="yes">
<meta name="mobile-web-app-capable" content="yes"><meta name="apple-mobile-web-app-title" content="${manifest === '/me.webmanifest' ? 'Ma position' : 'Bassim'}">
<script>if('serviceWorker' in navigator)navigator.serviceWorker.register('/sw.js').catch(()=>{})</script>
<title>${title}</title>
<link rel="icon" href="/icon-192.png">
<style>
*{box-sizing:border-box}body{margin:0;min-height:100vh;display:flex;align-items:center;justify-content:center;
font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;background:${bg};transition:background .4s;text-align:center;padding:24px}
.card{max-width:420px;width:100%}.emoji{font-size:110px;line-height:1}.who{font-size:20px;opacity:.7;margin-top:18px}
.state{font-size:40px;font-weight:800;margin:4px 0}.sub{font-size:16px;opacity:.6}.when{margin-top:28px;font-size:14px;opacity:.55}
button{font:inherit;font-size:17px;padding:14px 18px;border-radius:14px;border:0;width:100%;margin-top:10px;cursor:pointer}
.primary{background:#111;color:#fff}.ghost{background:#fff;border:1px solid #ddd}
.row{display:flex;gap:10px}.row button{flex:1}.log{margin-top:18px;font-size:14px;opacity:.7;min-height:1.4em}
${css}</style></head><body>${body}</body></html>`;

function officeDayNumbers(env) {
  const map = { dimanche: 0, lundi: 1, mardi: 2, mercredi: 3, jeudi: 4, vendredi: 5, samedi: 6 };
  return (env.OFFICE_DAYS || 'lundi, mercredi, jeudi').toLowerCase().split(/[\s,]+/).map(d => map[d]).filter(n => n != null);
}

function statusPage(env, s) {
  const name = env.OWNER_NAME || 'Bassim';
  const L = LABELS[s.state] || LABELS.unknown;
  return shell(`${name} est ${L.text}`, `
<div class="card" id="c" style="color:${L.fg}">
  <div class="scene" id="e">${HOME_SVG}${GYM_SVG}${KENITRA_SVG}${OFFICE_SVG}${UNKNOWN_SVG}</div>
  <div class="who">${name} est</div>
  <div class="state" id="t">${L.text}</div>
  <div class="sub" id="s">${L.sub}</div>
  <div class="days" id="days">📅 Bureau : <b>${env.OFFICE_DAYS || 'lundi, mercredi, jeudi'}</b><span class="today" id="today"></span></div>
  <div class="when" id="w" data-at="${s.updatedAt || ''}"></div>
</div>
<script>
const L=${JSON.stringify(LABELS)};
function ago(iso){if(!iso)return '';const m=Math.round((Date.now()-new Date(iso))/60000);
 const t=m<1?"à l'instant":m<60?'il y a '+m+' min':m<1440?'il y a '+Math.floor(m/60)+' h':'il y a '+Math.floor(m/1440)+' j';
 return 'Mis à jour '+t+' · '+new Date(iso).toLocaleTimeString('fr-MA',{hour:'2-digit',minute:'2-digit',timeZone:'Africa/Casablanca'});}
let cur=null;
function paint(st,at){const x=L[st]||L.unknown;if(!L[st])st='unknown';document.body.style.background=x.bg;c.style.color=x.fg;
 if(st!==cur){document.body.className=st;e.classList.remove('pop');void e.offsetWidth;e.classList.add('pop');cur=st;}t.textContent=x.text;s.textContent=x.sub;w.dataset.at=at||'';w.textContent=ago(at);
 document.title='${name} est '+x.text;}
paint(${JSON.stringify(s.state)},${JSON.stringify(s.updatedAt)});
setInterval(async()=>{try{const r=await fetch('/api/status',{cache:'no-store'});if(r.ok){const j=await r.json();paint(j.state,j.updatedAt);}}catch{}},30000);
const DAYS=${JSON.stringify(officeDayNumbers(env))};
function today(){const d=new Date(new Date().toLocaleString('en-US',{timeZone:'Africa/Casablanca'})).getDay();
 document.getElementById('today').textContent=DAYS.includes(d)?"· aujourd'hui ✅":"· pas aujourd'hui";}
today();setInterval(()=>{w.textContent=ago(w.dataset.at);today();},20000);
</script>`, L.bg, CHIBI_CSS);
}

const ICON = { home: '🏠', gym: '💪', kenitra: '☕', office: '🏢' };

function mePage(env, log = [], home = null, gym = null) {
  const gymInfo = gym ? 'Salle enregistrée le ' + new Date(gym.savedAt).toLocaleDateString('fr-MA') + ' (±' + gym.acc + ' m) · rayon ' + Math.round(Number(env.GYM_RADIUS_KM || 0.1) * 1000) + ' m' : 'Salle actuelle : point Legends of Fighters (Google Maps)';
  const homeInfo = home ? 'Maison enregistrée le ' + new Date(home.savedAt).toLocaleDateString('fr-MA') + ' (±' + home.acc + ' m) · rayon ' + Math.round(Number(env.HOME_RADIUS_KM || 0.2) * 1000) + ' m' : 'Maison actuelle : point Wafa Immobilier (Google Maps)';
  const SRC = { owntracks: 'OwnTracks', fused: 'OwnTracks', gps: 'OwnTracks', network: 'OwnTracks', 'me-page': 'cette page', manual: 'manuel', api: 'API' };
  const isOT = l => SRC[l.source] === 'OwnTracks';
  const rows = log.map(l => `<tr data-at="${l.at}"><td class="ago"></td><td>${ICON[l.state] || '❔'}</td>
    <td>${SRC[l.source] || l.source}</td><td>${l.km != null ? (l.km < 1 ? Math.round(l.km * 1000) + ' m' : l.km + ' km') : '—'}${l.acc ? ` <small style="opacity:.55">±${l.acc} m</small>` : ''}</td></tr>`).join('');
  const last = log[0];
  const lastOT = log.find(isOT);
  const ok = lastOT && (Date.now() - new Date(lastOT.at)) < 6 * 3600e3;
  return shell('Ma position', `
<div class="card">
  <div class="emoji" id="e">${last ? ICON[last.state] || '📍' : '📍'}</div>
  <div class="state" style="font-size:28px">Ma position</div>
  <div class="badge ${ok ? 'ok' : 'warn'}">${ok ? '✅ OwnTracks fonctionne' : last ? '⚠️ Pas de nouvelle position OwnTracks depuis 6 h' : '⏳ Aucune position reçue'}</div>
  <table class="hist">${rows || '<tr><td>Rien pour l\'instant</td></tr>'}</table>
  <button class="primary" id="go">📍 Envoyer ma position GPS maintenant</button>
  <div class="row"><button class="ghost" data-s="home">🏠 Maison</button><button class="ghost" data-s="gym">💪 Salle</button><button class="ghost" data-s="kenitra">☕ Kénitra</button><button class="ghost" data-s="office">🏢 Bureau</button></div>
  <button class="ghost" data-set="home" style="margin-top:18px">📌 Je suis à la maison : enregistrer cette position</button>
  <div class="sub" style="font-size:13px;margin-top:6px">${homeInfo}</div>
  <button class="ghost" data-set="gym" style="margin-top:12px">📌 Je suis à la salle : enregistrer cette position</button>
  <div class="sub" style="font-size:13px;margin-top:6px">${gymInfo}</div>
  <div class="log" id="log"></div>
  <p class="when"><a href="/">Voir la page de Ouiame</a></p>
</div>
<script>
const say=t=>log.textContent=t;
function ago(iso){const m=Math.round((Date.now()-new Date(iso))/60000);return m<1?"à l'instant":m<60?m+' min':m<1440?Math.floor(m/60)+' h '+(m%60)+' min':Math.floor(m/1440)+' j';}
document.querySelectorAll('tr[data-at]').forEach(r=>{const d=new Date(r.dataset.at);r.querySelector('.ago').textContent=ago(r.dataset.at)+' · '+d.toLocaleTimeString('fr-MA',{hour:'2-digit',minute:'2-digit',timeZone:'Africa/Casablanca'});});
async function send(body){const r=await fetch('/api/location',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify(body)});
 const j=await r.json();if(!r.ok){if(j.error==='imprecise'){say('Position trop imprécise (±'+j.acc+' m). Ouvre OwnTracks et appuie sur la flèche « publier », puis réessaie ici. Ou active « Position exacte » pour Chrome : Paramètres → Applis → Chrome → Autorisations → Position.');}else say('Erreur : '+(j.error||r.status));return;}say('Envoyé ✔');setTimeout(()=>location.reload(),600);}
go.onclick=()=>{if(!navigator.geolocation){say('GPS indisponible : utilise les boutons.');return;}say('Recherche de la position…');
 navigator.geolocation.getCurrentPosition(p=>send({lat:p.coords.latitude,lon:p.coords.longitude,source:'me-page'}),
  err=>say('GPS refusé ou indisponible ('+err.message+'). Utilise les boutons.'),{enableHighAccuracy:false,timeout:20000,maximumAge:120000});};
document.querySelectorAll('[data-s]').forEach(b=>b.onclick=()=>send({state:b.dataset.s,source:'manual'}));
document.querySelectorAll('[data-set]').forEach(b=>b.onclick=()=>{if(!navigator.geolocation){say('GPS indisponible.');return;}say('Position précise en cours… reste immobile');
 navigator.geolocation.getCurrentPosition(p=>send({lat:p.coords.latitude,lon:p.coords.longitude,acc:p.coords.accuracy,setplace:b.dataset.set,source:'me-page'}),
  err=>say('GPS refusé ou indisponible ('+err.message+').'),{enableHighAccuracy:true,timeout:30000,maximumAge:0});});
setInterval(()=>location.reload(),60000);
</script>`, '#fafafa', `.badge{margin:14px 0 6px;padding:10px 12px;border-radius:12px;font-size:15px;font-weight:600}
.ok{background:#e8f5e9;color:#1b5e20}.warn{background:#fff3e0;color:#e65100}
.hist{width:100%;border-collapse:collapse;font-size:14px;margin:6px 0 10px;text-align:left}.hist td{padding:7px 4px;border-bottom:1px solid #eee}`, '/me.webmanifest');
}

function lockedPage(next = '/', wrong = false) {
  return shell('🔒', `<form class="card" method="post" action="/login">
  <div class="emoji">🔒</div>
  <input type="hidden" name="next" value="${next}">
  <input name="pw" type="password" placeholder="Mot de passe" autofocus autocomplete="current-password"
    style="font:inherit;font-size:18px;padding:14px;border-radius:14px;border:1px solid #ddd;width:100%;margin-top:20px">
  <button class="primary">Entrer</button>
  <div class="log">${wrong ? 'Mot de passe incorrect' : ''}</div>
</form>`);
}
