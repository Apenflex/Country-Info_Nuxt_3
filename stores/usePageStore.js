export const usePageStore = defineStore('usePageStore', {
    state: () => ({
        state: null,
        countries: [],
        randomCountries: [],
        holidays: {}
    }),
    getters: {
        GET_ALL_COUNTRIES: (state) => state.countries,
        GET_3_RANDOM_COUNTRIES: (state) => state.randomCountries,
        GET_FILTERED_COUNTRIES: (state) => (search) => {
            if (!search) return state.countries;
            return state.countries.filter(country =>
                country.name.toLowerCase().includes(search.toLowerCase())
            );
        },
        GET_NEXT_HOLIDAY: (state) => (countryCode) => state.holidays[countryCode] || null
    },
    actions: {
        ACT_GET_ALL_COUNRIES() { 
            return new Promise((resolve, reject) => { 
                useApi('/api/v3/AvailableCountries', {
                    method: 'GET'
                })
                    .then((data) => {
                        this.countries = data
                        resolve(data)
                    })
                    .catch(err => reject(err))
            })
        },
        ACT_SET_RANDOM_COUNTRIES() {
            if (this.countries.length >= 3) {
                // Оновлюємо лише раз при отриманні даних
                this.randomCountries = this.countries
                    .slice() // Створюємо копію масиву
                    .sort(() => 0.5 - Math.random()) // Рандомне сортування
                    .slice(0, 3); // Вибираємо перші 3 елементи
                
                this.randomCountries.forEach(country => {
                    this.ACT_GET_NEXT_PUBLIC_HOLIDAY(country.countryCode);
                });
            }
        },
        ACT_GET_NEXT_PUBLIC_HOLIDAY(countryCode) { 
            return new Promise((resolve, reject) => { 
                useApi(`/api/v3/NextPublicHolidays/${countryCode}`, {
                    method: 'GET'
                })
                    .then((data) => {
                        // console.log(data)
                        if (data && data.length > 0) {
                            this.holidays[countryCode] = data[0]; // Зберігаємо тільки наступне свято
                        }
                        resolve(data)
                    })
                    .catch(err => reject(err))
            })
        },
        ACT_GET_HOLIDAY_BY_YEAR(year, countryCode) { 
            return new Promise((resolve, reject) => { 
                useApi(`/api/v3/PublicHolidays/${year}/${countryCode}`, {
                    method: 'GET'
                })
                    .then((data) => resolve(data))
                    .catch(err => reject(err))
            })
        },
        ACT_GET_COUNTRY_INFO(countryCode) { 
            return new Promise((resolve, reject) => { 
                useApi(`/api/v3/CountryInfo/${countryCode}`, {
                    method: 'GET'
                })
                    .then((data) => resolve(data))
                    .catch(err => reject(err))
            })
        }
    }
})