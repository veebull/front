import TonWeb from "tonweb";
const TONWEB_KEY = '06ab89eca8b1bc195b41ffc18a48054f259ad0b1d8a786fe0f7f6b0a2f5b0331' // !TODO: replace and move to .env
// const TONWEB_KEY = '<TON_WEB_KEY>' // !TODO: replace and move to .env

const TONWEB = new TonWeb(new TonWeb.HttpProvider('https://toncenter.com/api/v2/jsonRPC', {apiKey: TONWEB_KEY}));

export async function retrieveJettonBalance(jettonMasterAddress: string, userWalletAddress: string):Promise<string> {

    const jettonMinter = new TonWeb.token.jetton.JettonMinter(TONWEB.provider, { address: jettonMasterAddress }); // don't know how to fix it
    const userWallet_Address = new TonWeb.utils.Address(userWalletAddress);
    const jettonWalletAddress = await jettonMinter.getJettonWalletAddress(userWallet_Address);
    
    const jettonWallet = new TonWeb.token.jetton.JettonWallet(TONWEB.provider, { address: jettonWalletAddress });
    
    const jettonWalletData = await jettonWallet.getData();
    const jettonBalance = jettonWalletData.balance;
    console.log(`Jetton balance: ${jettonBalance.toString()}`);
    return TonWeb.utils.fromNano(jettonBalance)
}

export async function retrieveWalletBalance(walletAddress:string) {
    const walletBalance = await TONWEB.getBalance(new TonWeb.utils.Address(walletAddress)) 

    console.log(`Wallet balance: ${TonWeb.utils.fromNano(walletBalance)} TON`);
    return TonWeb.utils.fromNano(walletBalance)

  }
  
// retrieveWalletBalance("UQAiw2GorCalD33k_uzGFV-ZlRn05zHwHGq2a0xznKmjN-fJ");
// retrieveJettonBalance("EQDHUC6tbn2IPkkrQ7JPPcJRTvufSuKOA9McMezih447j38g", "UQAiw2GorCalD33k_uzGFV-ZlRn05zHwHGq2a0xznKmjN-fJ")