<script setup>



import ethereumService from '~/services/ethereum';
import { ref, onMounted } from 'vue';
import { FilterMatchMode } from 'primevue/api';
import { useToast } from 'primevue/usetoast';

let parties = ref([]);
let getParties = async () => {
  try {
    let result = await ethereumService.getParties();
    parties.value = result;
    console.log(parties.value);
  } catch (error) {
    console.log('Error al obtener Partidos:', error);
  }
};

onMounted(() => {
  // Llama a getparties cuando el componente se carga por primera vez
  getParties();
  loadEthereum();
});



async function loadEthereum() {
  try {
    if (window.ethereum) {
      console.log("Ethereum está presente");
      // Solicitar al usuario que autorice la conexión a Metamask
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      console.log("Cuenta Ethereum conectada exitosamente");
      // Ahora puedes realizar operaciones que requieren la billetera
    } else {
      console.log("No tiene instalado Ethereum");
      // Puedes mostrar un mensaje al usuario o redirigirlo a la página de instalación de Metamask
    }
  } catch (error) {
    console.error('Error al cargar Ethereum:', error);
    // Puedes manejar el error de acuerdo a tus necesidades
  }
}



let toast = useToast();
let dt = ref();


let productDialog = ref(false);
let product = ref({});
let partyName = ref('');
let selectedProducts = ref();
let filters = ref({
    'global': {value: null, matchMode: FilterMatchMode.CONTAINS},
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
let saveParty = async () => {
    try {
    submitted.value = true;

    if (!partyName.value) {
      return; // Evitar enviar la transacción si falta información
    }

    // Llamar a la función addFaculty del servicio Ethereum
    await ethereumService.addParty(partyName.value);

    // Actualizar la lista de facultades después de agregar una nueva
    // Puedes llamar a getFaculties o realizar cualquier acción necesaria

    // Cerrar el diálogo después de guardar
    hideDialog();
  } catch (error) {
    console.error('Error al guardar facultad:', error);
    // Puedes manejar el error de acuerdo a tus necesidades
  }

};


let exportCSV = () => {
    dt.value.exportCSV();
};




</script>

<template>
    <div>
    <!-- <Button @click="loadEthereum" label="Conectar con METAMASK"/> -->
    
    <div>
        <div class="card">
            <Toolbar class="mb-4">
                <template #start>
                    <Button label="Nuevo" icon="pi pi-plus" severity="success" class="mr-2" @click="openNew" />
                </template>

                <template #end>
                    <!-- <FileUpload mode="basic" accept="image/*" :maxFileSize="1000000" label="Import" chooseLabel="Import" class="mr-2 inline-block" /> -->
                    <Button label="Export" icon="pi pi-upload" severity="help" @click="exportCSV($event)"  />
                </template>
            </Toolbar>

            <DataTable ref="dt" :value="parties" v-model:selection="selectedProducts" dataKey="idParty" 
                :paginator="true" :rows="5" :filters="filters"
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" :rowsPerPageOptions="[5,10,25]"
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} facultades">
                <template #header>
                    <div class="flex flex-wrap gap-2 align-items-center justify-content-between">
                        <h4 class="m-0">Lista de Partidos</h4>
						<span class="p-input-icon-left">
                            <i class="pi pi-search" />
                            <InputText v-model="filters['global'].value" placeholder="Search..." />
                        </span>
					</div>
                </template>

                <Column selectionMode="multiple" style="width: 3rem" :exportable="false"></Column>
                <Column field="idParty" header="Código" sortable style="min-width:12rem"></Column>
                <Column field="name" header="Nombre del partido" sortable style="min-width:16rem"></Column>
               
                
            </DataTable>
        </div>

        <Dialog v-model:visible="productDialog" :style="{width: '450px'}" header="Nueva" :modal="true" class="p-fluid">
            
            <div class="field">
                <label for="name">Ingrese Nuevo Partido</label>
                <InputText id="name" v-model.trim="partyName" required="true" autofocus :class="{'p-invalid': submitted && !partyName}" />
                <small class="p-error" v-if="submitted && !partyName">Nombre es requerido</small>
            </div>
            

           
            <template #footer>
                <Button label="Cancel" icon="pi pi-times" text @click="hideDialog"/>
                <Button label="Save" icon="pi pi-check" text @click="saveParty" />
            </template>
        </Dialog>

	</div>
  </div>
</template>

<style scoped>

</style>
