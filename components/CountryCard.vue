<script setup>
defineProps({
    country: {
        type: Object,
        default: () => ({})
    }
})
</script>

<template>
    <NuxtLink 
        :to="`/country-${country.id}`"
        class="country-card"
    >
        Country Card {{ country.id }}
    </NuxtLink>
</template>