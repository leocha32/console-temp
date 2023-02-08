import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export interface IUser {
  email: string;
  name?: string;
  teamName?: string;
  employeeId?: string;
  accessibleUri?: string;
}
const user = atom<IUser>({
  key: 'user',
  default: {
    email: '',
  },
  effects: [persistAtom],
});

export default user;
