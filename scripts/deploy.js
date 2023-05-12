import { Wallet, ContractFactory, JsonRpcProvider } from "ethers";
import compileContract from "../utils/compileContract.js";

const HARDHAT_NETWORK = "http://localhost:8545";

// Connect local network
const provider = new JsonRpcProvider(HARDHAT_NETWORK);

// Compile contract
const { abi, bytecode } = compileContract("Counter");

// Create wallet instance
// This key is from hardhat test node - Different from local network
const wallet = new Wallet("0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80", provider);

// Create contract factory
const contractFactory = new ContractFactory(abi, bytecode, wallet);

// Deploy contract
const contract = await contractFactory.deploy();

console.log(contract);
