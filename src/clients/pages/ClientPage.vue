<script setup lang="ts">
import LoadingModal from '@/shared/components/LoadingModal.vue';
import { useRoute } from 'vue-router';
import useClient from '../composables/useClient';
import { useMutation } from '@tanstack/vue-query';
import type { Client } from '../interfaces/Client';
import clientsAPi from '@/api/clients-api';

const route = useRoute();

const { isLoading, client } = useClient(+route.params.id);

const updateClient =  async (client:Client ):Promise<Client> =>{
  const {data} = await clientsAPi.patch(`clients/${client.id}`, client);
  return data;
}


const clientMutation = useMutation(updateClient)


</script>

<template>

  <h3>Guardando ...</h3>
  <h3>Guardado</h3>

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
        <button>Save</button>
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