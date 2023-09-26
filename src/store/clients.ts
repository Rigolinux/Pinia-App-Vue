import type { Client } from '@/clients/interfaces/Client';
import { defineStore } from 'pinia'
import {  ref } from 'vue'

export const useClientStore = defineStore('Client',() => {

    const currentPage = ref<number>(1);
    const totalPages = ref<number>(5);
    const clients = ref<Client[]>([]);

    return {
        //states  
        currentPage,
        totalPages,
        clients,

        //actions
        setClients (newclients: Client[]) {
            clients.value = newclients;
        },
        setPage (newPage: number) {
            if (newPage < 1 || newPage > totalPages.value || newPage === currentPage.value ) {
                return;
            }
            if(newPage > totalPages.value) return;
            
            currentPage.value = newPage;
        },

    }
}); 