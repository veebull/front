import { atom } from 'jotai';
import TouchAppIcon from '@mui/icons-material/TouchApp';

export const achievmentsAtom = atom([
  {
    id: 1,
    title: 'Тапни 10 раз',
    completed: false,
    reward: 0.01,
    icon: TouchAppIcon,
    isGet: false,
    target: 10,
  },
  {
    id: 2,
    title: 'Тапни 100 раз',
    completed: false,
    reward: 0.1,
    icon: TouchAppIcon,
    isGet: false,
    target: 100,
  },
  {
    id: 3,
    title: 'Тапни 300 раз',
    completed: false,
    reward: 0.3,
    icon: TouchAppIcon,
    isGet: false,
    target: 300,
  },
  {
    id: 4,
    title: 'Тапни 500 раз',
    completed: false,
    reward: 0.5,
    icon: TouchAppIcon,
    isGet: false,
    target: 500,
  },
  {
    id: 5,
    title: 'Тапни 1000 раз',
    completed: false,
    reward: 1,
    icon: TouchAppIcon,
    isGet: false,
    target: 1000,
  },
]);
