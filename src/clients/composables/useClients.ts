import clientsAPi from "@/api/clients-api";
import type { Client } from "../interfaces/Client";
import { useQuery } from "@tanstack/vue-query";
import { useClientStore } from "@/store/clients";
import { storeToRefs } from 'pinia';
import { watch } from 'vue';

const getClients = async(page: number):Promise<Client[]> => {

    //await new Promise(resolve => setTimeout(resolve, 1500));

    const {data} = await clientsAPi.get(`/clients?_page=${page}`);

    return data;

}




const useClients = () => {

    const store = useClientStore();

    const {currentPage,clients, totalPages } = storeToRefs(store);

    const {isLoading, data,} = useQuery(
        ["clients?page",currentPage], 
    ()=>getClients(currentPage.value),
    
    );

    watch(data,clients => {
        if(clients){
            store.setClients(clients);
        }
    })

    
    return {
        //properties
        isLoading,
        clients,
        currentPage,
        totalPages,

        //methods
        getPage(page: number) {
            store.setPage(page);
        },

        //getters
       // totalPagesNumbers: computed(() => [...new Array(totalPages.value)].map((_,index) => index + 1)),
    }
};


export default useClients;