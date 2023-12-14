<script setup>
import ethereumService from "~/services/ethereum";
import { ref, onMounted } from "vue";
import { FilterMatchMode } from "primevue/api";
import { useToast } from "primevue/usetoast";
let mostrar = ref(true);
let elecciones = ref([]);
let getElecciones = async () => {
  try {
    mostrar.value = false;
    let result = await ethereumService.getElections();
    elecciones.value = result;
    console.log(elecciones.value);
    mostrar.value = true;
  } catch (error) {
    mostrar.value = true;
    console.log("Error al obtener Elecciones:", error);
  }
};

onMounted(() => {
  // Llama a getparties cuando el componente se carga por primera vez
  getElecciones();
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
let eleccionName = ref("");
let eleccionYear = ref("");
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
let saveElecciones = async () => {
  try {
    submitted.value = true;

    if (!eleccionName.value) {
      return; // Evitar enviar la transacción si falta información
    }
    mostrar.value = false;
    productDialog.value = false;
    // Llamar a la función addFaculty del servicio Ethereum
    let f = await ethereumService.addElection(
      eleccionName.value,
      eleccionYear.value,
      toast
    );
    hideDialog();
    if (r) {
      mostrar.value = true;
    }
    getElecciones();
    // Actualizar la lista de facultades después de agregar una nueva
    // Puedes llamar a getFaculties o realizar cualquier acción necesaria

    // Cerrar el diálogo después de guardar
  } catch (error) {
    console.error("Error al guardar Elección:", error);
    hideDialog();
    mostrar.value = true;
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
          :value="elecciones"
          v-model:selection="selectedProducts"
          dataKey="idElection"
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
              <h4 class="m-0">Lista de Elecciones</h4>
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
            field="idElection"
            header="Código"
            sortable
            style="min-width: 12rem"
          ></Column>
          <Column
            field="name"
            header="Nombre del partido"
            sortable
            style="min-width: 16rem"
          ></Column>
          <Column
            field="year"
            header="Año"
            sortable
            style="min-width: 16rem"
          ></Column>
        </DataTable>
      </div>

      <Dialog
        v-model:visible="productDialog"
        :style="{ width: '450px' }"
        header="Registrar nueva Elección"
        :modal="true"
        class="p-fluid"
      >
        <div class="field">
          <label for="name">Ingrese Nueva Elección</label>
          <InputText
            id="name"
            v-model.trim="eleccionName"
            required="true"
            autofocus
            :class="{ 'p-invalid': submitted && !eleccionName }"
          />
          <small class="p-error" v-if="submitted && !eleccionName"
            >Nombre es requerido</small
          >

          <label for="name" class="mt-4">Año de la Elección</label>
          <InputNumber
            id="year"
            v-model.trim="eleccionYear"
            required="true"
            autofocus
            :class="{ 'p-invalid': submitted && !eleccionYear }"
          />
          <small class="p-error" v-if="submitted && !eleccionYear"
            >Año es requerido</small
          >
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
            @click="saveElecciones"
          >
          </Button>
        </template>
      </Dialog>
    </div>
  </div>
</template>

<style scoped></style>
