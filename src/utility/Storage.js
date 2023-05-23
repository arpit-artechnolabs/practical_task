import { EncryptStorage } from 'encrypt-storage';

export const encryptStorage1 = new EncryptStorage('secret-key-value', {
    prefix: '@instance1',
    storageType: 'sessionStorage'
  });