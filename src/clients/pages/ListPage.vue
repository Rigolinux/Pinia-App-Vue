<script setup lang="ts">
import ClientList from '@/clients/components/ClientList.vue';
import PaginationNumber from '../components/PaginationNumber.vue';
import useClients from '../composables/useClients';
import LoadingModal from '@/shared/components/LoadingModal.vue';

const { isLoading,clients,getPage, currentPage,totalPages} = useClients();

</script>


<template>
    <div>
        <h1>List of clients</h1>

        <!--CLient list-->
        <ClientList :clients="clients" />
        <!--PaginationNumbers-->
        <PaginationNumber  
            :currentPage="currentPage"
            :totalPages="totalPages"
            @pageChangue="getPage"
        />

        <!--loading-->
        <LoadingModal v-if="isLoading" />

    </div>
</template>


<style scoped>
</style>