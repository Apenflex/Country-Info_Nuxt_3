// Використання customFetch для API запитів
export const useApi = (path, options = {}, pick = []) => {
    const { $customFetch } = useNuxtApp();
    const config = useRuntimeConfig();

    return $customFetch(path, {
        baseURL: config.public.apiHost,
        key: path,
        ...options,
    }, {
        pick,
    })
    // .catch(error => {
    //     // Handle error here if needed
    //     // console.error('API Error:', error);
    //     const errorObj = JSON.parse(error.message);
    //     // console.error('API Error:', errorObj);
    //     return {
    //         error: errorObj,
    //         data: null
    //         };
    // });
};