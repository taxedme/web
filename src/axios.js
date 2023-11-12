import axios from 'axios';
import NProgress from 'nprogress'

// Axios init config
axios.defaults.withCredentials = true;
// axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.baseURL = import.meta.env.VITE_API_URL;



// Add a request interceptor
axios.interceptors.request.use(async function (config) {
    if ((
        config.method == 'post' ||
        config.method == 'put' ||
        config.method == 'delete'
    )) {
        await axios.get('/sanctum/csrf-cookie')
    }

    if (config.progress) {
        NProgress.start();
    }

    return config;
}, function (error) {
    // Do something with request error
    console.error(error)
    return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use(function (response) {
    // Do something with response data

    NProgress.done();
    return response;
}, function (error) {


    if (error.response != undefined && error.response.statusText != undefined && error.response.statusText.toString().toLowerCase() === 'unauthorized') {
        location.href = import.meta.env.VITE_APP_URL + '/login';
    }

    if (error.response != undefined && error.response.status == 401) {
        location.href = import.meta.env.VITE_APP_URL + '/login';
    }

    // if (JSON.parse(error.config.data).errorHandlerMailer == undefined) {
    //     alertRef.promptError(error.response == undefined ? 'Unknown error occured' : error.response.data.message)
    // }

    NProgress.done();
    // Do something with response error
    return Promise.reject(error);
});


export default axios