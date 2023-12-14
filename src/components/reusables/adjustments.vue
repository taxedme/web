<template>
    <div v-if="Object.keys(adjust.data).length > 0" class="p-4  ">
        <!-- <div class="text-start">
            <ul class="flex text-md gap-8 pb-2 font-medium">
                <li>NHF: {{ adjust.data.nhf.toLocaleString('en-US') }}</li>
                <li>NHIS: {{ adjust.data.nhis.toLocaleString('en-US') }}</li>
                <li>Pension: {{ adjust.data.pension.toLocaleString('en-US') }}</li>
                <li>Gratuities: {{ adjust.data.gratuities.toLocaleString('en-US') }}</li>
                <li>Life insurance: {{ adjust.data.life_insurance.toLocaleString('en-US') }}</li>
            </ul>
            <hr>
        </div> -->
        <div class=" flex gap-4 divide-x-2 ">

            <div class="grid pt-2 h-fit">

                <div class="flex flex-col gap-6 h-fit ">

                    <div class="justify-start items-start gap-[5px] flex flex-col w-full">
                        <div class="text-lg font-semibold ">
                            Workers name
                        </div>
                        <div class="relative grid grid-cols-4 h-full w-full">
                            <input v-model="adjust.data.names"
                                class=" w-full focus-visible:outline-0 col-span-3 border border-gray-300 rounded-md p-2">
                        </div>
                    </div>

                    <div class="flex">
                        <div class="justify-start items-start gap-[5px] flex flex-col">
                            <div class="text-lg font-semibold ">
                                Basic salary
                            </div>
                            <div class="relative grid grid-cols-4 h-full">
                                <input type="number" v-model="adjust.data.salary"
                                    class=" focus-visible:outline-0 col-span-3 border border-gray-300 rounded-md p-2">
                            </div>
                        </div>
                        <div class="justify-start items-start gap-[5px] flex flex-col">
                            <div class="text-lg font-semibold ">
                                Months present
                            </div>
                            <div class="relative grid grid-cols-4 h-full">
                                <input type="number" v-model="adjust.data.months"
                                    class=" focus-visible:outline-0 col-span-3 border border-gray-300 rounded-md p-2">
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="grid pl-6 gap-4 pt-2 pb-8 h-fit ">
                <label class="pb-2 text-start font-semibold text-lg">Exemptions</label>
                <div class="w-full flex gap-8 ">
                    <div class="grid  h-fit">
                        <label class="text-start">
                            NHF
                        </label>
                        <div class="relative inline-flex items-center cursor-pointer">
                            <input type="number" v-model="adjust.data.nhf"
                                class=" focus-visible:outline-0 col-span-3 border border-gray-300 rounded-md p-2">
                        </div>
                    </div>

                    <div class="grid  h-fit">
                        <label class="text-start">
                            HMO
                        </label>
                        <div class="relative inline-flex items-center cursor-pointer">
                            <input type="number" v-model="adjust.data.hmo"
                                class=" focus-visible:outline-0 col-span-3 border border-gray-300 rounded-md p-2">
                        </div>
                    </div>


                    <div class="grid h-fit ">
                        <label class="text-start">
                            Pension
                        </label>
                        <div class="relative inline-flex items-center cursor-pointer">
                            <input type="number" v-model="adjust.data.pension"
                                class=" focus-visible:outline-0 col-span-3 border border-gray-300 rounded-md p-2">
                        </div>
                    </div>
                </div>

                <!-- <div class="flex gap-8 ">
                    <div class="justify-start items-start gap-[5px] flex flex-col">
                        <div class="text- text-lg font-normal ">
                            life insurance
                        </div>
                        <div class="relative grid grid-cols-4 h-full">
                           
                        </div>
                    </div>
                    <div class="justify-start items-start gap-[5px] flex flex-col">
                        <div class="text- text-lg font-normal ">
                            Gratuities
                        </div>
                        <div class="relative grid grid-cols-4 h-full">
                    
                        </div>
                    </div>
                </div> -->


            </div>
        </div>
        <div class="w-full flex justify-end gap-4 ">
            <div @click="update()"
                class="capitalize cursor-pointer bg-white hover:bg-[#626262ca] hover:text-white w-fit h-fit px-8 py-2 rounded-md  border border-gray-300 text-[#302E81] font-semibold">
                Update
            </div>
            <div @click="getAdjustments()"
                class="capitalize cursor-pointer bg-[#302E81] w-fit h-fit p-2 rounded-md placeholder border border-gray-200 text-white">
                calculate
            </div>
        </div>
    </div>
</template>


<script setup>
import $ from 'jquery'
import { onMounted, ref } from 'vue';
import axios from 'axios';

const props = defineProps({
    adjust: Object,
    organization_id: Number
})
const exemptions = ref({});

function update() {

    // Calculate
    axios.post('api/employee/update', {
        "names": props.adjust.data.names,
        "months": props.adjust.data.months,
        "salary": props.adjust.data.salary,
        "organization_id": props.organization_id,
        "employee_id": props.adjust.data.id,
    })
        .then((e) => {
            console.log(e.data.data);
        })
        .catch((e) => {
            console.log(e)
        })
}


function setExemption(e, v) {
    if ($(v).is(':checked')) {
        props.adjust.data.exemptions[e] = 1
    } else {
        props.adjust.data.exemptions[e] = 0
    }

}

function getAdjustments() {
    const form = {
        organization_id: props.organization_id,
        employee_id: props.adjust.data.id,
        months: props.adjust.data.months,
        salary: props.adjust.data.salary,
        nhf: props.adjust.data.nhf,
        hmo: props.adjust.data.hmo,
        pension: props.adjust.data.pension,
        employee_id: props.adjust.data.id
    }
    axios.post('api/tax/calculate', form)
        .then((e) => {  
            Object.assign(props.adjust.data, e.data.data[0]);
        })
        .catch((e) => {
            console.log(e)
        })
}

onMounted(() => {
    // console.log(props.adjust)
})


</script>