import { ref, watch } from 'vue';
import type { Client } from '../interfaces/Client';
import { useQuery } from '@tanstack/vue-query';
import clientsAPi from '@/api/clients-api';

const getClient = async(id:number):Promise<Client> => {
    const {data} = await clientsAPi.get(`/clients/${id}`);

    return data;
};


const useClient = (id:number) =>{

    const client = ref<Client>();

    const {isLoading, data,isError, error} = useQuery(
        ["client",id],
        ()=>getClient(id),
        {
            retry: 2,

        }
        
    )

    watch(data,() => {
        if(data.value){
            client.value = {...data.value}
        }
    }, {immediate: true})

    return {
        isLoading,
        client,
        isError,
        error,

    }
};

export default useClient;