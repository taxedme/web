<template>
    <div @click="toggle()"
        class="self-stretch px-3.5 py-2 bg-indigo-900 rounded-[5px] justify-center items-center gap-2.5 inline-flex h-fit">
        <div class="text-slate-50 text-base font-normal font-['General Sans'] leading-tight">New company</div>
    </div>

    <div v-if="open" class="bg-[#0000007c] fixed top-0 w-full h-full right-0 z-[100] grid place-content-center">
        <div class=" border border-gray-200 right-0 bottom-0 h-fit bg-white py-[30px] px-[30px] rounded-md w-[40em]">
            <div class="flex justify-between pb-6">
                <div class=" text-xl font-semibold leading-[25px] text-[#273469]">
                    Add Organization
                </div>

                <close @click="toggle()"></close>
            </div>
            <form @submit.prevent="store()" class="flex flex-col gap-6 h-fit">
                <div class="justify-start items-start gap-[5px] flex flex-col">
                    <div class="text-[18px] font-[500] capitalize text-[#30343F]">
                        Company name
                    </div>
                    <div class="relative grid w-full h-full">
                        <input v-model="form.title"
                            class="w-[75%] focus-visible:outline-0   border border-[#D3D0D0] rounded-md bg-[#FAFAFA] p-2">
                    </div>
                </div>

                <div class="justify-start items-start gap-[5px] flex flex-col">
                    <div class="text-[18px] font-[500] capitalize text-[#30343F]">
                        Description
                    </div>
                    <div class="relative grid w-full h-full">
                        <textarea class="  border border-[#D3D0D0] rounded-md bg-[#FAFAFA] p-2" v-model="form.description"></textarea>
                    </div>
                </div>

                <div class="w-full flex justify-end ">
                    <button
                        class="text-[16px] capitalize cursor-pointer bg-[#302E81] w-fit h-fit py-[12px] px-[40px] rounded-md placeholder border border-gray-200 text-white">
                        Add company
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