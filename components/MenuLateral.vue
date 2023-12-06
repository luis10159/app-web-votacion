<script setup>
import { ref } from "vue";

const expandedKeys = ref({});
const items = ref()
items.value = [
    {
        label: 'Inicio',
        icon: 'pi pi-fw pi-home',
        command: () => {
            navigateTo('/inicio')
        }
    },
    {
        label: 'Votantes',
        icon: 'pi pi-user',
        command: () => {
            navigateTo('/votantes')
        }
    },
    {
        label: 'Candidatos',
        icon: 'pi pi-user',
        command: () => {
            navigateTo('/candidatos')
        }
    },
    {
        label: 'Elecciones',
        icon: 'pi pi-user',
        command: () => {
            navigateTo('/elecciones')
        }
    },
    {
        label: 'Facultades',
        icon: 'pi pi-user',
        command: () => {
            navigateTo('/facultades')
        }
    },
    {
        label: 'Partidos',
        icon: 'pi pi-user',
        command: () => {
            navigateTo('/partidos')
        }
    },
    {
        label: 'Conteo',
        icon: 'pi pi-user',
        command: () => {
            navigateTo('/conteo')
        }
    },
    {
        label: 'Votar',
        icon: 'pi pi-user',
        command: () => {
            navigateTo('/votar')
        }
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
            <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
                <a v-ripple class="flex align-items-center cursor-pointer text-color px-3 py-2" :href="href"
                    @click="navigate">
                    <span :class="item.icon" />
                    <span class="ml-2 text-color">{{ item.label }}</span>
                </a>
            </router-link>
            <a v-else v-ripple class="flex align-items-center cursor-pointer text-color px-3 py-2" :href="item.url"
                :target="item.target">
                <span :class="[item.icon, 'text-blue-700']" />
                <span class="ml-2">{{ item.label }}</span>
                <span v-if="item.items" class="pi pi-angle-down text-blue-700 ml-auto" />
            </a>
        </template>
    </PanelMenu>
</template>

<style scoped></style>
