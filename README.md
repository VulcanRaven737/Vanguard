# About
This project is a decentralized application (DApp) designed for secure and anonymous peer-to-peer (P2P) text-based communication. It runs on the Ganache blockchain testnet and leverages the Remix IDE to generate the contract ABI and Address.

# Features
* End-to-End Security: Messages are transmitted over a decentralized network, ensuring privacy and resistance to censorship.
* Anonymity: Users communicate without revealing identities, as data is stored on-chain.
* Blockchain-based Communication: Utilizes the Ganache testnet, allowing for secure message storage and retrieval without a central server.

# Prerequisites
Before running the project, ensure you have the following installed:

* **Ganache** - for a local Ethereum test blockchain
* **Node.js** and npm - for dependencies
* **Remix IDE** - to compile the contract and generate the ABI

# Setup
* **Clone the Repository**
```bash
git clone https://github.com/VulcanRaven737/Vanguard.git
cd Vanguard
Start Ganache
```

* Run Ganache to simulate a blockchain locally and copy the RPC server address (e.g., http://127.0.0.1:7545).

* Deploy Smart Contract

    * Open Remix IDE.
    * Compile and deploy the smart contract to Ganache.
    * Copy the generated ABI and contract address for use in your application.

* Configure Contract ABI and Address
    * Update the ABI and contract address in ```lib/contractABI.js``` and  ```lib/contractAddr.js``` respectively:
    ```javascript
    export const contractABI = [ /* Paste ABI here */ ];
    export const contractAddress = "0xYourContractAddress";
    ```
* Configure RPC Server 
    * Update the RPC Server Address in ```lib/rpcAddr.js```
    ```javascript
    export const rcpAddr = 'http://127.0.0.1:7545'
    ```
* Install Dependencies
    ```bash
    npm install
    ```
* Run the Application
    ```bash
    npm run dev
    ```
# Usage
* Send Messages: Enter a message, which will be encrypted and sent over the blockchain.
* Receive Messages: All incoming messages will be displayed once confirmed on the blockchain.

# Troubleshooting
* Contract Not Found: Verify the contract address in contractABI.js matches the address shown in Remix.

# License

#### This project is licensed under the MIT License.

#### This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

