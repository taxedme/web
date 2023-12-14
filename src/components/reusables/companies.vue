<template>
    <div class="mt-[30px] grid h-fit gap-6">
        <h1 class="text-zinc-700 text-[22px] font-semibold font-['General Sans']">Companies</h1>


        <div class="flex  gap-16  ">
            <div v-for="(item, index) in props.data.data" :key="index"
                class="hover:bg-gray-300 px-[15px] pt-[17px] pb-[16px] bg-[#ECEDF2]  rounded-xl border border-stone-300 justify-start items-center  cursor-pointer w-full max-w-[50%] select-none">
                <div class=" flex-col-reverse justify-start items-start gap-[25px] flex w-full">

                    <div class=" justify-between items-start gap-[86px] flex h-fit w-full relative">
                        <div @click="calculate(item)"
                            class="text-white text-xl font-semibold font-['General Sans'] bg-[#6D88F9] p-[10px] rounded-[5px] flex items-center gap-2">
                            <home-list-icon></home-list-icon>
                            <span>Calculate</span>
                        </div>
                    </div>

                    <div class="flex justify-between w-full relative">
                        <div class="w-full flex justify-between flex-col">
                            <h1 class="text-[24px] font-[600] text-[#273469]">
                                {{ item.title }}
                            </h1>

                            <h1 class="text-[16px] text-[#30343F]">
                                {{ item.description }}
                            </h1>
                        </div>

                        <div class="" @click="toggle(index)">
                            <option-icon></option-icon>
                            <div :id="'option-' + index" class="bg-white absolute right-0 p-[15px] rounded-[18px] hidden ">
                                <div
                                    class="text-black text-[16px] font-[400] font-['General Sans'] bg-white px-[16px] py-[12px] rounded-[5px] flex items-center gap-2">
                                    <edit-icon></edit-icon>
                                    <span>Edit company</span>
                                </div>

                                <div @click="prompt(item.id)"
                                    class="text-[#FF331F] text-[16px] font-[400] font-['General Sans'] bg-[#F8E3E1] px-[16px] py-[12px] rounded-[5px] flex items-center gap-2">
                                    <trash-icon></trash-icon>
                                    <span>Delete company</span>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </div>
    </div>

    <Notice :open="notify.open" @accept="destroy()" @cancel="closePrompt()"></Notice>
</template>

<script setup>

import { ref } from 'vue';

import axios from 'axios';
import $ from "jquery";
import router from '../../router';
import homeListIcon from '@/components/icons/home-list-icon.vue';
import optionIcon from '@/components/icons/options-icon.vue';
import trashIcon from '@/components/icons/trash-icon.vue';

import editIcon from '@/components/icons/edit-icon.vue';
import Notice from './notice.vue';


const notify = ref({
    data: null,
    open: false
})


const props = defineProps({
    data: Object
});


function prompt(id) {
    notify.value.open = true;
    notify.value.data = id;
}

function closePrompt() {
    notify.value.data = null;
    notify.value.open = false;
}

function calculate(item) {
    router.push({ name: "calculator", query: { "id": item.id } })
}

function toggle(i) {
    $('#option-' + i).toggleClass('hidden')
}

function destroy() {
    const id = notify.value.data;

    axios.post('api/organization/delete', { id: id }, { progress: true })
        .then((r) => {
            const a = [];
            const e = JSON.parse(JSON.stringify(props.data.data))

            for (let i = 0; i < e.length; i++) {
                if (e[i].id != id) {
                    a.push(e[i])
                }
            }

            props.data.data = a
            closePrompt()
        })
        .catch((e) => {
            console.log(e)
        })

}


</script>