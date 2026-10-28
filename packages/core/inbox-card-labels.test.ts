import { expect, test } from 'bun:test';
import { normalizeInboxCardLabels } from './inbox-cards';

test('labels normalize names and deduplicate without losing the first spelling', () => {
  expect(normalizeInboxCardLabels(['  Release   work ', 'release work', 'Design'])).toEqual({ labels: ['Release work', 'Design'] });
  expect(normalizeInboxCardLabels([])).toEqual({ labels: [] });
  expect(normalizeInboxCardLabels(['😀'.repeat(40)])).toEqual({ labels: ['😀'.repeat(40)] });
});

test('label boundaries reject malformed names and too many labels', () => {
  for (const labels of [null, 'work', [1], [''], ['x\ny'], ['x\u202ey'], ['x'.repeat(41)], Array.from({ length: 13 }, (_, i) => `Label ${i}`)]) expect(normalizeInboxCardLabels(labels)).toHaveProperty('error');
});
