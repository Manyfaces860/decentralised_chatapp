# Decentralized Chat App

### Overview
This is a decentralized chat application where users can interact securely and privately by logging in with their cryptocurrency wallets (like MetaMask). The app allows users to create chat rooms with other registered users, and all chat data is stored on the IPFS (InterPlanetary File System) network, ensuring privacy, data security, and censorship resistance.

### Features
- **Wallet-based Sign-In**: Users can securely sign in using cryptocurrency wallets such as MetaMask.
- **Decentralized Storage**: Chat messages are stored on the IPFS network, ensuring privacy and availability across a decentralized network.
- **Chat Rooms**: Users can create and join chat rooms with other registered users, enabling private and group conversations.

### How It Works
1. **Sign In**: Users sign in to the application using their cryptocurrency wallets (MetaMask). This creates a unique and secure identity without the need for traditional username/password combinations.
2. **Create Chat Rooms**: After signing in, users can create chat rooms with other registered users by inviting them via their wallet addresses.
3. **Chat Storage on IPFS**: All messages within a chat room are stored on the IPFS network. Each message is encrypted and uploaded to IPFS, providing a decentralized way to store and access the chat history.

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.js
```
