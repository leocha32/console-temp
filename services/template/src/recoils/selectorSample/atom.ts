import { atom } from 'recoil';

const minute = atom({
  key: 'selector-sample',
  default: 0,
});

export default minute;
