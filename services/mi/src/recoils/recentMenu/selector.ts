import { selector } from 'recoil';
import recentMenu from './atom';

export const recentMenuSelector = selector({
  key: 'recent-view-menu-selector',
  get: ({ get }) => {
    const value = get(recentMenu);
    return value?.slice(0, 4);
  },
  set: ({ set, get }, value) => {
    const newValue = [...get(recentMenu)];

    const findIndex = newValue.findIndex(
      ({ currentInfo }) => currentInfo.path === value.currentInfo.path,
    );
    newValue.unshift(value);
    if (findIndex !== -1) {
      newValue.splice(findIndex + 1, 1);
    }

    set(recentMenu, newValue);
  },
});

export const recentMenuDeleteSelector = selector({
  key: 'recent-view-menu-delete-selector',
  get: ({ get }) => {
    return get(recentMenu);
  },
  set: ({ set, get }, value) => {
    const newValue = [...get(recentMenu)];
    const index = newValue.findIndex(({ currentInfo }) => currentInfo.path === value);
    if (index !== -1) {
      newValue.splice(index, 1);
    }
    set(recentMenu, newValue);
  },
});
