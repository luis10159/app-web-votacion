<script setup>
import { ref } from "vue";

const expandNode = (node) => {
  if (node.items && node.items.length) {
    expandedKeys.value[node.key] = true;

    for (let child of node.items) {
      expandNode(child);
    }
  }
};
const menu = ref();
const items2 = ref([{ separator: true }, { separator: true }]);

const toggle = (event) => {
  menu.value.toggle(event);
};

const CerrarSesion = () => {
  navigateTo("/");
};
</script>

<template>
  <Menubar>
    <template #end>
      <div class="flex align-items-center gap-2">
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
