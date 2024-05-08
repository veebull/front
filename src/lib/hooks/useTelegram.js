export default function useTelegram() {
  const tg = window?.Telegram?.WebApp;
  let avatar, userId, nickName, startParam, initData;

  if (tg) {
    avatar = tg.initDataUnsafe.user?.photo_url;
    userId = tg.initDataUnsafe.user?.id;
    nickName = tg.initDataUnsafe.user?.username;
    startParam = tg.initDataUnsafe?.start_param;
    initData = tg.initData;
  }

  return { tg, avatar, userId, nickName, startParam, initData };
}
