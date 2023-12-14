<script setup>
import { ref, onMounted } from "vue";
import ethereumService from "~/services/ethereum";
let walletId = ref("");
let checkWalletConectada = ref(false);
definePageMeta({
  layout: false,
});
async function loadEthereum() {
  try {
    if (window.ethereum) {
      console.log("Ethereum está presente");
      // Solicitar al usuario que autorice la conexión a Metamask
      let r = await window.ethereum.request({ method: "eth_requestAccounts" });
      walletId.value = r[0];

      localStorage.setItem("walletId", walletId.value);
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
onMounted(() => {
  loadEthereum();
});
const conectar = async () => {
  navigateTo("/inicio");
};
</script>

<template>
  <div class="layout-topbar">
    <button class="p-link layout-topbar-menu-button layout-topbar-button">
      <i class="pi pi-ellipsis-v"></i>
    </button>

    <div class="layout-topbar-menu">
      <p-button styleClass="p-button-outlined p-button-success">
        <img alt="logo" src="/metamask-logo.svg" style="width: 1.5rem" />
        <span class="ml-2 font-bold">Conectar Billetera</span>
      </p-button>
      <!-- MOSTRAR ID SI LA DIRECCCION DE LA WALLET ESTA LOGUEADA -->
      <!-- <div *ngIf="checkWalletConectada">
        <label>{{ walletId }}</label>
      </div> -->
    </div>
  </div>
  <!-- Body -->
  <div class="layout-main-container">
    <div class="layout-main">
      <div class="block font-bold text-center p-0 border-round mb-3">
        <h1>BIENVENIDO A ELECCHAIN</h1>
      </div>
      <div class="block font-bold text-center p-0 border-round mb-3">
        <h1>Elecciones con Blockchain</h1>
      </div>
      <div class="block font-bold text-center p-0 border-round mb-3">
        <span class="text-gray-600 text-2xl">Click !</span>
      </div>
      <div class="block font-bold text-center p-0 border-round mb-3">
        <span class="text-gray-600 text-2xl">
          <!-- <p-button styleClass="p-button-outlined p-button-success">
            <img alt="logo" src="/metamask-logo.svg" style="width: 1.5rem" />
            <span class="ml-2 font-bold">Conectar Billetera</span>
          </p-button> -->
          <Button outlined class="border-2 p-button-success" @click="conectar">
            <img
              src="/metamask-logo.svg"
              alt="logo-metamask"
              width="35"
              height="20"
              viewBox="0 0 35 40"
              fill="none"
            />
            <span class="ml-2">Conectar Billetera</span>
          </Button>
        </span>
      </div>
      <div class="block font-bold text-center p-0 border-round mb-3">
        <img src="/vote.jpg" alt="" style="width: 15%; border-radius: 50%" />
      </div>
      <div class="block font-bold text-center p-0 border-round mb-3">
        <h1>#EleccionesUNSM2023 #BlockchainEnAcción</h1>
      </div>
    </div>
  </div>
  <!-- Footer -->
  <div class="layout-footer-layout">
    <a class="layout-footer-layout-logo" routerLink="">
      <img src="/escudo.png" alt="logo" />
    </a>
    <span class="mx-auto font-medium">
      &copy; 2023 Universidad Nacional de San Martín
    </span>
  </div>
</template>

<style scoped>
:root {
  --border-radius: 3px;
  --surface-card: #1e1e1e;
}

.card {
  background-color: var(--surface-hover);
  padding: 2rem;
  border-radius: 10px;
  margin-bottom: 1rem;
}
.layout-topbar {
  position: fixed;
  height: 6rem;
  z-index: 997;
  left: 0;
  top: 0;
  width: 100%;
  padding: 0 2rem;
  background-color: var(--surface-card);
  transition: left 0.2s;
  display: flex;
  align-items: center;
  box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.02), 0px 0px 2px rgba(0, 0, 0, 0.05),
    0px 1px 4px rgba(0, 0, 0, 0.08);
}
.layout-main-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  justify-content: space-between;
  padding: 7rem 2rem 2rem 4rem;
  transition: margin-left 0.2s;
}
.layout-main {
  flex: 1 1 auto;
}
.border-round {
  border-radius: var(--border-radius) !important;
}
.arriba-padding {
  padding-top: 30vh;
}
.layout-footer-layout {
  position: fixed;
  height: 5rem;
  z-index: 997;
  left: 0;
  bottom: 0;
  width: 100%;
  padding: 0 2rem;
  background-color: var(--surface-card);
  transition: left 0.2s;
  display: flex;
  align-items: center;
  box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.02), 0px 0px 2px rgba(0, 0, 0, 0.05),
    0px 1px 4px rgba(0, 0, 0, 0.08);
}
.layout-footer-layout .layout-footer-layout-logo {
  display: flex;
  align-items: center;
}
.layout-footer-layout .layout-footer-layout-logo img {
  height: 4.5rem;
  margin-right: 0.5rem;
}
.mx-auto {
  margin-left: auto !important;
  margin-right: auto !important;
}
.font-medium {
  font-weight: 500 !important;
}
.layout-footer {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 3rem;
  padding-top: 2rem;
  border-top: 1px solid var(--surface-d);
}
</style>
