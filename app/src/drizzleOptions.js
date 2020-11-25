import Web3 from "web3";
import Notary from "./contracts/Notary.json";

const options = {
  web3: {
    block: false,
    customProvider: new Web3("ws://localhost:7545"),
  },
  contracts: [Notary],
};

export default options;
