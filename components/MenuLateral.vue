<script setup>
import { ref, watchEffect, onMounted } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();
const currentPath = ref("");
import ethereumService from "~/services/ethereum";
watchEffect(() => {
  currentPath.value = route.path;
});
const expandedKeys = ref({});
const items = ref();
items.value = [
  {
    label: "Inicio",
    icon: "pi pi-fw pi-home",
    command: () => {
      navigateTo("/inicio");
    },
  },

  {
    label: "Candidatos",
    icon: "pi pi-users",
    command: () => {
      navigateTo("/candidatos");
    },
  },
  {
    label: "Elecciones",
    icon: "pi pi-user",
    command: () => {
      navigateTo("/elecciones");
    },
  },
  {
    label: "Facultades",
    icon: "pi pi-user",
    command: () => {
      navigateTo("/facultades");
    },
  },
  {
    label: "Partidos",
    icon: "pi pi-user",
    command: () => {
      navigateTo("/partidos");
    },
  },
  {
    label: "Conteo",
    icon: "pi pi-user",
    command: () => {
      navigateTo("/conteo");
    },
  },
  {
    label: "Votar",
    icon: "pi pi-user",
    command: () => {
      navigateTo("/votar");
    },
  },
  {
    label: "Asignar Candidato a Elección",
    icon: "pi pi-user",
    command: () => {
      navigateTo("/candidato-eleccion");
    },
  },
];

const collapseAll = () => {
  expandedKeys.value = {};
};

const expandNode = (node) => {
  if (node.items && node.items.length) {
    expandedKeys.value[node.key] = true;

    for (let child of node.items) {
      expandNode(child);
    }
  }
};
</script>

<template>
  <!-- Menu lateral -->
  <div class="flex flex-column align-items-center mx-0 pt-5">
    <Avatar image="/unsm.png" class="puntero mb-3" size="xlarge" />
    <p class="text-base m-0 text-center font-bold">UNSM</p>
    <p class="text-sm mt-0 mb-4 margen-abajo text-center">Votación</p>
  </div>

  <PanelMenu :model="items" class="mx-0 text-sm">
    <template #item="{ item }">
      <router-link
        v-if="item.route"
        v-slot="{ href, navigateTo }"
        :to="item.route"
        @click="navigateTo"
        :class="{
          active: currentPath === item.route.path,
        }"
        custom
      >
        <a
          v-ripple
          class="flex align-items-center cursor-pointer text-color px-3 py-2"
          :href="href"
        >
          <span :class="item.icon"></span>
          <span>{{ item.label }}</span>
        </a>
      </router-link>
      <a
        v-else
        v-ripple
        class="flex align-items-center cursor-pointer text-color px-3 py-2"
        :href="item.url"
        :target="item.target"
      >
        <span :class="[item.icon, 'text-blue-700']"></span>
        <span class="ml-2">{{ item.label }}</span>
        <span v-if="item.items" class="pi pi-angle-down text-blue-700 ml-auto">
        </span>
      </a>
    </template>
  </PanelMenu>
</template>

<style scoped>
.active {
  background-color: red;
  color: white;
}
</style>
