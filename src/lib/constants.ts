import TelegramIcon from '@mui/icons-material/Telegram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import XIcon from '@mui/icons-material/X';

export const BOT_URL = 'https://t.me/Clicker_Game_Blockchain_Bot/game';
export const BACK_URL = 'http://176.109.111.182:5000';
// export const BOT_URL = 'https://t.me/byUlbiTVtestbot/something';
// export const BACK_URL = 'http://localhost:5000';

export const defaultTasks = [
  {
    id: 1,
    title: 'Подпишись на канал',
    completed: false,
    reward: 1,
    link: 'https://youtube.com',
    icon: YouTubeIcon,
  },
  {
    id: 2,
    title: 'Подпишись на бота',
    completed: false,
    reward: 1,
    link: 'https://t.me/BotFather',
    icon: TelegramIcon,
  },
  {
    id: 3,
    title: 'Подпишись на наш твиттер',
    completed: false,
    reward: 1,
    link: 'https://twitter.com/home',
    icon: XIcon,
  },
];
