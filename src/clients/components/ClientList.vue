<script setup lang="ts">
import type { Client  } from '../interfaces/Client';

interface Props {
    clients: Client[];
}

defineProps<Props>();




</script>

<template>
    <ul>
        <li v-for="client of clients"
        :key="client.id"
        >
            <RouterLink
            :to = "{
                name: 'client-by-id',
                params: { id: client.id }
            }"
            >
                {{ client.name }}
            </RouterLink>
        </li>
    </ul>
</template>

<style scoped>
</style>