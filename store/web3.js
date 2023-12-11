import Web3 from 'web3';

    let web3;

    if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
    // Use MetaMask provider
    web3 = new Web3(window.ethereum);
    window.ethereum.enable(); // Request account access
    } else {
    // Fallback to a local Ethereum provider
    const provider = new Web3.providers.HttpProvider('https://sepolia.etherscan.io/tx/0x567D4753AB661405C2abc75393C52644ea5F5Cc9');
    web3 = new Web3(provider);
    }

    export { web3 };