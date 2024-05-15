import { useState, useEffect } from "react"
import { useTonAddress } from "@tonconnect/ui-react"
import { useJettonContract } from "~/lib/hooks/useJettonContract"
import { useTonConnect } from "~/lib/hooks/useTonConnect"
import { getUserData, mintTokensOnServer, transferTokensOnServer } from "~/lib/botApi"
import useTelegram from '~/lib/hooks/useTelegram';

const { tg, startParam, initData } = useTelegram();


import { Address, toNano } from "@ton/ton";

export default function TonGetCoinsButton() {
    const [userAddress, setUserAddress] = useState<Address | undefined>()
    const {mint, mint100} = useJettonContract()
    const {connected, wallet} = useTonConnect()
    let rawAddress = useTonAddress(false);
    let userResponse, points
    let minted = false

    useEffect(() => {
        if (wallet && connected) {
            // wallet is connected
            // TODO.1 Check if there is points
            // if(!initData) return;
            async function fetchData (){
                userResponse = await getUserData(initData) 
                points = userResponse.user?.dataGame?.totalTaps || 0
                // console.log(rawAddress)

                // console.log("gamePoints",points)
                if (points > 0) {
                    // TODO.2 mint or transfer tokens eq points on SERVER
                    if(!minted){
                        minted = true
                        console.log("minted")
                        console.log("rawAddress",rawAddress)
                        await mintTokensOnServer(points, rawAddress, false)
                        // add points to balance through state
                    }
                }
            }
            fetchData()

            setUserAddress(Address.parse(rawAddress))
        }
    }, [wallet,connected]);

    const [message, setMessage] = useState("")
    const tokenSymbol = "HLDTST"
    const tokens = "1,000,000"

    const claimCoins = (address: string ) => {
        if(!address) return // address not exist
        mint(toNano("1000000"), address)
        setMessage(`${tokens} ${tokenSymbol}`)
        setTimeout(()=>{setMessage("")},2000)
    }

    return ( (wallet && connected) &&
        <div style={{float: "right", zIndex:1000, display:"flex", position: "relative", marginTop: "80px"}}>

            <button 
                type="button"
                style={{ float: "right", width: "100px", height: "100px",backgroundColor:"white", color: "black", padding: "5", borderRadius: "10%", borderColor: "black", borderWidth: "4px"}}
                onClick={()=>claimCoins(rawAddress)}
            >Owner Claim {tokens} {tokenSymbol}
            </button>
            <button
                type="button"
                style={{float: "right", width: "100px", height: "100px", backgroundColor:"white", color: "black", padding: "5", borderRadius: "10%", borderColor: "black", borderWidth: "4px"}}
                onClick={()=>mint100()}
                >Every Can Claim 100 {tokenSymbol}
            </button>

            <button
                type="button"
                style={{float: "right", width: "100px", height: "100px", backgroundColor:"white", color: "black", padding: "5", borderRadius: "10%", borderColor: "black", borderWidth: "4px"}}
                onClick={()=>mintTokensOnServer( 1000000, rawAddress, false )}
                >Server Test Mint 1M Tokens {tokenSymbol}
            </button>
            <button
                type="button"
                style={{float: "right", width: "100px", height: "100px", backgroundColor:"white", color: "black", padding: "5", borderRadius: "10%", borderColor: "black", borderWidth: "4px"}}
                onClick={()=>transferTokensOnServer( 1000000, rawAddress )}
                >Server Test Transfer 1M Tokens {tokenSymbol}
            </button>

            <p className={`mt-10 text-green-500`}>
                {message}
            </p>
        </div>
    )
}