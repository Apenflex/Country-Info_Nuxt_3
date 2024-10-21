// Плагін для налаштування $fetch з інтерцепторами
export default defineNuxtPlugin((nuxtApp) => {
    const config = useRuntimeConfig();
    const xsrfToken = useCookie('XSRF-TOKEN');

    // Створюємо новий екземпляр $fetch з інтерцепторами
    const customFetch = $fetch.create({
        async onRequest({ request, options }) {
            // const { token } = useAuth(); // Отримуємо токен з useAuth
            // console.log('onRequest', options);
            const headers = {
                accept: 'application/json',
                referer: config.public.apiHost,
                ...options.headers,
                ...useRequestHeaders(['cookie']),
            };
            if (xsrfToken && xsrfToken.value !== null) {
                headers['X-XSRF-TOKEN'] = xsrfToken.value;
            }
            // Перевіряємо наявність токена користувача та додаємо його до заголовків
            // if (token.value) {
            //     console.log('token from onRequest', token.value);
            //     headers['Authorization'] = `Bearer ${token.value}`;
            // }
            options.headers = headers;
        },
        async onResponse({ response }) {
            if (!response.ok) {
                // Обробка помилкових відповідей
                console.error('API Error:', response);
                throw new Error(JSON.stringify({
                    status: response.status,
                    statusText: response.statusText,
                    data: response._data,
                    ok: response.ok,
                }));
            }
            return response;
        },
        async onRequestError({ request, options, error }) {
            console.error('Request Error:', error);
            throw new Error(JSON.stringify({
                errorType: 'RequestError',
                message: error.message,
                request,
                options
            }));
        },
        async onResponseError({ request, options, response }) {
            console.error('Response Error:', response);
            // const errorData = await response.json();
            throw new Error(JSON.stringify({
                errorType: 'ResponseError',
                status: response.status,
                statusText: response.statusText,
                data: response._data,
                request,
                options
            }));
        }
    });
    // Прикріплюємо екземпляр customFetch до nuxtApp
    nuxtApp.provide('customFetch', customFetch);
});