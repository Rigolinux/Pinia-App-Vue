<script setup lang="ts">
import { counterSetupStore } from '@/store/counter-setup';
import { storeToRefs } from 'pinia';

import CounterSetupValue from '../components/CounterSetupValue.vue';

const counterOptions = counterSetupStore()
// do not destructure the store, it will lose reactivity but you can do this
const { count, squareCount } = storeToRefs(counterOptions)

const { incrementByOne, incrementBy} = counterOptions;


</script>

<template>
  <div>
    <h1>Counter Setup  page: {{ count }}</h1>
    <h4>Square counter {{ squareCount}}</h4>
  </div>
  <br>
  <button @click="incrementByOne">+1</button>
  <button @click="incrementBy(2)">+2</button>
  <button @click="incrementBy(5)">+5</button>
  <!--reset nor work in setup-->
  <button @click="counterOptions.$reset">Reset</button>

  <CounterSetupValue />

</template>

<style scoped>
</style>
