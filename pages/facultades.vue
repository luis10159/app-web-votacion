<script setup>
import ethereumService from "~/services/ethereum";
import { ref, onMounted } from "vue";
import { FilterMatchMode } from "primevue/api";
import { useToast } from "primevue/usetoast";
let mostrar = ref(true);
let faculties = ref([]);
let getFaculties = async () => {
  mostrar.value = false;
  try {
    let result = await ethereumService.getFaculties();
    faculties.value = result;
    mostrar.value = true;
    console.log(faculties.value);
  } catch (error) {
    mostrar.value = true;
    console.log("Error al obtener facultades:", error);
  }
};

onMounted(() => {
  // Llama a getFaculties cuando el componente se carga por primera vez
  getFaculties();
  loadEthereum();
});

// let loadEthereum = async ()=>{
//     try {
//     if (window.ethereum) {
//       console.log("Ethereum está presente");
//       await window.ethereum.request({ method: 'eth_requestAccounts' });
//       console.log("Cuenta Ethereum conectada exitosamente");
//     } else if(window.web3){
//         web3 = new Web3(window.web3.currentProvider)
//     }else {
//       console.log("No tiene instalado Ethereum");
//     }
//   } catch (error) {
//     console.error('Error al cargar Ethereum:', error);
//     // Puedes manejar el error de acuerdo a tus necesidades
//   }
// }

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

let products = ref();
let productDialog = ref(false);
let product = ref({});
let facultyName = ref("");
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
let saveFacultad = async () => {
  try {
    submitted.value = true;

    if (!facultyName.value) {
      return; // Evitar enviar la transacción si falta información
    }
    mostrar.value = false;
    productDialog.value = false;
    // Llamar a la función addFaculty del servicio Ethereum
    let r = await ethereumService.addFaculty(facultyName.value, toast);

    hideDialog();
    if (r) {
      mostrar.value = true;
    }

    // Actualizar la lista de facultades después de agregar una nueva
    getFaculties();
    // Actualizar la lista de facultades después de agregar una nueva
    // Puedes llamar a getFaculties o realizar cualquier acción necesaria

    // Cerrar el diálogo después de guardar
  } catch (error) {
    mostrar.value = true;
    console.error("Error al guardar facultad:", error);
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
          :value="faculties"
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
              <h4 class="m-0">Lista de Facultades</h4>
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
            field="idFaculty"
            header="Código"
            sortable
            style="min-width: 12rem"
          ></Column>
          <Column
            field="name"
            header="Nombre de la Facultad"
            sortable
            style="min-width: 16rem"
          ></Column>
        </DataTable>
      </div>

      <Dialog
        v-model:visible="productDialog"
        :style="{ width: '450px' }"
        header="Registrar nueva Facultad"
        :modal="true"
        class="p-fluid"
      >
        <div class="field">
          <label for="name">Ingrese Nueva Facultad</label>
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
            @click="saveFacultad"
          ></Button>
        </template>
      </Dialog>
    </div>
  </div>
</template>

<style scoped></style>
