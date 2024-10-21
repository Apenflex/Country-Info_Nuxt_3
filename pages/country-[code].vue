<script setup>
const route = useRoute()
// console.log(route)
</script>

<template>
    <div>
        country id: {{ route.params.code }}
    </div>
</template>