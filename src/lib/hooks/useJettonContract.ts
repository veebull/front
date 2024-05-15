import { Address, OpenedContract, toNano } from "@ton/core";
// import {Mint, SampleJetton} from "../build/tact_JettonMaster";
// import {JettonDefaultWallet} from "../build/tact_JettonWallet";
import { SampleJetton, Mint } from "../contracts/tact_SampleJetton";

import { useAsyncInitialize } from "./useAsyncInitialize";
import { useTonClient } from "./useTonClient";
import { useTonConnect } from "./useTonConnect";

import {JETTON_MASTER_ADDRESS} from "~/lib/constants"

const sleep = (time: number) => new Promise((resolve) => setTimeout(resolve, time))

export function useJettonContract() {
    const client = useTonClient()
    const {wallet, sender} = useTonConnect()


    // Инициализация контракта из блокчейна
    const jettonContract = useAsyncInitialize(async()=>{
        if(!client || !wallet) return;
        const sampleMasterJettonAddress = SampleJetton.fromAddress(Address.parse(JETTON_MASTER_ADDRESS)) //jetton master address in string


        return client.open(sampleMasterJettonAddress) as OpenedContract<SampleJetton> // @ton/core и ton-core types incompatible
    }, [client, wallet])
    return {
        jettonContractAddress: jettonContract?.address.toString(),
        mint: (amount: bigint, toAddress: string) => {
            const receiverAddress = Address.parse(toAddress)
            const message: Mint = {
                $$type: "Mint",
                amount: amount,
                receiver: receiverAddress
            }
            jettonContract?.send(sender, {
                value: toNano("0.05")
            }, message)
        },
        mint100: () => {
            const message = "Mint: 100"
            jettonContract?.send(sender, {
                value: toNano("0.05")
            }, message)
        },
    }
}