import TelegramIcon from '@mui/icons-material/Telegram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import XIcon from '@mui/icons-material/X';

// export const BOT_URL = 'https://t.me/Clicker_Game_Blockchain_Bot/game';
// export const BACK_URL = 'https://e2c0-176-109-111-182.ngrok-free.app';
// export const BOT_URL = 'https://t.me/byUlbiTVtestbot/something';
// export const BACK_URL = 'http://localhost:5000';

const BOT_URL = process.env.NODE_ENV !== 'production'? 'https://t.me/byUlbiTVtestbot/something' : 'https://t.me/Clicker_Game_Blockchain_Bot/game';
const BACK_URL = process.env.NODE_ENV !== 'production'? 'http://localhost:5000' : 'https://e2c0-176-109-111-182.ngrok-free.app';

// Export the constants
export { BOT_URL, BACK_URL };


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

export const JETTON_MASTER_ADDRESS = "<JETTON_MASTER_ADDRESS>"
