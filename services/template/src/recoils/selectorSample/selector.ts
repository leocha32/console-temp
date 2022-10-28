import { selector } from 'recoil';
import minute from './atom';

const hourSelector = selector({
  key: 'hours',
  get: ({ get }) => {
    const minutes = get(minute);
    return minutes / 60;
  },
  set: ({ set }, value) => {
    const minutes = Number(value) * 60;
    set(minute, minutes);
  },
});
export default hourSelector;
