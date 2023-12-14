<script setup>
import ethereumService from "~/services/ethereum";
import { ref, onMounted } from "vue";
import { FilterMatchMode } from "primevue/api";
import { useToast } from "primevue/usetoast";
let mostrar = ref(true);
let candidatos = ref([]);
let facultades = ref([]);
let partidos = ref([]);
let getCandidates = async () => {
  mostrar.value = false;
  try {
    let result = await ethereumService.getCandidates();
    candidatos.value = result;
    let resultfacultades = await ethereumService.getFaculties();
    facultades.value = resultfacultades;
    let resultpartidos = await ethereumService.getParties();
    partidos.value = resultpartidos;
    console.log(candidatos.value, facultades.value, partidos.value);
    mostrar.value = true;
  } catch (error) {
    mostrar.value = true;
    console.log("Error al obtener candidatos:", error);
  }
};

onMounted(() => {
  // Llama a getCandidaties cuando el componente se carga por primera vez
  getCandidates();
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

let toast = useToast();
let dt = ref();

let productDialog = ref(false);
let product = ref({});
let candidatoName = ref("");
let indexPartido = ref("");
let indexFacultad = ref("");
let selectedProducts = ref();
let filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
});
let submitted = ref(false);

let openNew = () => {
  product.value = {};
  submitted.value = false;
  productDialog.value = true;
};
let hideDialog = () => {
  productDialog.value = false;
  submitted.value = false;
};
let saveCandidato = async () => {
  try {
    submitted.value = true;

    if (!candidatoName.value && !indexPartido.value && !indexFacultad.value) {
      return; // Evitar enviar la transacción si falta información
    }
    mostrar.value = false;
    productDialog.value = false;
    // Llamar a la función addFaculty del servicio Ethereum
    console.log(
      candidatoName.value,
      indexPartido.value,
      indexFacultad.value,
      "valore para enviar"
    );
    let r = await ethereumService.addCandidate(
      candidatoName.value,
      indexPartido.value.idParty,
      indexFacultad.value.idFaculty,
      toast
    );
    hideDialog();
    if (r) {
      mostrar.value = true;
    }
    // Actualizar la lista de facultades después de agregar una nueva
    // Puedes llamar a getFaculties o realizar cualquier acción necesaria
    getCandidates();
    // Cerrar el diálogo después de guardar
  } catch (error) {
    mostrar.value = true;
    console.error("Error al guardar el candidato:", error);
    hideDialog();
    // Puedes manejar el error de acuerdo a tus necesidades
  }
};

let exportCSV = () => {
  dt.value.exportCSV();
};
</script>

<template>
  <div>
    <Loading v-if="mostrar == false" />

    <div>
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
            <!-- <FileUpload mode="basic" accept="image/*" :maxFileSize="1000000" label="Import" chooseLabel="Import" class="mr-2 inline-block" /> -->
            <Button
              label="Export"
              icon="pi pi-upload"
              severity="help"
              @click="exportCSV($event)"
            />
          </template>
        </Toolbar>

        <DataTable
          ref="dt"
          :value="candidatos"
          v-model:selection="selectedProducts"
          dataKey="idFaculty"
          :paginator="true"
          :rows="5"
          :filters="filters"
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          :rowsPerPageOptions="[5, 10, 25]"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} Candidatos"
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
                  placeholder="Buscar..."
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
            header="Código"
            sortable
            style="min-width: 12rem"
          ></Column>
          <Column
            field="name"
            header="Nombre del Candidato"
            sortable
            style="min-width: 16rem"
          ></Column>
          <Column
            field="party.name"
            header="Nombre del partido"
            sortable
            style="min-width: 16rem"
          ></Column>
          <Column
            field="faculty.name"
            header="Nombre de la facultad"
            sortable
            style="min-width: 16rem"
          ></Column>
        </DataTable>
      </div>

      <Dialog
        v-model:visible="productDialog"
        :style="{ width: '450px' }"
        header="Registrar Nuevo Candidato"
        :modal="true"
        class="p-fluid"
      >
        <div class="field">
          <div>
            <label for="name">Ingrese Nuevo Candidato</label>
            <InputText
              id="name"
              v-model.trim="candidatoName"
              required="true"
              autofocus
              :class="{ 'p-invalid': submitted && !candidatoName }"
            />
            <small class="p-error mb-2" v-if="submitted && !candidatoName"
              >Nombre es requerido</small
            >
          </div>
          <div class="mt-4">
            <label for="name">Ingrese Nueva Facultad</label>
            <div class="card flex justify-content-center">
              <Dropdown
                v-model="indexFacultad"
                :options="facultades"
                showClear
                optionLabel="name"
                placeholder="Seleccionar Facultad"
                class="w-full md:w-14rem"
              />
            </div>
            <small class="p-error mb-2" v-if="submitted && !indexFacultad"
              >Facultad es requerido</small
            >
          </div>
          <div class="mt-4">
            <label for="name">Ingrese Nuevo Partido</label>
            <div class="card flex justify-content-center">
              <Dropdown
                v-model="indexPartido"
                :options="partidos"
                showClear
                optionLabel="name"
                placeholder="Seleccionar Partido"
                class="w-full md:w-14rem"
              />
            </div>
            <small class="p-error" v-if="submitted && !indexPartido"
              >Facultad es requerido</small
            >
          </div>
        </div>

        <template #footer>
          <Button
            label="Cancel"
            icon="pi pi-trash"
            severity="danger"
            @click="hideDialog"
          >
          </Button>
          <Button
            label="Save"
            severity="success"
            icon="pi pi-save"
            @click="saveCandidato"
          ></Button>
        </template>
      </Dialog>
    </div>
  </div>
</template>

<style scoped></style>
