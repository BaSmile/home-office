import { test } from 'node:test';
import assert from 'node:assert/strict';
import { decide, parseCoords } from '../src/logic.js';

test('Wafa Immobilier point is home', () => assert.equal(decide(34.26243, -6.57962).state, 'home'));
test('300 m away is still home', () => assert.equal(decide(34.2610, -6.5820).state, 'home'));
test('Elsewhere in Kenitra (2 km) is kenitra', () => assert.equal(decide(34.2450, -6.5650).state, 'kenitra'));
test('Mehdia (~11 km) is kenitra', () => assert.equal(decide(34.2580, -6.6500).state, 'kenitra'));
test('Rabat is office', () => assert.equal(decide(34.0209, -6.8416).state, 'office'));
test('Casablanca is office', () => assert.equal(decide(33.5731, -7.5898).state, 'office'));
test('parse variants', () => {
  assert.deepEqual(parseCoords({ lat: '34.26', lon: '-6.58' }), { lat: 34.26, lon: -6.58 });
  assert.deepEqual(parseCoords({ latitude: 34.26, longitude: -6.58 }), { lat: 34.26, lon: -6.58 });
  assert.deepEqual(parseCoords({ loc: '34.26,-6.58' }), { lat: 34.26, lon: -6.58 });
  assert.equal(parseCoords({}), null);
  assert.equal(parseCoords({ lat: 0, lon: 0 }), null);
});
