<script setup>
definePageMeta({
  layout: false,
});
const conectar = () => {
    navigateTo('/inicio')
}
</script>

<template>
    <div class="flex flex-column p-fluid" style="min-height: 97vh">
        <div class="flex align-items-center justify-content-center py-5">
            <img src="/unsm.png" alt="Nor oriental" width="250"  />
        </div>
        <div class="flex align-items-center justify-content-center">
            <div v-focustrap class="card" style="padding-top: 0px">
                <p class="text-2xl text-center font-bold">Agregar texto</p>
                <form @submit="onSubmit" class="flex flex-column mt-6">
                    <Button @click="conectar" label="Conectar" class="mt-2" autofocus />
                </form>
            </div>
        </div>
    </div>

</template>

<style scoped>
.card {
    background-color: var(--surface-hover);
    padding: 2rem;
    border-radius: 10px;
    margin-bottom: 1rem;
}
.arriba-padding {
    padding-top: 30vh;
}

</style>
