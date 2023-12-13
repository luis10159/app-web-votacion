import Web3 from "web3";

let web3;

if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
  // Use MetaMask provider
  web3 = new Web3(window.ethereum);
  window.ethereum.enable(); // Request account access
} else {
  // Fallback to a local Ethereum provider
  const provider = new Web3.providers.HttpProvider(
    "https://sepolia.etherscan.io/address/0x27ECf36dfc07b4308243B553A2F26bDa45F1422B"
  );
  web3 = new Web3(provider);
}

export { web3 };
