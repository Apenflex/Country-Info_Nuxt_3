<script setup>

</script>

<template>
    <main class="page-home">
        <section class="relative">
            <div class="container-80">
                <Input />
                <div class="page-home__wrapper">
                    <div>
                        <CountryCard :country="{ id: 1}"/>
                        <CountryCard :country="{ id: 2}"/>
                        <CountryCard :country="{ id: 3}"/>
                    </div>
                    <div>3 Random country cards</div>
                </div>
            </div>
        </section>
    </main>
</template>
