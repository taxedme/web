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
                                <div class="justify-start items-start gap-[5px] grid">
                                    <label class=" text-lg font-normal ">
                                        HMO
                                    </label>
                                    <input v-model="form.value.hmo" type="number"
                                        class=" focus-visible:outline-0 col-span-3 border border-gray-300 rounded-md p-2">
                                </div>
                            </div>

                        </div>
                        <div class="justify-start items-center gap-1.5 flex">
                            <div class="justify-start items-end gap-[9px] flex">
                                <div class="justify-start items-start gap-[5px] grid">
                                    <label class=" text-lg font-normal ">
                                        NHF
                                    </label>
                                    <input v-model="form.value.nhf" type="number"
                                        class=" focus-visible:outline-0 col-span-3 border border-gray-300 rounded-md p-2">
                                </div>
                            </div>

                        </div>
                        <div class="justify-start items-center gap-1.5 flex">
                            <div class="justify-start items-end gap-[9px] flex">
                                <div class="justify-start items-start gap-[5px] grid">
                                    <label class=" text-lg font-normal ">
                                        Pension
                                    </label>
                                    <input v-model="form.value.pension" type="number"
                                        class=" focus-visible:outline-0 col-span-3 border border-gray-300 rounded-md p-2">
                                </div>
                            </div>
                        </div>


                    </div>
                </div>
            </div>


            <div class="flex gap-8">
                <div class="flex items-center gap-2 ">
                    <input type="checkbox" v-model="form.value.save_on_update">
                    <span class="font-semibold"> Calculate on save</span>
                </div>
                <button type="submit"
                    class="px-[103px] py-3 bg-indigo-900 rounded-[5px] justify-center items-center gap-2.5 inline-flex w-fit">
                    <div class="text-slate-50 text-base font-normal leading-tight">Save</div>
                </button>
            </div>


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

const emits = defineEmits(['calculate'])

const open = ref(false)
const form = ref({});
const calculate = ref(false)

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
            if (calculate) {
                emits('calculate');
            }
        })
        .catch((e) => {
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