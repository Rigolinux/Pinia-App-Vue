<script setup lang="ts">
import { useCounterOptionsStore } from '@/store/counter-options';
import { storeToRefs } from 'pinia';
import CounterOptionsValue from '../components/CounterOptionsValue.vue';

const counterOptions = useCounterOptionsStore()
// do not destructure the store, it will lose reactivity but you can do this
const { count, squareCount } = storeToRefs(counterOptions)

const { incrementByOne, incrementBy} = counterOptions;


</script>

<template>
  <div>
    <h1>Counter 1 page: {{ count }}</h1>
    <h4>Square counter {{ squareCount}}</h4>
  </div>
  <br>
  <button @click="incrementByOne">+1</button>
  <button @click="incrementBy(2)">+2</button>
  <button @click="incrementBy(5)">+5</button>
  <button @click="counterOptions.$reset">Reset</button>

  <CounterOptionsValue />

</template>

<style scoped>
</style>
