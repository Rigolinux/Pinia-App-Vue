<script setup lang="ts">
import { ref, toRef, watch } from 'vue';

interface Props {
    currentPage: number;
    totalPages: number;
}

interface Emits {
    (event: 'pageChangue', pageNumber: number): void;
}

const props = defineProps<Props>();

const currentPage = toRef(props, 'currentPage');
const totalPages = toRef(props, 'totalPages');

const emits = defineEmits<Emits>();

const totalPagesNumbers = ref<number[]>([]);

watch( totalPages, () => {
    totalPagesNumbers.value = [...new Array(totalPages.value)].map((_,index) => index + 1);
},{
    immediate: true
});



</script>

<template>
    <div> 
        <button
        :disabled="currentPage === 1"
        @click="emits('pageChangue', currentPage - 1)"

        >Prev</button>
        <button :key="number"
        v-for="number in totalPagesNumbers"
        :class="{active: currentPage === number}"
        @click="emits('pageChangue',number)">{{number}}</button>
        <button
        :disabled="currentPage === totalPages"
        @click="emits('pageChangue', currentPage + 1)"
        >Next</button>
    </div>
</template>

<style scoped>
div{
    margin-top: 10px;
}
button{
    background-color: transparent;
    border-radius: 5px ;
    border: 1px solid var(--color-border);
    color: var(--color-text);
    cursor: pointer;
    margin-right: 5px;
    padding: 10px;
    transition: all .5s;
}

button:hover{
    background-color: hsla(160, 100%, 37%, 0.2);
    transition: all .5s;
}

button:disabled{
    cursor: not-allowed;
}

.active{
    background-color: hsla(160, 100%, 37%, 0.2);

}

</style>