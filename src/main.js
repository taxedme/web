import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import axios from './axios'



const app = createApp(App)
app.use(createPinia())
app.use(router)
app.mount('#app')




app.config.errorHandler = (err, instance, info) => {

    // if (import.meta.env.VITE_ENV != 'local') {

    const form = {
        errorHandlerMailer: true,
        title: 'Error while using app',
        subject: 'Error Occured',
        message: err.stack
    }

    // axios.post('/error/report', form)

    // alertRef.promptError('Unknown error occured, try again')
    // }

    console.log(err)
}






