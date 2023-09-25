<script setup lang="ts">

import { counterSetupStore } from '@/store/counter-setup';

const counterOptions = counterSetupStore()

</script>


<template>
    <h1>
        Counter Setup component page: {{ counterOptions.count }}
    </h1>
    <h3>
        Last updated: {{ counterOptions.lastChanged }}
    </h3>
</template>

<style scoped>
</style>