const { MerkleTree } = require("merkletreejs");
const keccak256 = require("keccak256");
const { ethers } = require("ethers");

// hash account + amount via Soliditys keccak256 function
// see https://docs.ethers.io/v5/api/utils/hashing/#utils--solidity-hashing
function hashLeaf(account, amount) {
  return Buffer.from(
    ethers.utils
      .solidityKeccak256(["address", "uint256"], [account, amount])
      .slice(2),
    "hex"
  );
}

// map over entries in object to generate leaf and merkletree
function generateMerkleTree(holders) {
  const merkleTree = new MerkleTree(
    Object.entries(holders).map((entry) => hashLeaf(...entry)),
    keccak256,
    { sortPairs: true }
  );
  console.log(`Merkle tree root: ${merkleTree.getHexRoot()}`);
  return merkleTree;
}

function generateProofs(merkleTree, holders) {
  let proofs = {};

  Object.entries(holders).forEach(([account, amount]) => {
    let leaf = hashLeaf(account, amount);
    proofs[account] = merkleTree.getHexProof(leaf);
  });

  return proofs;
}

module.exports = { generateMerkleTree, generateProofs };
