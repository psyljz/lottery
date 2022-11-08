// import
// main function
// calling of main function

const { verify } = require("../utils/verfy")
const { network, ethers } = require("hardhat")
const { networkConfig, developmentChains } = require("../helper-hardhat-config")

// log(networkConfig)
const chainId = network.config.chainId
require("dotenv").config()

const FUND_AMOUNT = ethers.utils.parseEther("30")

// const ethUsdPriceFeedAddress =networkConfig[chainId]['ethUsdPriceFeed']

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()

    let vrfCoordinatorV2Address, subscriptionId

    

    if (developmentChains.includes(network.name)) {

        log("----进入本地链------")
        const vrfCoordinatorV2Mock = await ethers.getContract("VRFCoordinatorV2Mock")
        vrfCoordinatorV2Address = vrfCoordinatorV2Mock.address
        const transactionResponse = await vrfCoordinatorV2Mock.createSubscription()
        const transactionReceipt = await transactionResponse.wait(1)

        
        subscriptionId = transactionReceipt.events[0].args.subId

        //
        await vrfCoordinatorV2Mock.fundSubscription(subscriptionId, FUND_AMOUNT)
    } else {
        vrfCoordinatorV2Address = networkConfig[chainId]["vrfCoordinatorV2"]
        subscriptionId = networkConfig[chainId]["subscriptionId"]
    }
    log(subscriptionId)

    const enntranceFee = networkConfig[chainId]["enntranceFee"]
    const gasLane = networkConfig[chainId]["gasLane"]
    const callbackGasLimit = networkConfig[chainId]["callbackGasLimit"]
    const interval = networkConfig[chainId]["interval"]
    const args = [
        vrfCoordinatorV2Address,
        enntranceFee,
        gasLane,
        subscriptionId,
        callbackGasLimit,
        interval,
    ]

    const raffle = await deploy("Raffle", {
        from: deployer,
        args: args,
        log: true,
        waitConfirmations: network.config.blockConfirmations,
    })
    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API) {
        // verifya

        await verify(raffle.address, args)
    }

    // log("-----------========------")
}


module.exports.tags=["all","raffle"]