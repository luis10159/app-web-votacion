import Web3 from 'web3';

    let web3;

    if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
    // Use MetaMask provider
    web3 = new Web3(window.ethereum);
    window.ethereum.enable(); // Request account access
    } else {
    // Fallback to a local Ethereum provider
    const provider = new Web3.providers.HttpProvider('https://sepolia.etherscan.io/address/0xD3D80F30E0007D9359Bc5349f73B1F4e5D90F013');
    web3 = new Web3(provider);
    }

    export { web3 };