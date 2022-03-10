
const HDWalletProvider = require('@truffle/hdwallet-provider');
//
const fs = require('fs');
const mnemonic = fs.readFileSync(".secret").toString().trim();
const secrets = JSON.parse(
  fs.readFileSync('.secrets.json').toString().trim()
);

module.exports = {
  networks: {

    development: {
      host: "127.0.0.1", // Localhost (default: none)
      port: 7545, // Standard Ethereum port (default: none)
      network_id: "*", // Any network (default: none)
    },

    mainnet: {
      provider: () =>
        new HDWalletProvider(mnemonic,
          `https://mainnet.infura.io/v3/b156a26d8a394cc882d5f3cf5ee4ff05`),
      network_id: 3,
      gas: 5500000,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true
    },
    ropsten: {
      provider: () =>
        new HDWalletProvider(mnemonic,
          `https://ropsten.infura.io/v3/81bcc9f320fd4e5e8cd25af3293b5c15`),
      network_id: 3,
      gas: 5500000,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true
    },
    kovan: {
      networkCheckTimeout: 10000,
      provider: () => {
        return new HDWalletProvider(
          mnemonic,
          `https://kovan.infura.io/v3/81bcc9f320fd4e5e8cd25af3293b5c15`,
          0,
          20
        );
      },
      network_id: "42",
    },
  },

  mocha: {
  },

  compilers: {
    solc: {
      version: "0.8.10", 
      docker: false, 
      settings: {
        optimizer: {
          enabled: false,
          runs: 200
        },
        evmVersion: "byzantium"
      }
    }
  },

};