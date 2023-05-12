import fs from "fs";
import solc from "solc";

export default function compileContract(contract) {
  const contractWithExt = `${contract}.sol`;
  const input = {
    language: "Solidity",
    sources: {
      [contractWithExt]: {
        content: fs.readFileSync(`./contracts/${contractWithExt}`, "utf8"),
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
  const contractByteCode = output.contracts[contractWithExt][contract]["evm"].bytecode.object;
  const contractABI = output.contracts[contractWithExt][contract].abi;

  return {
    bytecode: contractByteCode,
    abi: contractABI,
  };
}
