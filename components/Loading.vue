<template>
  <div class="loading">
    <div class="loader">
      <img src="/escudo.png" class="drop" height="100" />
      <span></span>
    </div>
  </div>
</template>

<style scoped>
.loading {
  text-align: center;
  background: #000000;
  width: 100vw; /* Cambiamos a 100vw para que también cubra el ancho de la ventana */
  height: 100vh; /* Cubre toda la altura de la ventana */
  filter: alpha(opacity=50);
  opacity: 0.5;
  margin: 5px auto;
  position: fixed; /* Cambiamos a fixed para que no se mueva con el contenido */
  left: 0;
  top: 0;
  right: 0;
  bottom: 0; /* Añadimos bottom para asegurarnos de que cubra toda la ventana */
  z-index: 1000;
  padding: 0;
  overflow: hidden !important;
}

.loader {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 150px;
  height: 150px;
  border: -4px solid rgba(0, 102, 255, 0.1);
  border-radius: 80%;
  border-radius: 51%;
  line-height: 127px;
  font-family: sans-serif;
  font-size: 12px;
  color: #0066ff;
  letter-spacing: -10px;
  text-transform: uppercase;
  text-shadow: 0 0 10px #0066ff;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
  padding: 12px;
}

.loader::before {
  content: "";
  position: absolute;
  top: -3px;
  left: -3px;
  width: 100%;
  height: 100%;
  border: 3px solid transparent;
  border-top: 3px solid #0066ff;
  border-right: 3px solid #0066ff;
  border-radius: 50%;
  animation: animateC 2s linear infinite;
}

.loader span {
  display: block;
  position: absolute;
  top: calc(50% - 2px);
  left: 50%;
  width: 50%;
  height: 4px;
  background: transparent;
  transform-origin: left;
  animation: animate 2s linear infinite;
}

.loader span::before {
  content: "";
  position: absolute;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #00aeff;
  top: -6px;
  right: -8px;
  box-shadow: 0 0 20px 5px #0066ff;
}

@keyframes animateC {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

@keyframes animate {
  0% {
    transform: rotate(45deg);
  }

  100% {
    transform: rotate(405deg);
  }
}
</style>
