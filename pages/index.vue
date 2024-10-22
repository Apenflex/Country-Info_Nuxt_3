<script setup>
const pageStore = usePageStore()

const searchCountry = ref('')
const filteredCountries = computed(() => 
    pageStore.GET_FILTERED_COUNTRIES(searchCountry.value)
);

await useAsyncData('get-all-countries', () => pageStore.ACT_GET_ALL_COUNRIES())
onMounted(() => {
    pageStore.ACT_SET_RANDOM_COUNTRIES()
})
</script>

<template>
    <main class="page-home">
        <section class="relative">
            <div class="container-80">
                <Input 
                    v-model:value="searchCountry"
                    name="searchCountry"
                    label="Country"
                    placeholder="Search country"
                />
                <div class="page-home__wrapper">
                    <div class="page-home__list">
                        <CountryCard
                            v-for="country in filteredCountries" 
                            :key="country.countryCode" 
                            :country="country"
                        />
                    </div>
                    <div class="page-home__random-country">
                        <CountryCard 
                            v-for="(country, idx) in pageStore.GET_3_RANDOM_COUNTRIES" 
                            :key="idx" 
                            :country="country"
                        >
                            <template #next-holiday>
                                <div v-if="pageStore.GET_NEXT_HOLIDAY(country.countryCode)" class="mt-16">
                                    <p>Next holiday: 
                                        <span class="text-20 font-600">
                                            {{ pageStore.GET_NEXT_HOLIDAY(country.countryCode).name }}
                                        </span>
                                    </p>
                                    <p class="text-18">
                                        Date: {{ formattedDate(pageStore.GET_NEXT_HOLIDAY(country.countryCode).date) }}
                                    </p>
                                </div>
                                <div v-else>
                                    <p>Loading next holiday...</p>
                                </div>
                            </template>
                        </CountryCard>
                    </div>
                </div>
            </div>
        </section>
    </main>
</template>
