// Pure logic: where is Bassim? Kenitra = home, anywhere else = office.

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

// home = close to the house (Wafa Immobilier point), kenitra = elsewhere in the city, office = outside Kenitra.
export function decide(lat, lon, homeRadiusKm = 0.5, cityRadiusKm = 15, center = KENITRA) {
  const d = distanceKm(center, { lat, lon });
  const state = d <= homeRadiusKm ? 'home' : d <= cityRadiusKm ? 'kenitra' : 'office';
  return { state, distanceKm: Math.round(d * 100) / 100 };
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
