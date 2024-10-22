<script setup>
const route = useRoute()
const router = useRouter()
const pageStore = usePageStore()

const { data: countryInfo } = await useAsyncData(
    'get-country-info',
    () => pageStore.ACT_GET_COUNTRY_INFO(route.params?.code)
)

const yearRange = ref([...Array(11).keys()].map(i => 2020 + i))
const currentYear = new Date().getFullYear()
const selectedYear = computed(() => (route.query?.year ? parseInt(route.query?.year) : currentYear))

// Функція для отримання свят за роком
const fetchHolidaysByYear = async year => {
    if (year === currentYear) {
        const holidays = await pageStore.ACT_GET_HOLIDAY_BY_YEAR(year, route.params?.code)
        const today = new Date()
        const endOfYear = new Date(year, 11, 31) // 31 грудня поточного року
        // Фільтрація свят, що відбулися
        return holidays.filter(holiday => {
            const holidayDate = new Date(holiday.date)
            return holidayDate > today && holidayDate <= endOfYear
        })
    } else {
        return await pageStore.ACT_GET_HOLIDAY_BY_YEAR(year, route.params?.code)
    }
}
const { data: holidayData, refresh } = await useAsyncData(
    `get-holiday-by-year-${selectedYear.value}`,
    () => fetchHolidaysByYear(selectedYear.value)
)

const onYearChange = async year => {
    router.replace({
        query: {
            ...route.query,
            year: year === currentYear ? undefined : year
        }
    })
}

watch(
    () => route.query?.year,
    () => refresh()
)
</script>

<template>
    <main class="page-country">
        <section>
            <div class="container-80">
                <h1>{{ selectedYear }} holidays for {{ countryInfo.commonName }}</h1>
                <p class="mt-10">{{ countryInfo.officialName }}</p>
                <p>{{ countryInfo.region }}</p>
                <div class="page-country__pagination mt-16">
                    <NuxtLink
                        v-for="year in yearRange"
                        :key="year"
                        :to="{
                            path: route.path,
                            query: year === currentYear ? undefined : { year }
                        }"
                        :class="['pointer', { active: year === selectedYear }]"
                        @click.prevent="onYearChange(year)"
                    >
                        {{ year }}
                    </NuxtLink>
                </div>
                <div class="page-country__wrapper mt-10">
                    <div
                        v-if="holidayData?.length > 0"
                        v-for="holiday in holidayData"
                        :key="holiday.date"
                        class="page-country__card mt-32"
                    >
                        <p class="text-20 font-600">
                            <strong>{{ holiday.name }}</strong> ({{ holiday.localName }})
                        </p>
                        <p class="text-18">Date: {{ formattedDate(holiday.date) }}</p>
                        <p>Type: {{ holiday.types.join(', ') }}</p>
                    </div>
                    <p
                        v-else
                        class="text-20 font-600"
                    >
                        No holidays found for this year.
                    </p>
                </div>
            </div>
        </section>
    </main>
</template>
