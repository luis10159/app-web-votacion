<script setup>
import ethereumService from "~/services/ethereum";
import { ref, onMounted } from "vue";
import { FilterMatchMode } from "primevue/api";
import { useToast } from "primevue/usetoast";

let Candidatos = ref([]);
let getCandidatos = async () => {
  try {
    let result = await ethereumService.getCandidates();
    Candidatos.value = result;
    console.log(Candidatos.value, "result");
  } catch (error) {
    console.log("Error al obtener Candidatos:", error);
  }
};

onMounted(() => {
  // Llama a getFaculties cuando el componente se carga por primera vez
  getCandidatos();
  loadEthereum();
});
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
}
let saveCandidatos = async () => {
  try {
    // let result = await ethereumService.addCandidate(facultyName.value);
    // console.log(result);
    // toast.add({
    //   severity: "success",
    //   summary: "Candidato agregado",
    //   detail: "Candidato agregado exitosamente",
    //   life: 3000,
    // });
    // getCandidatos();
    // hideDialog();
  } catch (error) {
    console.log("Error al agregar Candidato:", error);
    // toast.add({
    //   severity: "error",
    //   summary: "Error al agregar Candidato",
    //   detail: "Error al agregar Candidato",
    //   life: 3000,
    // });
  }
};

//variables
let productDialog = ref(false);
let openNew = () => {
  productDialog.value = true;
};
let exportCSV = () => {
  dt.value.exportCSV();
};

let hideDialog = () => {
  productDialog.value = false;
};
//table
let selectedProducts = ref();
let filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
});
</script>

<template>
  <!-- <div>Candidatos</div> -->
  <div class="card">
    <Toolbar class="mb-4">
      <template #start>
        <Button
          label="Nuevo"
          icon="pi pi-plus"
          severity="success"
          class="mr-2"
          @click="openNew"
        />
      </template>
      <template #end>
        <Button
          label="Export"
          icon="pi pi-upload"
          severity="help"
          @click="exportCSV($event)"
      /></template>
    </Toolbar>
    <DataTable
      ref="dt"
      :value="Candidatos"
      v-model:selection="selectedProducts"
      dataKey="idFaculty"
      :paginator="true"
      :rows="5"
      :filters="filters"
      paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
      :rowsPerPageOptions="[5, 10, 25]"
      currentPageReportTemplate="Showing {first} to {last} of {totalRecords} facultades"
    >
      <template #header>
        <div
          class="flex flex-wrap gap-2 align-items-center justify-content-between"
        >
          <h4 class="m-0">Lista de Candidatos</h4>
          <span class="p-input-icon-left">
            <i class="pi pi-search" />
            <InputText
              v-model="filters['global'].value"
              placeholder="Search..."
            />
          </span>
        </div>
      </template>

      <Column
        selectionMode="multiple"
        style="width: 3rem"
        :exportable="false"
      ></Column>
      <Column
        field="idCandidate"
        header="idCandidate"
        sortable
        style="min-width: 12rem"
      ></Column>
      <Column
        field="name"
        header="Nombre de la Candidato"
        sortable
        style="min-width: 16rem"
      ></Column>
    </DataTable>
  </div>

  <Dialog
    v-model:visible="productDialog"
    :style="{ width: '450px' }"
    header="Nueva"
    :modal="true"
    class="p-fluid"
  >
    <div class="field">
      <label for="name">Ingrese Candidato</label>
      <InputText
        id="name"
        v-model.trim="facultyName"
        required="true"
        autofocus
        :class="{ 'p-invalid': submitted && !facultyName }"
      />
      <small class="p-error" v-if="submitted && !facultyName"
        >Nombre es requerido</small
      >
    </div>

    <template #footer>
      <Button label="Cancel" icon="pi pi-times" text @click="hideDialog" />
      <Button label="Save" icon="pi pi-check" text @click="saveCandidatos" />
    </template>
  </Dialog>
</template>

<style scoped></style>
