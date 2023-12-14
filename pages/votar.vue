<template>
  <Loading v-if="mostrar == false" />
  <div class="card flex justify-content-center ma">
    <form @submit="onSubmit" class="flex flex-column gap-2">
      <h2>Seleccione un candidato</h2>
      <div class="flex gap-3">
        <div
          v-for="candidato in candidatos"
          :key="candidato.idCandidate"
          class="flex align-items-center justify-content-center"
        >
          <RadioButton
            v-model="selectedCandidate"
            :inputId="candidato.idCandidate"
            name="dynamic"
            :value="candidato"
          />
          <label :for="candidato.idCandidate" class="ml-2">{{
            candidato.name
          }}</label>
        </div>
      </div>

      <small id="text-error" class="p-error">{{
        errorMessage || "&nbsp;"
      }}</small>
      <Button type="submit" label="Submit" />
    </form>
  </div>
</template>

<script setup>
let mostrar = ref(true);
import { ref } from "vue";
import ethereumService from "~/services/ethereum";
import { useToast } from "primevue/usetoast";
import { useField, useForm } from "vee-validate";

const { handleSubmit, resetForm } = useForm();
const { value: selectedCandidate, errorMessage } = useField(
  "selectedCandidate",
  validateField
);
const toast = useToast();

let candidatos = ref([]);

async function getCandidates() {
  try {
    mostrar.value = false;
    let result = await ethereumService.getCandidates();
    candidatos.value = result;
    console.log(candidatos.value);
    mostrar.value = true;
  } catch (error) {
    mostrar.value = true;
    console.log("Error al obtener candidatos:", error);
  }
}

onMounted(() => {
  // Llama a getCandidates cuando el componente se carga por primera vez
  getCandidates();
});

function validateField(value) {
  if (!value || !value.name) {
    return "Seleccione al menos un candidato.";
  }

  return true;
}

const onSubmit = handleSubmit(async () => {
  if (selectedCandidate.value && selectedCandidate.value.name) {
    // Tu lógica para manejar el envío del formulario
    try {
      mostrar.value = false;
      console.log("Candidato seleccionado:", selectedCandidate.value);
      // await ethereumService(candidatoName.value, indexPartido.value.idParty, indexFacultad.value.idFaculty);
      let r = await ethereumService.Votar(
        selectedCandidate.value.idCandidate,
        toast
      );
      if (r) {
        mostrar.value = true;
      }
      resetForm();
    } catch (error) {
      mostrar.value = true;
      resetForm();
    }
    //toast.add({ severity: 'success', summary: 'Votación Enviada', detail: 'Candidato seleccionado: ' + selectedCandidate.value.name, life: 3000 });
  }
});
</script>
<style scoped>
.ma {
  position: relative;
  top: 50%;
  width: 100%;
  max-width: 500px;
  margin: auto;
}
</style>
