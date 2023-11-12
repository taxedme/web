<template>
    <div class="relative flex gap-4">
        <input ref="excel" @change="upload()" type="file" class="hidden" id="upload">
        <label for="upload"
            class="text-sm capitalize cursor-pointer bg-[#302E81] w-fit h-fit py-2 px-8 rounded-md placeholder border border-gray-200 text-white">
            Import
        </label>

        <div @click="toggle()"
            class="h-fit select-none hover:bg-gray-300 cursor-pointer px-8   py-2 bg-gray-100 rounded-[5px] border border-indigo-900 ">
            <div class="text-indigo-900 text-base font-medium font-['General Sans'] leading-tight">Add Employees</div>
        </div>

        <div v-if="open" class="bg-[#0000007c] fixed top-0 w-full h-full right-0 z-[100] grid place-content-center">
            <div class=" border border-gray-200 right-0 bottom-0 h-fit bg-white py-4 px-8 rounded-md w-[40em]">
                <div class="flex justify-between pb-6">
                    <div class=" text-xl font-semibold leading-[25px] ">
                        Add Employees
                    </div>

                    <close @click="toggle()"></close>
                </div>
                <form @submit.prevent="store()" class="flex flex-col gap-6 h-fit">
                    <div class="justify-start items-start gap-[5px] flex flex-col">
                        <div class="text-sm font-semibold capitalize ">
                            Worker name
                        </div>
                        <div class="relative grid w-full h-full">
                            <input v-model="form.names"
                                class="w-[75%] focus-visible:outline-0   border border-gray-300 rounded-md p-2">
                        </div>
                    </div>

                    <div class="flex w-full gap-6">
                        <div class="justify-start items-start gap-[5px] flex flex-col w-full">
                            <div class="text-sm font-semibold  capitalize">
                                salary
                            </div>
                            <div class="relative h-full w-full">
                                <input type="number" v-model="form.salary"
                                    class=" w-full focus-visible:outline-0 border border-gray-300 rounded-md p-2">
                            </div>
                        </div>

                        <div class="justify-start items-start gap-[5px] flex flex-col w-full">
                            <div class="text-sm font-semibold capitalize ">
                                Months present
                            </div>
                            <div class="relative h-full w-full">
                                <input type="number" v-model="form.months"
                                    class=" w-[30%] focus-visible:outline-0 border border-gray-300 rounded-md p-2">
                            </div>
                        </div>
                    </div>

                    <div class="w-full flex justify-end ">
                        <button
                            class="text-sm capitalize cursor-pointer bg-[#302E81] w-fit h-fit p-2 rounded-md placeholder border border-gray-200 text-white">
                            Add employee
                        </button>
                    </div>
                </form>
            </div>
        </div>



    </div>
</template>



<script setup>
import { ref } from 'vue';
import close from '@/components/icons/close.vue';
import axios from 'axios';


const props = defineProps({
    organization_id: Number
})

const emits = defineEmits(['created'])

const open = ref(false)
const form = ref({});
const excel = ref()


function upload() {
    var upload = new FormData();
    upload.append('excel', excel.value.files[0])
    upload.append('organization_id', props.organization_id)

    axios.post('api/employee/upload', upload,
        {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then((e) => {
            console.log(e)
        })
        .catch((e) => {
            console.log(e)
        })
}

function toggle() {
    if (open.value) {
        open.value = false;
    } else {
        open.value = true;
    }
}


function store() {
    // Calculate
    axios.post('api/employee/store', Object.assign(form.value, { organization_id: props.organization_id }, { progress: true }))
        .then((e) => {

            const calculate = {
                organization_id: props.organization_id,
                employee_id: e.data.data.id,
                months: e.data.data.months,
                salary: e.data.data.salary,
            }

            axios.post('api/tax/calculate', calculate, { progress: true })
                .then((e) => {
                    emits('created', e.data.data[0])
                    toggle()
                })
                .catch((e) => {
                    console.log(e)
                })

        })
        .catch((e) => {
            console.log(e)
        })
}
</script>