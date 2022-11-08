const { ethers } = require("hardhat")

const networkConfig ={
    "5":{
        name:"gorl",
        ethUsdPriceFeed:"0xD4a33860578De61DBAbDc8BFdb98FD742fA7028e",
        vrfCoordinatorV2:"0x2Ca8E0C643bDe4C2E08ab1fA0da3401AdAD7734D",
        enntranceFee:ethers.utils.parseEther("0.01"),
        gasLane:"0x79d3d8832d904592c0bf9818b621522c988bb8b0c05cdc3b15aea1b6e8db0c15",
        subscriptionId:"5851",
        callbackGasLimit:"500000",
        interval:"60"

    },

    "31337":{
        name:"hardhat",
        enntranceFee:ethers.utils.parseEther("0.01"),
        gasLane:"0x79d3d8832d904592c0bf9818b621522c988bb8b0c05cdc3b15aea1b6e8db0c15",
        callbackGasLimit:"500000",
        interval:"30"

    }

}

const developmentChains =["hardhat","localhost"]
const frontEndContractsFile = "../lodapp_front/constants/contractAddresses.json"
const frontEndAbiFile = "../lodapp_front/constants/abi.json"

module.exports={
    networkConfig,
    developmentChains,

}

