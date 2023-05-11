import solc from "solc";
import fs from "fs";
import * as ethers from "ethers";

const input = {
  language: "Solidity",
  sources: {
    "Counter.sol": {
      content: fs.readFileSync("./contracts/Counter.sol", "utf8"),
    },
  },
  settings: {
    outputSelection: {
      "*": {
        "*": ["*"],
      },
    },
  },
};

const output = JSON.parse(solc.compile(JSON.stringify(input)));
const contractByteCode = output.contracts["Counter.sol"]["Counter"]["evm"].bytecode.object;
const contractABI = output.contracts["Counter.sol"]["Counter"].abi;

// Create private key
const privateKey = ethers.randomBytes(32);
console.log({ privateKey });
const privateToHex = ethers.hexlify(privateKey);
console.log({ privateToHex });

// Create wallet instance
const wallet = new ethers.Wallet(privateToHex);

// Create contract factory
const contractFactory = new ethers.ContractFactory(contractABI, contractByteCode, wallet);
const contract = await contractFactory.deploy();
await contract.deployed();
