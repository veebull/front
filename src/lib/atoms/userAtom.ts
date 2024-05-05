import { atom } from 'jotai';

export const userAtom = atom({
  id: '',
  name: '',
  avatar: '',
  referalLink: '',
  byReferer: 'none',
  totalTaps: 0,
  totalTON: 0,
});
