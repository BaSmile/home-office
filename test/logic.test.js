import { test } from 'node:test';
import assert from 'node:assert/strict';
import { decide, parseCoords, GYM } from '../src/logic.js';

test('Wafa Immobilier point is home', () => assert.equal(decide(34.26243, -6.57962).state, 'home'));
test('100 m away (indoor GPS drift) is still home', () => assert.equal(decide(34.2615, -6.5800).state, 'home'));
test('500 m away is kenitra', () => assert.equal(decide(34.2580, -6.5820).state, 'kenitra'));
test('400 m north with 250 m GPS accuracy is home', () => assert.equal(decide(34.2660, -6.5790, { accM: 250 }).state, 'home'));
test('400 m north with good GPS is kenitra', () => assert.equal(decide(34.2660, -6.5790, { accM: 10 }).state, 'kenitra'));
test('custom home point', () => assert.equal(decide(34.2650, -6.5750, { home: { lat: 34.2651, lon: -6.5751 } }).state, 'home'));
test('Legends of Fighters is gym', () => assert.equal(decide(GYM.lat, GYM.lon).state, 'gym'));
test('at home with fuzzy GPS stays home (nearest wins)', () => assert.equal(decide(34.26243, -6.57962, { accM: 200 }).state, 'home'));
test('Elsewhere in Kenitra (2 km) is kenitra', () => assert.equal(decide(34.2450, -6.5650).state, 'kenitra'));
test('Mehdia (~11 km) is kenitra', () => assert.equal(decide(34.2580, -6.6500).state, 'kenitra'));
test('Rabat is office', () => assert.equal(decide(34.0209, -6.8416).state, 'office'));
test('Casablanca is office', () => assert.equal(decide(33.5731, -7.5898).state, 'office'));
test('parse variants', () => {
  assert.deepEqual(parseCoords({ lat: '34.26', lon: '-6.58' }), { lat: 34.26, lon: -6.58 });
  assert.deepEqual(parseCoords({ loc: '34.26,-6.58' }), { lat: 34.26, lon: -6.58 });
  assert.equal(parseCoords({}), null);
});
