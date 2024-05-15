import { TonConnectButton, useTonAddress, useTonWallet } from '@tonconnect/ui-react';
import { useTonClient } from '~/lib/hooks/useTonClient';
import { useEffect, useState } from 'react';
import { retrieveJettonBalance, retrieveWalletBalance } from '~/lib/jetton';
import {JETTON_MASTER_ADDRESS} from "~/lib/constants"


export default function TonConnectWallet() {
    const wallet = useTonWallet();
    const userFriendlyAddress = useTonAddress();
    const rawAddress = useTonAddress(false);
    const client = useTonClient();
    // const [wallet, setWallet] = useState(null);
    const [balance, setBalance] = useState("...");
    const [jettonBalance, setJettonBalance] = useState("...")
    const jettonMasterAddress = JETTON_MASTER_ADDRESS

    useEffect(() => {
        let interval;
        const delay = 30*1e3 // 30 seconds
        const fetchData = () => {
            if (wallet && client) {
                // еще один способ получения баланса кошелька
                // client.getBalance(Address.parse(rawAddress))
                //     .then((newBalance) => {
                //         setBalance(fromNano(newBalance));
                //     });

                // парааллельный асинхронный запрос к апи
                // запросы отправляются параллельно и также приходят
                // и обновляют данные
                Promise.allSettled([
                    // получение баланса кошелька в тонах
                    retrieveWalletBalance(rawAddress).then((newBalance) => {
                        setBalance(newBalance);
                    }).catch((error) => {
                        console.error('Error:', error);
                        // Handle error if needed
                    }),

                    // получение баланса жеттонов
                    retrieveJettonBalance(jettonMasterAddress, rawAddress).then((newJettonsBalance) => {
                        setJettonBalance(newJettonsBalance);
                    }).catch((error) => {
                        setJettonBalance("0")
                    console.error('Error:', error);
                    // Handle error if needed
                    })
                ])
            }
        };

        fetchData(); // Call initially
    
        interval = setInterval(fetchData, delay); // Call every 10 seconds
    
        return () => clearInterval(interval); // Clean up the interval on unmount
    }, [wallet,client]);
    return (
        <header>
            <TonConnectButton className="my-button-class" style={{ float: "right" }} />
            {
                wallet  && (
                    <>
                    <div>
                        My Balance: <span>{(balance).slice(0,5)}</span> TON
                    </div>
                    <div>
                        My Jetton Balance: <span>{(jettonBalance)}</span> HLDST
                    </div>
                    </>
                )
            }
            <div >
                {
                    userFriendlyAddress && (
                        <div style={{textWrap: "nowrap"}}>
                            <div>User-friendly: {userFriendlyAddress}</div>
                            <div>Raw address: {rawAddress}</div>
                        </div>
                    )
                }
            </div>
        </header>
    );
};