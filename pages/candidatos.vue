<script setup>
import ethereumService from "~/services/ethereum";
import { ref, onMounted } from "vue";
import { FilterMatchMode } from "primevue/api";
import { useToast } from "primevue/usetoast";

let Candidatos = ref([]);
let getCandidatos = async () => {
  try {
    let result = await ethereumService.getCandidates();
    Candidatos.value = result;
    console.log(Candidatos.value, "result");
  } catch (error) {
    console.log("Error al obtener Candidatos:", error);
  }
};

onMounted(() => {
  // Llama a getFaculties cuando el componente se carga por primera vez
  getCandidatos();
  loadEthereum();
});
async function loadEthereum() {
  try {
    if (window.ethereum) {
      console.log("Ethereum está presente");
      // Solicitar al usuario que autorice la conexión a Metamask
      await window.ethereum.request({ method: "eth_requestAccounts" });
      console.log("Cuenta Ethereum conectada exitosamente");
      // Ahora puedes realizar operaciones que requieren la billetera
    } else {
      console.log("No tiene instalado Ethereum");
      // Puedes mostrar un mensaje al usuario o redirigirlo a la página de instalación de Metamask
    }
  } catch (error) {
    console.error("Error al cargar Ethereum:", error);
    // Puedes manejar el error de acuerdo a tus necesidades
  }
}
</script>

<template>
  <div>Candidatos</div>
</template>

<style scoped></style>
