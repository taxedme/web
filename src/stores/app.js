import { ref, computed, onBeforeMount } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

export const useAppStore = defineStore('app', () => {

    const preload = ref({
        data: {},
        isLoaded: false
    })

    const route = ref('static')

    function load() {
        axios.get('api/user', { progress: true })
            .then((e) => {
                preload.value.data = e.data.data;
                preload.value.isLoaded = true
            })
            .catch((e) => {
                console.log(e)
            })
    }

    return { route, preload, load }
})