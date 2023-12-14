<template>
  <div class="grid m-0">
    <!-- Menú lateral -->
    <div class="col-12 md:col-4 lg:col-2 mx-0 alto">
      <MenuLateral />
    </div>

    <div class="col-12 md:col-8 lg:col-10">
      <div class="grid">
        <!-- Barra superior -->
        <div class="col-12">
          <!-- Barra superior -->
          <BarraSuperior />
        </div>
        <!--Contenido: Recomendable empezar con "<div class="col-12">"-->

        <div class="col-12">
          <slot />
        </div>
      </div>
    </div>
  </div>
  <ScrollTop :threshold="50" />
</template>

<style scoped>
/** {*/
/*    border: .1px solid red;*/
/*}*/
body {
  background: var(--surface-card);
}

.alto {
  min-height: 100vh;
  background: var(--surface-ground);
}
</style>
