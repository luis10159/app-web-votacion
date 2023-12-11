// services/ethereum.js
import { web3 } from '@/store/web3';

let contractAddress = '0x567D4753AB661405C2abc75393C52644ea5F5Cc9';
let contractABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"uint32","name":"index","type":"uint32"}],"name":"Votante","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"name","type":"string"}],"name":"addCandidate","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"name","type":"string"},{"internalType":"uint256","name":"year","type":"uint256"}],"name":"addElection","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"name","type":"string"}],"name":"addFaculty","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"name","type":"string"}],"name":"addParty","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getCandidates","outputs":[{"components":[{"internalType":"uint256","name":"idCandidate","type":"uint256"},{"internalType":"string","name":"name","type":"string"},{"internalType":"uint256","name":"votesCount","type":"uint256"},{"internalType":"uint256","name":"idParty","type":"uint256"},{"internalType":"uint256","name":"idFaculty","type":"uint256"}],"internalType":"struct Vote.Candidate[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getElections","outputs":[{"components":[{"internalType":"uint256","name":"idElection","type":"uint256"},{"internalType":"string","name":"name","type":"string"},{"internalType":"uint256","name":"year","type":"uint256"}],"internalType":"struct Vote.Election[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getFaculties","outputs":[{"components":[{"internalType":"uint256","name":"idFaculty","type":"uint256"},{"internalType":"string","name":"name","type":"string"}],"internalType":"struct Vote.Faculty[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getNumberCandidates","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getNumberElections","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getNumberFaculties","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getNumberParties","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getOwner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getParties","outputs":[{"components":[{"internalType":"uint256","name":"idParty","type":"uint256"},{"internalType":"string","name":"name","type":"string"}],"internalType":"struct Vote.Party[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"}]
let contract = new web3.eth.Contract(contractABI, contractAddress);
//const contract = new web3.eth.Contract(contractABI, contractAddress);

export default {
  getFaculties: () => {
    return contract.methods.getFaculties().call();
  },

  addFaculty: async (facultyName) => {
    try {
      // Solicitar al usuario que autorice la conexión a Metamask
      await window.ethereum.request({ method: 'eth_requestAccounts' });
  
      // Obtener la dirección del usuario conectado para poder hacer el envío
      
      let accounts = await window.ethereum.request({ method: 'eth_accounts' });
      console.log(accounts)
      let sender = accounts[0];
  
      // Enviar la transacción desde la cuenta del usuario conectado
      let result = await contract.methods.addFaculty(facultyName).send({ from: sender });
  
      // Puedes manejar el resultado de la transacción aquí, si es necesario
      console.log('Transacción exitosa:', result);
  
      return result;
    } catch (error) {
      console.error('Error al agregar facultad:', error);
      throw error; // Puedes manejar el error de acuerdo a tus necesidades
    }
  },
  // Puedes agregar más funciones según tus necesidades
};