export default function useTelegram() {
  const tg = window?.Telegram?.WebApp;
  let avatar, userId, nickName;
  if (tg) {
    avatar = tg.initDataUnsafe.user?.photo_url;
    userId = tg.initDataUnsafe.user?.id;
    nickName = tg.initDataUnsafe.user?.first_name;
  }

  return { tg, avatar, userId, nickName };
}
