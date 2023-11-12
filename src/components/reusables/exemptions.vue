<template>
    <div @click="toggle()"
        class=" cursor-pointer bg-[#302E81] w-fit h-fit p-2 rounded-md placeholder border border-gray-200 text-white">
        Exemptions
    </div>

    <div v-if="open" class="fixed bg-[#00000071] top-0 w-full right-0 h-full  z-50 grid place-content-center  ">
        <form @submit.prevent="update()" class="bg-white rounded-lg p-4 grid gap-y-4 ">

            <div class="flex-col justify-start items-start gap-[35px] flex">
                <div class="flex-col justify-start items-start gap-6 flex">
                    <div class="flex justify-between w-full">
                        <div class="flex-col justify-start items-start gap-4 flex">
                            <div class=" text-xl font-semibold leading-[25px]">Tax Exemptions
                            </div>
                            <div class=" text-lg font-normal ">
                                Add required
                                details for your table and set the table with its required options

                            </div>
                        </div>
                        <close @click="toggle()"></close>
                    </div>
                    <div class="grid grid-cols-3 gap-y-4 gap-x-4 ">
                        <div class="justify-start items-center gap-1.5 flex">
                            <div class="justify-start items-end gap-[9px] flex">
                                <div class="justify-start items-start gap-[5px] flex">
                                    <div class=" text-lg font-normal ">
                                        <!-- national Housing Fund -->
                                        (NHF)
                                    </div>
                                    <div class=" text-lg font-semibold ">2.5%
                                    </div>
                                </div>
                            </div>
                            <label class="relative inline-flex items-center cursor-pointer">
                                <input @change="setExemption('nhf', $event.target)" :checked="form.value.nhf.status"
                                    type="checkbox" value="" class="sr-only peer">
                                <div
                                    class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-blue-600 rounded-xl select-none">
                                </div>
                                <span class="ml-3 text-sm font-medium text-gray-900 select-none">

                                </span>
                            </label>
                        </div>
                        <div class="justify-start items-center gap-1.5 flex">
                            <div class="justify-start items-end gap-[9px] flex">
                                <div class="justify-start items-start gap-[5px] flex">
                                    <div class=" text-lg font-normal ">
                                        <!-- National health insurance Scheme -->
                                        (NHIS)
                                    </div>
                                    <div class=" text-lg font-semibold ">5%
                                    </div>
                                </div>
                            </div>
                            <label class="relative inline-flex items-center cursor-pointer">
                                <input @change="setExemption('nhis', $event.target)" :checked="form.value.nhis.status"
                                    type="checkbox" value="" class="sr-only peer">
                                <div
                                    class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-blue-600 rounded-xl select-none">
                                </div>
                                <span class="ml-3 text-sm font-medium text-gray-900 select-none">

                                </span>
                            </label>
                        </div>
                        <div class="justify-start items-center gap-1.5 flex">
                            <div class="justify-start items-end gap-[9px] flex">
                                <div class="justify-start items-start gap-[5px] flex">
                                    <div class=" text-lg font-normal ">
                                        Pension</div>
                                    <div class=" text-lg font-semibold ">8%
                                    </div>
                                </div>
                            </div>
                            <label class="relative inline-flex items-center cursor-pointer">
                                <input @change="setExemption('pension', $event.target)" :checked="form.value.pension.status"
                                    type="checkbox" value="" class="sr-only peer">
                                <div
                                    class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-blue-600 rounded-xl select-none">
                                </div>
                                <span class="ml-3 text-sm font-medium text-gray-900 select-none">

                                </span>
                            </label>
                        </div>

                        <div class="justify-start items-center gap-1.5 flex">
                            <div class="justify-start items-end gap-[9px] flex">
                                <div class="justify-start items-start gap-[5px] flex flex-col">
                                    <div class="text- text-lg font-normal ">
                                        Gratuities
                                    </div>
                                    <div class="relative grid grid-cols-4 h-full">
                                        <input v-model="form.value.gratuities"
                                            class="focus-visible:outline-0 col-span-3 border-l border-t border-b border-gray-300 rounded-s-md p-2">
                                        <div class="px-4 flex flex-col justify-center text-center bg-gray-200 rounded-e-md">
                                            <span>
                                                %
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="justify-start items-center gap-1.5 flex">
                            <div class="justify-start items-end gap-[9px] flex">
                                <div class="justify-start items-start gap-[5px] flex flex-col">
                                    <div class="text- text-lg font-normal ">
                                        life insurance
                                    </div>
                                    <div class="relative grid grid-cols-4 h-full">
                                        <input v-model="form.value.life_insurance"
                                            class=" focus-visible:outline-0 col-span-3 border-l border-t border-b border-gray-300 rounded-s-md p-2">
                                        <div class="px-4 flex flex-col justify-center text-center bg-gray-200 rounded-e-md">
                                            <span>
                                                %
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <button type="submit"
                class="px-[103px] py-3 bg-indigo-900 rounded-[5px] justify-center items-center gap-2.5 inline-flex w-fit">
                <div class="text-slate-50 text-base font-normal leading-tight">Save</div>
            </button>
        </form>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import close from '@/components/icons/close.vue';
import axios from 'axios';
import $ from "jquery"

const props = defineProps({
    settings: Object
})

const open = ref(false)

const form = ref({});

function setExemption(e, v) {
    if ($(v).is(':checked')) {
        form.value.value[e].status = 1
    } else {
        form.value.value[e].status = 0
    }
}

function update() {
    axios.post('/api/settings/set', form.value)
        .then((e) => {
            console.log(e.data.data)
        })
        .catch((e) => {
            console.log(e)
            init()
        })
}


function init() {
    const s = JSON.parse(JSON.stringify(props.settings))

    for (const k in s) {
        if (s[k].key == "exemptions") {
            s[k].value = JSON.parse(s[k].value)
            form.value = s[k]
        }
    }
}
onMounted(() => {
    init()
})

function toggle() {
    if (open.value) {
        open.value = false
    } else {
        open.value = true;
    }
}
</script>