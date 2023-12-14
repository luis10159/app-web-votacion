<script setup>
import { ref, onMounted } from "vue";
import ethereumService from "~/services/ethereum";
let walletId = ref("");
let checkWalletConectada = ref(false);
const expandNode = (node) => {
  if (node.items && node.items.length) {
    expandedKeys.value[node.key] = true;

    for (let child of node.items) {
      expandNode(child);
    }
  }
};
onMounted(() => {
  loadEthereum();
  walletId.value = localStorage.getItem("walletId");
});
const menu = ref();
const items2 = ref([{ separator: true }, { separator: true }]);

const toggle = (event) => {
  menu.value.toggle(event);
};
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
  //obtner localstorage de la wallet
}

const CerrarSesion = async () => {
  localStorage.removeItem("walletId");
  walletId.value = "";
  navigateTo("/");
};
</script>

<template>
  <Menubar>
    <template #end>
      <div class="flex align-items-center gap-2">
        {{ walletId }}
        <Avatar
          image="/unsm.png"
          class="mr-2 puntero"
          shape="circle"
          @click="toggle"
          aria-haspopup="true"
          aria-controls="overlay_menu"
        />
        <Menu ref="menu" id="overlay_menu" :model="items2" :popup="true">
          <template #start>
            <button
              @click="profileClick"
              class="w-full p-link flex align-items-center p-2 pl-3 text-color hover:surface-200 border-noround"
            >
              <Avatar icon="pi pi-user" class="mr-2" shape="circle" />
              <div class="flex flex-column align">
                <span class="font-bold">Hector Luis</span>
                <span class="text-sm">FISI</span>
              </div>
            </button>
          </template>
          <template #item="{ item, label, props }">
            <a class="flex" v-bind="props.action">
              <span v-bind="props.icon"></span>
              <span v-bind="props.label">{{ label }}</span>
              <Badge v-if="item.badge" class="ml-auto" :value="item.badge" />
            </a>
          </template>
          <template #end>
            <button
              @click="CerrarSesion"
              class="w-full p-link flex align-items-center p-2 pl-4 text-color hover:surface-200 border-noround"
            >
              <i class="pi pi-sign-out"></i>
              <span class="ml-2">Salir</span>
            </button>
          </template>
        </Menu>
        <Toast />
      </div>
    </template>
  </Menubar>
</template>

<style>
.puntero {
  cursor: pointer;
}
</style>
