<script setup>
const route = useRoute()
// console.log(route)
</script>

<template>
    <div>
        country id: {{ route.params.id }}
    </div>
</template>