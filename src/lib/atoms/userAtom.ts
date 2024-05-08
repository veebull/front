import { atom } from 'jotai';
import { IUserData } from '../interfaces';

export const userAtom = atom({
  dataGame: {
    name: '',
    totalTaps: 0,
    achievements: [],
    tasks: [],
    referalLink: '',
    byReferral: null,
    annexedByRef: [],
  },
  _id: '',
  tgUserId: null,
  firstName: 'Frich22(Артем - front-end)',
  isSubscribed: null,
  is_bot: null,
  username: '',
  languageCode: '',
} as IUserData);
