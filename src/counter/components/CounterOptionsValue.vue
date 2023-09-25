<script setup lang="ts">

import { useCounterOptionsStore } from '@/store/counter-options';

const counterOptions = useCounterOptionsStore()

</script>


<template>
    <h1>
        Counter component page: {{ counterOptions.count }}
    </h1>
    <h3>
        Last updated: {{ counterOptions.lastChanged }}
    </h3>
</template>

<style scoped>
</style>