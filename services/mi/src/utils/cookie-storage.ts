import Cookies from 'js-cookie';
import { PersistStorage } from 'recoil-persist';

export const cookieStorage: PersistStorage = {
  setItem(key: string, value: string): void {
    Cookies.set(key, value);
  },
  getItem(key: string): string | null {
    return Cookies.get(key) || null;
  },
};
