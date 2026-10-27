import { expect, test } from 'bun:test';
import { plannotatorV2Storage } from './plannotatorV2Storage';
import { cookieStorage } from './storage';
import { plannotatorGmailStorage } from './plannotatorGmailStorage';
import { plannotatorSuperhumanStorage } from './plannotatorSuperhumanStorage';

test.skipIf(typeof document === 'undefined')('the Superhuman version keeps original, Craft and Gmail cookies independent', () => {
  const key = 'fork-isolation-test';
  const previousUrl = window.location.href;
  const dom = (window as unknown as { happyDOM: { setURL(url: string): void } }).happyDOM;
  dom.setURL('http://127.0.0.1:4000/');
  try {
    cookieStorage.setItem(key, 'original');
    plannotatorV2Storage.setItem(key, 'craft');
    expect(cookieStorage.getItem(key)).toBe('original');
    expect(plannotatorV2Storage.getItem(key)).toBe('craft');
    plannotatorGmailStorage.setItem(key,'gmail');
    expect(plannotatorSuperhumanStorage.getItem(key)).toBeNull();
    plannotatorSuperhumanStorage.setItem(key, 'fork');
    expect(cookieStorage.getItem(key)).toBe('original');
    expect(plannotatorV2Storage.getItem(key)).toBe('craft');
    expect(plannotatorSuperhumanStorage.getItem(key)).toBe('fork');
    expect(plannotatorGmailStorage.getItem(key)).toBe('gmail');
    plannotatorSuperhumanStorage.removeItem(key);
    expect(plannotatorSuperhumanStorage.getItem(key) || null).toBeNull();
    expect(cookieStorage.getItem(key)).toBe('original');
    expect(plannotatorV2Storage.getItem(key)).toBe('craft');
  } finally {
    plannotatorSuperhumanStorage.removeItem(key);
    plannotatorGmailStorage.removeItem(key);
    cookieStorage.removeItem(key);
    plannotatorV2Storage.removeItem(key);
    dom.setURL(previousUrl);
  }
});
