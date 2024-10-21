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
        :to="`/country-${country.countryCode}`"
        class="country-card"
    >
        {{ country.name }}
        <slot name="next-holiday" />
    </NuxtLink>
</template>