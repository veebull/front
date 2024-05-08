import { SvgIconTypeMap } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';

export interface IUserData {
  dataGame: IDataGame;
  _id: string;
  tgUserId: number | null;
  firstName: string;
  isSubscribed: boolean | null;
  is_bot: null | boolean;
  username: string;
  languageCode: string;
}

export interface IDataGame {
  name: string;
  totalTaps: number;
  achievements: IAchievement[];
  tasks: ITask[];
  referalLink: string;
  byReferral: null | string;
  annexedByRef: string[];
}

export interface IAchievement {
  id: number;
  title: string;
  completed: boolean;
  reward: number;
  icon: OverridableComponent<SvgIconTypeMap<object, 'svg'>> & {
    muiName: string;
  };
  isGet: boolean;
  target: number;
}

export interface ITask {
  id: number;
  title: string;
  completed: boolean;
  reward: number;
  link: string;
  icon: OverridableComponent<SvgIconTypeMap<object, 'svg'>> & {
    muiName: string;
  };
}
