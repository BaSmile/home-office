// Pure logic: where is Bassim? home / gym / elsewhere in Kenitra / office (outside Kenitra).

// Home point: Wafa Immobilier, Rue Omar Rifi, Kenitra (closest landmark to Bassim's home).
export const KENITRA = { lat: 34.26243, lon: -6.57962 };

export function distanceKm(a, b) {
  const R = 6371;
  const rad = d => (d * Math.PI) / 180;
  const dLat = rad(b.lat - a.lat);
  const dLon = rad(b.lon - a.lon);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(rad(a.lat)) * Math.cos(rad(b.lat)) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

// Gym: Legends of Fighters, Rue Mohamed Abdou, Kenitra (CrossFit) — ~200 m from home, so the nearest place wins.
export const GYM = { lat: 34.2607946, lon: -6.5783914 };

// Order: a known place (home or gym, whichever is nearest and within its radius) > elsewhere in Kenitra > office.
// GPS accuracy reported by the phone gives some slack (capped) so a fuzzy indoor reading still counts.
export function decide(lat, lon, opts = {}) {
  const { home = KENITRA, gym = GYM, homeRadiusKm = 0.2, gymRadiusKm = 0.1, cityRadiusKm = 15, accM = 0 } = opts;
  const p = { lat, lon };
  const acc = Math.max(Number(accM) || 0, 0) / 1000;
  const dHome = distanceKm(home, p);
  const dGym = distanceKm(gym, p);
  const places = [
    { state: 'home', d: dHome, ok: dHome - Math.min(acc, 0.3) <= homeRadiusKm },
    { state: 'gym', d: dGym, ok: dGym - Math.min(acc, 0.1) <= gymRadiusKm },
  ].filter(x => x.ok).sort((x, y) => x.d - y.d);
  const state = places[0]?.state || (distanceKm(KENITRA, p) <= cityRadiusKm ? 'kenitra' : 'office');
  return { state, distanceKm: Math.round(dHome * 100) / 100 };
}

// Accepts ?lat=&lon=, JSON {lat, lon}, JSON {latitude, longitude} or OwnTracks {_type:"location", lat, lon}.
// Also accepts "34.26,-6.58" in a single `loc` field (handy for iPhone Shortcuts).
export function parseCoords(obj = {}) {
  let lat = obj.lat ?? obj.latitude;
  let lon = obj.lon ?? obj.lng ?? obj.longitude;
  if ((lat == null || lon == null) && typeof obj.loc === 'string') {
    [lat, lon] = obj.loc.split(',').map(s => s.trim());
  }
  lat = Number(String(lat ?? '').replace(',', '.'));
  lon = Number(String(lon ?? '').replace(',', '.'));
  if (!Number.isFinite(lat) || !Number.isFinite(lon) || Math.abs(lat) > 90 || Math.abs(lon) > 180) return null;
  if (lat === 0 && lon === 0) return null;
  return { lat, lon };
}
