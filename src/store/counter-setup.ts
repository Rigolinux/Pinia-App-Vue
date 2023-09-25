import { defineStore } from "pinia";
import { computed, ref } from 'vue';


export const counterSetupStore = defineStore('counterSetup',() => {
    const count = ref<number>(0);
    const lastChanged  = ref<Date>();


    const incrementBy = (amount: number) => {
        count.value += amount;
        lastChanged.value = new Date();
    }



    return {
        //states
        count,
        lastChanged,

        //getters
        squareCount: computed(() => count.value * count.value),

        //actions
        incrementBy,
        incrementByOne: () => incrementBy(1),


    }
}); 