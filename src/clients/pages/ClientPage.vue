<script setup lang="ts">
import LoadingModal from '@/shared/components/LoadingModal.vue';
import { useRoute, useRouter } from 'vue-router';
import useClient from '../composables/useClient';
import { useMutation, useQueryClient } from '@tanstack/vue-query';
import type { Client } from '../interfaces/Client';
import clientsAPi from '@/api/clients-api';
import { watch } from 'vue';

const route = useRoute();
const router = useRouter();
const  queryClient = useQueryClient();

const { isLoading, client, isError,error } = useClient(+route.params.id);

const updateClient =  async (client:Client ):Promise<Client> =>{
  const {data} = await clientsAPi.patch(`clients/${client.id}`, client);
  const queries = queryClient.getQueryCache().findAll(['clients?page='], {
    exact: false,
  });
  queries.forEach( query => query.reset());
  queries.forEach( query => query.fetch());
  return data;
}


const clientMutation = useMutation(updateClient)

watch(clientMutation.isSuccess, () => {
  setTimeout(() => {
    clientMutation.reset();
  }, 2000);
});

watch( isError,()=>{
  if(error.value){
    router.replace('/clients');
  }
})


</script>

<template>

  <h3 v-if="clientMutation.isLoading.value" >Guardando ...</h3>
  <h3 v-if="clientMutation.isSuccess.value" >Guardado</h3>

  <LoadingModal v-if="isLoading" />

  <div v-if="client">
    <h1>{{ client.name }}</h1>
    <form
      @submit.prevent="clientMutation.mutate(client)"
    >

        <input 
          type="text" 
          placeholder="Name"
          v-model="client.name"  
        />
        <br />
        <input 
          type="text" 
          placeholder="Name"
          v-model="client.address"  
        />
        
        <br />
        <button
          type="submit"
          :disabled="clientMutation.isLoading.value"
        >Save</button>
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