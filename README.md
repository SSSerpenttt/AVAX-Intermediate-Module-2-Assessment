# AVAX-Intermediate-Module-2-Assessment

# Metacrafters ATM

Welcome to the Metacrafters ATM! This decentralized application allows users to interact with a blockchain-based ATM for depositing and withdrawing Ether (ETH). Users can connect their MetaMask wallet to manage their balance and perform transactions.

## Features

- **Connect MetaMask Wallet:** Connects to MetaMask to manage Ethereum accounts.
- **View Balance:** Displays the current balance in Ether.
- **Deposit ETH:** Allows users to deposit ETH into the ATM.
- **Withdraw ETH:** Allows users to withdraw ETH from the ATM.
- **Auto Deposit:** Option to automatically deposit ETH at regular intervals.
- **Logout:** Logs out the user and refreshes the page.

## Prerequisites

- MetaMask browser extension installed.
- Node.js and npm installed.
- Basic knowledge of Ethereum and smart contracts.

## Getting Started

1. **Clone the Repository**
2. **Run follow the steps for setting up the project [here](https://github.com/MetacrafterChris/SCM-Starter/blob/main/README.md).**
3. **In you metamask wallet, add a new network manually.**
  - Name it anything you like
  - RPC server is ``https://127.0.0.1:8545``
  - Chain ID is ``31337``
  - Currency is ``ETH``
  - Click Save.
  - Switch to the newly added Network
4. **In the terminal where you executed ``npx hardhat node``...**
  - Locate the very first account instance. Copy the private key. Open your Metamask wallet. Add an account. Select Import. Paste the Private key and insure that the input is correct. Add the account. After switching to the account, you should be able to see that the account has an initial balance of 1000 ETH.
5. **In your browser running the ``http://localhost:3000/`` URL...**
  - Use the newly added account to be able to use the application.

### Author
Franz Gabriel Eleccion

## License

This project is licensed under the <b>MIT License</b> - see the [LICENSE.md]([https://github.com/SSSerpenttt/ETH-AVAX-Intermediate---Module-1-Project/blob/main/LICENSE](https://github.com/SSSerpenttt/AVAX-Intermediate-Module-2-Assessment/blob/main/LICENSE)) file for details
