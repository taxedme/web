<template>
    <div @click="toggle()"
        class="self-stretch px-3.5 py-2 bg-indigo-900 rounded-[5px] justify-center items-center gap-2.5 inline-flex h-fit">
        <div class="text-slate-50 text-base font-normal font-['General Sans'] leading-tight">New company</div>
    </div>

    <div v-if="open" class="bg-[#0000007c] fixed top-0 w-full h-full right-0 z-[100] grid place-content-center">
        <div class=" border border-gray-200 right-0 bottom-0 h-fit bg-white py-4 px-8 rounded-md w-[40em]">
            <div class="flex justify-between pb-6">
                <div class=" text-xl font-semibold leading-[25px] ">
                    Add Organization
                </div>

                <close @click="toggle()"></close>
            </div>
            <form @submit.prevent="store()" class="flex flex-col gap-6 h-fit">
                <div class="justify-start items-start gap-[5px] flex flex-col">
                    <div class="text-sm font-semibold capitalize ">
                        Organization name
                    </div>
                    <div class="relative grid w-full h-full">
                        <input v-model="form.title"
                            class="w-[75%] focus-visible:outline-0   border border-gray-300 rounded-md p-2">
                    </div>
                </div>

                <div class="justify-start items-start gap-[5px] flex flex-col">
                    <div class="text-sm font-semibold capitalize ">
                        Description
                    </div>
                    <div class="relative grid w-full h-full">
                        <textarea v-model="form.description"></textarea>
                    </div>
                </div>

                <div class="w-full flex justify-end ">
                    <button
                        class="text-sm capitalize cursor-pointer bg-[#302E81] w-fit h-fit p-2 rounded-md placeholder border border-gray-200 text-white">
                        Add Organization
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import close from '@/components/icons/close.vue';

const emits = defineEmits(['created'])

const props = defineProps({
    organization_id: Number
})

const open = ref(false)

const form = ref({})

function toggle() {
    if (open.value) {
        open.value = false;
    } else {
        open.value = true;
    }
}

function store() {
    // Calculate
    axios.post('api/organization/store', form.value, { progress: true })
        .then((e) => {
            console.log(e.data.data);
            emits('created', e.data.data)
        })
        .catch((e) => {
            console.log(e)
        })
}


</script>