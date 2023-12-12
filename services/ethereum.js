// services/ethereum.js
import { web3 } from '@/store/web3';

let contractAddress = '0xD3D80F30E0007D9359Bc5349f73B1F4e5D90F013';
let contractABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"uint32","name":"index","type":"uint32"}],"name":"Votante","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"name","type":"string"},{"internalType":"uint32","name":"indexParty","type":"uint32"},{"internalType":"uint32","name":"indexFaculty","type":"uint32"}],"name":"addCandidate","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"name","type":"string"},{"internalType":"uint256","name":"year","type":"uint256"}],"name":"addElection","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint32","name":"indexCandidate","type":"uint32"},{"internalType":"uint32","name":"indexElection","type":"uint32"}],"name":"addElectionPartyCandidate","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"name","type":"string"}],"name":"addFaculty","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"name","type":"string"}],"name":"addParty","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getCandidates","outputs":[{"components":[{"internalType":"string","name":"name","type":"string"},{"internalType":"uint256","name":"idCandidate","type":"uint256"},{"components":[{"internalType":"uint256","name":"idParty","type":"uint256"},{"internalType":"string","name":"name","type":"string"}],"internalType":"struct Vote.Party","name":"party","type":"tuple"},{"components":[{"internalType":"uint256","name":"idFaculty","type":"uint256"},{"internalType":"string","name":"name","type":"string"}],"internalType":"struct Vote.Faculty","name":"faculty","type":"tuple"},{"internalType":"uint256","name":"votesCount","type":"uint256"}],"internalType":"struct Vote.InfoCandidate[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getElections","outputs":[{"components":[{"internalType":"uint256","name":"idElection","type":"uint256"},{"internalType":"string","name":"name","type":"string"},{"internalType":"uint256","name":"year","type":"uint256"}],"internalType":"struct Vote.Election[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getFaculties","outputs":[{"components":[{"internalType":"uint256","name":"idFaculty","type":"uint256"},{"internalType":"string","name":"name","type":"string"}],"internalType":"struct Vote.Faculty[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getNumberCandidates","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getNumberElections","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getNumberFaculties","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getNumberParties","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getOwner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getParties","outputs":[{"components":[{"internalType":"uint256","name":"idParty","type":"uint256"},{"internalType":"string","name":"name","type":"string"}],"internalType":"struct Vote.Party[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getelectionsCandidates","outputs":[{"components":[{"internalType":"uint256","name":"idElectionPartyCandidate","type":"uint256"},{"components":[{"internalType":"uint256","name":"idElection","type":"uint256"},{"internalType":"string","name":"name","type":"string"},{"internalType":"uint256","name":"year","type":"uint256"}],"internalType":"struct Vote.Election","name":"election","type":"tuple"},{"components":[{"internalType":"string","name":"name","type":"string"},{"internalType":"uint256","name":"idCandidate","type":"uint256"},{"components":[{"internalType":"uint256","name":"idParty","type":"uint256"},{"internalType":"string","name":"name","type":"string"}],"internalType":"struct Vote.Party","name":"party","type":"tuple"},{"components":[{"internalType":"uint256","name":"idFaculty","type":"uint256"},{"internalType":"string","name":"name","type":"string"}],"internalType":"struct Vote.Faculty","name":"faculty","type":"tuple"},{"internalType":"uint256","name":"votesCount","type":"uint256"}],"internalType":"struct Vote.InfoCandidate","name":"candidate","type":"tuple"}],"internalType":"struct Vote.DetalleResultados[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"}]
let contract = new web3.eth.Contract(contractABI, contractAddress);
//const contract = new web3.eth.Contract(contractABI, contractAddress);

export default {
  getFaculties: () => {
    return contract.methods.getFaculties().call();
  },

  getCandidates: () => {
    return contract.methods.getCandidates().call();
  },
  getElections: () => {
    return contract.methods.getElections().call();
  },

  getNumberCandidates: () => {
    return contract.methods.getNumberCandidates().call();
  },

  getNumberElections: () => {
    return contract.methods.getNumberElections().call();
  },

  getNumberFaculties: () => {
    return contract.methods.getNumberFaculties().call();
  },

  getNumberParties: () => {
    return contract.methods.getNumberParties().call();
  },

  getOwner: () => {
    return contract.methods.getOwner().call();
  },

  getParties: () => {
    return contract.methods.getParties().call();
  },
  getelectionsCandidates:()=>{
    return contract.methods.getelectionsCandidates().call();
  },
  owner: () => {
    return contract.methods.owner().call();
  },


  addFaculty: async (facultyName,toast) => {
    try {
      // Solicitar al usuario que autorice la conexión a Metamask
      await window.ethereum.request({ method: 'eth_requestAccounts' });
  
      // Obtener la dirección del usuario conectado para poder hacer el envío
      
      let accounts = await window.ethereum.request({ method: 'eth_accounts' });
      console.log(accounts)
      let sender = accounts[0];
  
      // Enviar la transacción desde la cuenta del usuario conectado
      let result = await contract.methods.addFaculty(facultyName).send({ from: sender });
      toast.add({ severity: 'success', summary: 'Creación Exitosa', detail: "La facultad fue creada correctamente", life: 3000 });
      // Puedes manejar el resultado de la transacción aquí, si es necesario
      console.log('Transacción exitosa:', result);
  
      return result;
    } catch (error) {
      console.error('Error al agregar facultad:', error);
      toast.add({ severity: 'error', summary: 'Aviso de Usuario', detail: "No puedes crear facultades con el mismo nombre ", life: 3000 });
      throw error; // Puedes manejar el error de acuerdo a tus necesidades
      
    }
  },

  addCandidate: async (candidateName,indexpartido,indexfacultad,toast) => {
    try {
      // Solicitar al usuario que autorice la conexión a Metamask
      await window.ethereum.request({ method: 'eth_requestAccounts' });
  
      // Obtener la dirección del usuario conectado para poder hacer el envío
      
      let accounts = await window.ethereum.request({ method: 'eth_accounts' });
      console.log(accounts)
      let sender = accounts[0];
  
      // Enviar la transacción desde la cuenta del usuario conectado
      let result = await contract.methods.addCandidate(candidateName,indexpartido,indexfacultad).send({ from: sender });
  
      // Puedes manejar el resultado de la transacción aquí, si es necesario
      console.log('Transacción exitosa:', result);
      toast.add({ severity: 'error', summary: 'Creación Exitosa', detail: "El candidato fue asignado ", life: 3000 });
  
      return result;
    } catch (error) {
      console.error('Error al agregar candidato:', error);
      toast.add({ severity: 'error', summary: 'Aviso de Usuario', detail: "No existe Partrido o Facultad ", life: 3000 });
      throw error; // Puedes manejar el error de acuerdo a tus necesidades
    }
  },

  addElection: async (electionsName,yearElections,toast) => {
    try {
      // Solicitar al usuario que autorice la conexión a Metamask
      await window.ethereum.request({ method: 'eth_requestAccounts' });
  
      // Obtener la dirección del usuario conectado para poder hacer el envío
      
      let accounts = await window.ethereum.request({ method: 'eth_accounts' });
      console.log(accounts)
      let sender = accounts[0];
  
      // Enviar la transacción desde la cuenta del usuario conectado
      let result = await contract.methods.addElection(electionsName,yearElections).send({ from: sender });
  
      // Puedes manejar el resultado de la transacción aquí, si es necesario
      console.log('Transacción exitosa:', result);
      toast.add({ severity: 'error', summary: 'Creación exitosa', detail: "La elección fue creada correctamente", life: 3000 });
      return result;
    } catch (error) {
      console.error('Error al agregar Elección:', error);
      toast.add({ severity: 'error', summary: 'Aviso de Usuario', detail: "La elección ya existe", life: 3000 });
      throw error; // Puedes manejar el error de acuerdo a tus necesidades
    }
  },


 

  addParty: async (partiesName,toast) => {
    try {
      // Solicitar al usuario que autorice la conexión a Metamask
      await window.ethereum.request({ method: 'eth_requestAccounts' });
  
      // Obtener la dirección del usuario conectado para poder hacer el envío
      
      let accounts = await window.ethereum.request({ method: 'eth_accounts' });
      console.log(accounts)
      let sender = accounts[0];
  
      // Enviar la transacción desde la cuenta del usuario conectado
      let result = await contract.methods.addParty(partiesName).send({ from: sender });
      toast.add({ severity: 'success', summary: 'Creación exitosa', detail: "El partido se creó exitosamente", life: 3000 });
      // Puedes manejar el resultado de la transacción aquí, si es necesario
      console.log('Transacción exitosa:', result);
  
      return result;
    } catch (error) {
      console.error('Error al agregar Partido:', error);
      toast.add({ severity: 'error', summary: 'Aviso de Usuario', detail: "El partido ya existe", life: 3000 });
      throw error; // Puedes manejar el error de acuerdo a tus necesidades
    }
  },

  addElectionPartyCandidate: async (indexCandidato,indexEleccion,toast) => {
    try {
      // Solicitar al usuario que autorice la conexión a Metamask
      await window.ethereum.request({ method: 'eth_requestAccounts' });
  
      // Obtener la dirección del usuario conectado para poder hacer el envío
      
      let accounts = await window.ethereum.request({ method: 'eth_accounts' });
      console.log(accounts)
      let sender = accounts[0];
  
      // Enviar la transacción desde la cuenta del usuario conectado
      let result = await contract.methods.addElectionPartyCandidate(indexCandidato,indexEleccion).send({ from: sender });
      toast.add({ severity: 'success', summary: 'Creación exitosa', detail: "La asignación creó exitosamente", life: 3000 });
      // Puedes manejar el resultado de la transacción aquí, si es necesario
      console.log('Transacción exitosa:', result);
  
      return result;
    } catch (error) {
      console.error('Error al agregar Partido:', error);
      toast.add({ severity: 'error', summary: 'Aviso de Usuario', detail: "No existe el candidato o elección", life: 3000 });
      throw error; // Puedes manejar el error de acuerdo a tus necesidades
    }
  },

  Votar: async (indexCandidato,toast) => {
    try {
      // Solicitar al usuario que autorice la conexión a Metamask
      await window.ethereum.request({ method: 'eth_requestAccounts' });
  
      // Obtener la dirección del usuario conectado para poder hacer el envío
      
      let accounts = await window.ethereum.request({ method: 'eth_accounts' });
      console.log(accounts)
      let sender = accounts[0];
  
      // Enviar la transacción desde la cuenta del usuario conectado
      let result = await contract.methods.Votante(indexCandidato).send({ from: sender });
  
      // Puedes manejar el resultado de la transacción aquí, si es necesario
      console.log('Transacción exitosa:', result);
      toast.add({ severity: 'success', summary: 'Votación existosa', detail: 'Su voto fue insertado correctamente', life: 3000 });
  
      return result;
    } catch (error) {
      console.error('Error al votar:', error);
      toast.add({ severity: 'error', summary: 'Aviso de Usuario', detail: "El votante ya fue registrado", life: 3000 });
      throw error; // Puedes manejar el error de acuerdo a tus necesidades
    }
  },

  
  // Puedes agregar más funciones según tus necesidades
};