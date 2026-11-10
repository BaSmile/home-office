import { test } from 'node:test';
import assert from 'node:assert/strict';
import { decide, parseCoords } from '../src/logic.js';

test('Kenitra centre is home', () => assert.equal(decide(34.2610, -6.5802).state, 'home'));
test('Kenitra Mehdia side is home', () => assert.equal(decide(34.2580, -6.6500).state, 'home'));
test('Rabat is office', () => assert.equal(decide(34.0209, -6.8416).state, 'office'));
test('Casablanca is office', () => assert.equal(decide(33.5731, -7.5898).state, 'office'));
test('parse variants', () => {
  assert.deepEqual(parseCoords({ lat: '34.26', lon: '-6.58' }), { lat: 34.26, lon: -6.58 });
  assert.deepEqual(parseCoords({ latitude: 34.26, longitude: -6.58 }), { lat: 34.26, lon: -6.58 });
  assert.deepEqual(parseCoords({ loc: '34.26,-6.58' }), { lat: 34.26, lon: -6.58 });
  assert.equal(parseCoords({}), null);
  assert.equal(parseCoords({ lat: 0, lon: 0 }), null);
});
