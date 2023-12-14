<script setup>
import ethereumService from "~/services/ethereum";
import { ref, onMounted } from "vue";
import { FilterMatchMode } from "primevue/api";
import { useToast } from "primevue/usetoast";
let mostrar = ref(true);
let eleccion_candidato = ref([]);
let candidatos = ref([]);
let elecciones = ref([]);
let getelectionsCandidates = async () => {
  try {
    mostrar.value = false;
    let respuestaelec = await ethereumService.getelectionsCandidates();
    eleccion_candidato.value = respuestaelec;
    let result = await ethereumService.getCandidates();
    candidatos.value = result;
    let resultelecciones = await ethereumService.getElections();
    elecciones.value = resultelecciones;
    mostrar.value = true;
    console.log(eleccion_candidato.value, candidatos.value, elecciones.value);
  } catch (error) {
    mostrar.value = true;
    console.log("Error al obtener las elecciones y candidatos:", error);
  }
};

onMounted(() => {
  // Llama a getCandidaties cuando el componente se carga por primera vez
  getelectionsCandidates();
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
let indexCandidato = ref("");
let indexEleccion = ref("");
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
let saveAsignacion = async () => {
  try {
    submitted.value = true;

    if (!indexEleccion.value && !indexCandidato.value) {
      return; // Evitar enviar la transacción si falta información
    }

    // Llamar a la función addFaculty del servicio Ethereum
    console.log(
      indexCandidato.value,
      indexEleccion.value,
      "valore para enviar"
    );
    mostrar.value = false;
    productDialog.value = false;
    let r = await ethereumService.addElectionPartyCandidate(
      indexCandidato.value.idCandidate,
      indexEleccion.value.idElection,
      toast
    );
    hideDialog();
    if (r) {
      mostrar.value = true;
    }
    // Actualizar la lista de facultades después de agregar una nueva
    // Puedes llamar a getFaculties o realizar cualquier acción necesaria
    getelectionsCandidates();
    // Cerrar el diálogo después de guardar
    hideDialog();
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
          :value="eleccion_candidato"
          v-model:selection="selectedProducts"
          dataKey="idFaculty"
          :paginator="true"
          :rows="5"
          :filters="filters"
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          :rowsPerPageOptions="[5, 10, 25]"
          currentPageReportTemplate="Se encontraron {first} de {last} Total {totalRecords} Registros"
        >
          <template #header>
            <div
              class="flex flex-wrap gap-2 align-items-center justify-content-between"
            >
              <h4 class="m-0">Asignación de candidatos con elecciones</h4>
              <span class="p-input-icon-left">
                <i class="pi pi-search"> </i>
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
            field="idElectionPartyCandidate"
            header="Código"
            sortable
            style="min-width: 12rem"
          ></Column>
          <Column
            field="candidate.name"
            header="Nombre del Candidato"
            sortable
            style="min-width: 16rem"
          ></Column>
          <Column
            field="election.name"
            header="Nombre de la elección"
            sortable
            style="min-width: 16rem"
          ></Column>
        </DataTable>
      </div>

      <Dialog
        v-model:visible="productDialog"
        :style="{ width: '450px' }"
        header="Asignar Candidato a Elección"
        :modal="true"
        class="p-fluid"
      >
        <div class="field">
          <div>
            <label for="name">Ingrese el Candidato</label>
            <div class="card flex justify-content-center">
              <Dropdown
                v-model="indexCandidato"
                :options="candidatos"
                showClear
                optionLabel="name"
                placeholder="Seleccionar Candidato"
                class="w-full md:w-14rem"
              />
            </div>
            <small class="p-error" v-if="submitted && !indexCandidato"
              >Candidato es requerido</small
            >
          </div>
          <div class="mt-4">
            <label for="name" class="mt-4">Ingrese la Elección</label>
            <div class="card flex justify-content-center">
              <Dropdown
                v-model="indexEleccion"
                :options="elecciones"
                showClear
                optionLabel="name"
                placeholder="Seleccionar Elección"
                class="w-full md:w-14rem"
              />
            </div>
            <small class="p-error" v-if="submitted && !indexEleccion"
              >Elección es requerido</small
            >
          </div>
        </div>

        <template #footer>
          <Button
            label="Cancel"
            icon="pi pi-trash"
            severity="danger"
            @click="hideDialog"
          ></Button>
          <Button
            label="Save"
            severity="success"
            icon="pi pi-save"
            @click="saveAsignacion"
          />
        </template>
      </Dialog>
    </div>
  </div>
</template>

<style scoped></style>
