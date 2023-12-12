<template>
    <div class="card flex justify-content-center">
      <form @submit="onSubmit" class="flex flex-column gap-2">
        <div>Seleccione un candidato</div>
        <div class="flex  gap-3">
          <div v-for="candidato in candidatos" :key="candidato.idCandidate" class="flex align-items-center">
            <RadioButton v-model="selectedCandidate" :inputId="candidato.idCandidate" name="dynamic" :value="candidato" />
            <label :for="candidato.idCandidate" class="ml-2">{{ candidato.name }}</label>
          </div>
        </div>
  
        <small id="text-error" class="p-error">{{ errorMessage || '&nbsp;' }}</small>
        <Button type="submit" label="Submit" />
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import ethereumService from '~/services/ethereum';
  import { useToast } from 'primevue/usetoast';
  import { useField, useForm } from 'vee-validate';
  
  const { handleSubmit, resetForm } = useForm();
  const { value: selectedCandidate, errorMessage } = useField('selectedCandidate', validateField);
  const toast = useToast();
  
  let candidatos = ref([]);
  
  async function getCandidates() {
    try {
      let result = await ethereumService.getCandidates();
      candidatos.value = result;
      console.log(candidatos.value);
    } catch (error) {
      console.log('Error al obtener candidatos:', error);
    }
  }
  
  onMounted(() => {
    // Llama a getCandidates cuando el componente se carga por primera vez
    getCandidates();
  });
  
  function validateField(value) {
    if (!value || !value.idCandidate) {
      return 'Seleccione al menos un candidato.';
    }
  
    return true;
  }
  
  const onSubmit = handleSubmit(async () => {
    if (selectedCandidate.value && selectedCandidate.value.idCandidate) {
      // Tu lógica para manejar el envío del formulario
      console.log('Candidato seleccionado:', selectedCandidate.value);
      // await ethereumService(candidatoName.value, indexPartido.value.idParty, indexFacultad.value.idFaculty);
      await ethereumService.Votar(selectedCandidate.value.idCandidate,toast);
      //toast.add({ severity: 'success', summary: 'Votación Enviada', detail: 'Candidato seleccionado: ' + selectedCandidate.value.name, life: 3000 });
      resetForm();
    }
  });
  </script>
  