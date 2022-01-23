const { ethers } = require("ethers");

require("dotenv").config();
const { ALCHEMY_KEY, CONTRACT_ADDRESS, SUPPLY } = process.env;

// contract abi, only function that is needed is ownerOf
const ABI = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "ownerOf",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

// initialize ethers provider and contract
const provider = new ethers.providers.JsonRpcProvider(ALCHEMY_KEY);
const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider);

// iterate over all token Ids and store owner. If owner already exists, increase counter
async function getSnapshot() {
  let holders = {};
  for (let i = 0; i < 10; i++) {
    let tmp = await contract.ownerOf(i);
    if (holders[tmp]) {
      holders[tmp] += 1;
    } else {
      holders[tmp] = 1;
    }
  }
  return holders;
}

module.exports = { getSnapshot };
