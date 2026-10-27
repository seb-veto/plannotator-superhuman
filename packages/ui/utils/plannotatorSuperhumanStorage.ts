import { cookieStorage, type StorageBackend } from './storage';

/** The fork can run beside the original Inbox without changing its appearance or layout cookies. */
export const plannotatorSuperhumanStorage: StorageBackend = {
  getItem: (key) => cookieStorage.getItem(`plannotator-superhuman-${key}`),
  setItem: (key, value) => cookieStorage.setItem(`plannotator-superhuman-${key}`, value),
  removeItem: (key) => cookieStorage.removeItem(`plannotator-superhuman-${key}`),
};
