import { frontEndContractsFile, frontEndAbiFile } from "../helper-hardhat-config"
import { writeFileSync, readFileSync } from "fs"
import { network } from "hardhat"


console.log(frontEndAbiFile)
export default async () => {
    if (process.env.UPDATE_FRONT_END) {
        console.log("Writing to front end...")
        await updateContractAddresses()
        await updateAbi()
        console.log("Front end written!")
    }
}

async function updateAbi() {
    const raffle = await ethers.getContract("Raffle")
    writeFileSync(frontEndAbiFile, raffle.interface.format(ethers.utils.FormatTypes.json))
}

async function updateContractAddresses() {
    const raffle = await ethers.getContract("Raffle")
    console.log("-----------")
    console.log(frontEndAbiFile)
    
    const contractAddresses = JSON.parse(readFileSync(frontEndContractsFile, "utf8"))
    if (network.config.chainId.toString() in contractAddresses) {
        if (!contractAddresses[network.config.chainId.toString()].includes(raffle.address)) {
            contractAddresses[network.config.chainId.toString()].push(raffle.address)
        }
    } else {
        contractAddresses[network.config.chainId.toString()] = [raffle.address]
    }
    writeFileSync(frontEndContractsFile, JSON.stringify(contractAddresses))
}
export const tags = ["all", "frontend"]