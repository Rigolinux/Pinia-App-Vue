<script setup lang="ts">
import LoadingModal from '@/shared/components/LoadingModal.vue';
import { useRoute } from 'vue-router';
import useClient from '../composables/useClient';

const route = useRoute();

const { isLoading, client } = useClient(+route.params.id);
</script>

<template>

  <h3>Guardando ...</h3>
  <h3>Guardado</h3>

  <LoadingModal v-if="isLoading" />

  <div>
    <h1>Client Page</h1>
    <form>

        <input type="text" placeholder="Name" />
        <br />
        <input type="text" placeholder="Adress" />
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