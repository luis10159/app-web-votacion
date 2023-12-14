<script setup>

import ethereumService from '~/services/ethereum';
import { ref, onMounted } from 'vue';
import { ethers } from 'ethers';


let listaconteo = ref([]);
let totalVotos = ref(0);
let porcentajesVotos = ref([]);

let getConteo = async () => {
    try {
    let result = await ethereumService.getelectionsCandidates();
    listaconteo.value = result;
    console.log(listaconteo.value,listaconteo.value,"lista");

   

        listaconteo.value.forEach(e => {
          // Convierte el valor a cadena y elimina la "n" al final
          let votesCountString = e.candidate.votesCount.toString();
          let votesCountWithoutN = votesCountString.replace('n', '');

          // Convierte la cadena resultante a un número
          let numericVotesCount = parseInt(votesCountWithoutN);

            
          // Suma el valor numérico al totalVotos
          totalVotos.value += numericVotesCount;

          console.log(numericVotesCount,"cada voto"); // Esto imprimirá el valor numérico sin "n"
        });
        console.log(totalVotos.value,"total");
        
        
        // Calcula la suma de votos al recibir los datos
        listaconteo.value.forEach(e => {
          // Convierte el valor a cadena y elimina la "n" al final
          let votesCountString = e.candidate.votesCount.toString();
          let votesCountWithoutN = votesCountString.replace('n', '');

          // Convierte la cadena resultante a un número
          let numericVotesCount = parseInt(votesCountWithoutN);

          porcentajesVotos.value.push({
            porcentaje:(numericVotesCount/totalVotos.value)*100,
            nombre:e.candidate.name,
            eleccion:e.election.name
          })
          // Suma el valor numérico al totalVotos
          //totalVotos.value += numericVotesCount;

          
        });
        console.log(porcentajesVotos.value,"porcentajes");

    
    // console.log(totalVotos.value, "Total de votos");
    } catch (error) {
    console.log('Error al obtener listaconteo:', error);
    }
};


onMounted(() => {
  // Llama a getFaculties cuando el componente se carga por primera vez
  getConteo();
  loadEthereum();
//   listaconteo.value.forEach(e => {
//     totalVotos+=listaconteo.value.candidates.votesCount
//     console.log(totalVotos,"cantidad")
//   });
});


async function loadEthereum() {
  try {
    if (window.ethereum) {
      console.log("Ethereum está presente");
      // Solicitar al usuario que autorice la conexión a Metamask
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      console.log("Cuenta Ethereum conectada exitosamente");
      // Ahora puedes realizar operaciones que requieren la billetera
    } else {
      console.log("No tiene instalado Ethereum");
      // Puedes mostrar un mensaje al usuario o redirigirlo a la página de instalación de Metamask
    }
  } catch (error) {
    console.error('Error al cargar Ethereum:', error);
    // Puedes manejar el error de acuerdo a tus necesidades
  }
}
//const value = ref(60);

</script>

<template>
        <div v-for="lista in porcentajesVotos" :key="lista.nombre" class="flex align-items-center">
          <!-- <RadioButton v-model="selectedCandidate" :inputId="candidato.idCandidate" name="dynamic" :value="candidato" />
          <label :for="candidato.idCandidate" class="ml-2">{{ candidato.name }}</label> -->
          <Knob v-model="lista.porcentaje" :valueTemplate="`${lista.porcentaje}%`"/>
          <span>{{ lista.nombre }}</span>
        </div>
    <!-- <div>
        <Knob v-model="value" valueTemplate="{value}%" />
    </div> -->
</template>

<style scoped>

</style>
