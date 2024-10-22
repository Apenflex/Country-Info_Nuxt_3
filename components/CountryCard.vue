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
        <div class="text-20 font-600">
            {{ country.name }}
        </div>
        <slot name="next-holiday" />
    </NuxtLink>
</template>