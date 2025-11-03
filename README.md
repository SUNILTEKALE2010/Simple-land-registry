# Simple-land-registry
🌍 A fully functional Ethereum-based Land Registry DApp built using Solidity, React, and Ethers.js v6 — enabling secure land registration, verification, and ownership transfer via MetaMask.

# 🌍 Simple Land Registry DApp

![Solidity](https://img.shields.io/badge/Solidity-%5E0.8.20-blue?logo=solidity)
![React](https://img.shields.io/badge/React-18.0+-61DAFB?logo=react)
![Ethers.js](https://img.shields.io/badge/Ethers.js-v6.14.0-8B0000?logo=ethereum)
![MetaMask](https://img.shields.io/badge/MetaMask-Integration-orange?logo=metamask)
![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)

A decentralized application (DApp) that enables **secure land registration**, **verification**, and **ownership transfer** on the **Ethereum blockchain**.  
Built with **React**, **Solidity**, and **Ethers.js v6**, and integrated seamlessly with **MetaMask**.

---

## 🚀 Features

- 🏡 **Register Land** — Add a new land record to the blockchain  
- 🔍 **Check Details** — Verify any registered land’s details by ID  
- 🔄 **Transfer Ownership** — Safely transfer land ownership between Ethereum accounts  
- 💳 **MetaMask Integration** — Interact directly with your blockchain wallet  
- 🎨 **Modern UI** — Beautiful glassmorphism-based layout (no Tailwind required)  
- ⚡ **Ethers v6** support with dynamic MetaMask account switching  

---

## 🧠 Tech Stack

| Layer | Technology |
|-------|-------------|
| Smart Contract | Solidity `^0.8.20` |
| Blockchain | Hardhat / Local Ethereum Network |
| Frontend | React.js |
| Wallet | MetaMask |
| Interaction | Ethers.js v6 |
| Notifications | React Toastify |
| Styling | Custom CSS (glassmorphism design) |

---

## 🧾 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Setup](#-project-setup)
- [Smart Contract Setup](#-smart-contract-setup)
- [Frontend Setup](#-frontend-setup)
- [MetaMask Setup](#-metamask-setup)
- [How It Works](#-how-it-works)
- [Screenshots](#-screenshots)
- [License](#-license)

---

## ⚙️ Project Setup

Make sure you have the following installed:

- **Node.js** ≥ 18  
- **npm** ≥ 9  
- **MetaMask** browser extension  
- **Hardhat** globally (`npm install -g hardhat`)

---

## 🪄 Smart Contract Setup

1. Initialize Hardhat inside your project:
   ```bash
   npx hardhat init
   
2. Install required dependencies:
   npm install --save-dev hardhat @nomicfoundation/hardhat-toolbox

3. Compile your Solidity contract:
   npx hardhat compile

4. Deploy your contract:
   npx hardhat run scripts/deploy.js --network localhost

5. Copy the deployed contract address and paste it in:
   // inside client/src/App.js
   const CONTRACT_ADDRESS = "YOUR_DEPLOYED_CONTRACT_ADDRESS";


💻 Frontend Setup

1. Move into the React client folder:
   cd client

2. Clean and reinstall dependencies:
   rm -rf node_modules package-lock.json
   npm install react react-dom ethers@^6 react-toastify

3. Run the app:
   npm start

4. Open http://localhost:3000


🔐 MetaMask Setup

1. Open MetaMask → Add a new local network (if using Hardhat)
   Network Name: Localhost 8545
   RPC URL: http://127.0.0.1:8545
   Chain ID: 31337

2. Import any account using a private key from Hardhat’s terminal.

3. Refresh the page and click Connect Wallet.


🧠 How It Works

| Action                 | Description                                          |
| ---------------------- | ---------------------------------------------------- |
| **Register Land**      | Owner registers land on blockchain with their wallet |
| **Check Details**      | Fetches land info by its unique ID                   |
| **Transfer Ownership** | Current owner transfers the land to another wallet   |


🧩 Project Structure

simple-land-registry/
├── contracts/
│   └── SimpleLandRegistry.sol          # Smart contract
├── scripts/
│   └── deploy.js                       # Hardhat deployment script
├── client/
│   ├── src/
│   │   ├── App.js                      # Main DApp logic
│   │   ├── App.css                     # Custom styling
│   │   ├── components/
│   │   │   ├── Header.js
│   │   │   ├── LandCard.js
│   │   │   └── TransferModal.js
│   │   └── LandRegistryABI.json        # ABI from compilation
│   └── package.json
└── README.md


📄 License

This project is licensed under the MIT License — free to use, modify, and distribute.
