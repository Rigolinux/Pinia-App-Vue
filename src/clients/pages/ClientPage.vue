<script setup lang="ts">
import LoadingModal from '@/shared/components/LoadingModal.vue';
import { useRoute, useRouter } from 'vue-router';
import useClient from '../composables/useClient';

import { watch } from 'vue';

const route = useRoute();
const router = useRouter();


const { 
    client, 
    isLoading, 
    clientMutation,
    updateClient,
    isUpdating,
    isUpdatingSuccess,
} = useClient( +route.params.id );




watch( clientMutation.isError,()=>{
  if(clientMutation.isError.value){
    router.replace('/clients');
  }
})


</script>

<template>

    <h3 v-if="isUpdating">Guardando...</h3>
    <h3 v-if="isUpdatingSuccess">Guardado</h3>

  <LoadingModal v-if="isLoading" />

  <div v-if="client">
        <h1>{{ client.name }}</h1>
        <form @submit.prevent="updateClient(client!)">
            <input 
                type="text"
                placeholder="Nombre"
                v-model="client.name"
            />
            <br>
            <input 
                type="text"
                placeholder="Dirección"
                v-model="client.address"
            />
            <br>

            <button 
                type="submit"
                :disabled="isUpdating"
            >Guardar</button>
        
        </form>   
   
    <code>
        information about client
        {{client}}
    </code>
  </div>

</template>

<style scoped>

input {
    width: 100%;
    padding: 5px 10px;
    margin-bottom: 10px;
}

button{
    margin-bottom: 10px;
}

</style>