import { computed, ref, watch } from 'vue';
import type { Client } from '../interfaces/Client';
import { useMutation, useQuery } from '@tanstack/vue-query';
import clientsAPi from '@/api/clients-api';

const getClient = async(id:number):Promise<Client> => {
    const {data} = await clientsAPi.get(`/clients/${id}`);

    return data;
};

const updateClient =  async (client:Client ):Promise<Client> =>{
    const {data} = await clientsAPi.patch(`clients/${client.id}`, client);
    /* const queryClient = useQueryClient();
    const queries = queryClient.getQueryCache().findAll(['clients?page='], {
      exact: false,
    });
    queries.forEach( query => query.reset());
    queries.forEach( query => query.fetch()); */
    return data;
  };


const useClient = (id:number) =>{

    const client = ref<Client>();

    const  clientMutation = useMutation(updateClient);
    
    const {isLoading, data,isError, error} = useQuery(
        ["client",id],
        ()=>getClient(id),
        {
            retry: 2,

        }
        
    )
    
      
    watch(clientMutation.isSuccess, () => {
        setTimeout(() => {
          clientMutation.reset();
        }, 2000);
      });
      

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
        clientMutation,

        //computed
        updateClient:      clientMutation.mutate,
        isUpdating:        computed( () => clientMutation.isLoading.value ),
        isUpdatingSuccess: computed( () => clientMutation.isSuccess.value ),
        isErrorUpdating:   computed( () => clientMutation.isError.value ),
    }
};

export default useClient;