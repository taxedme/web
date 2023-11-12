<template>
    <div class="mt-[30px] grid h-fit gap-6">
        <h1 class="text-zinc-700 text-[22px] font-semibold font-['General Sans']">Companies</h1>


        <div class="flex gap-16 flex-wrap ">


            <div v-for="(item, index) in props.data.data" :key="index"
                class="flex-col justify-start items-start gap-[35px] inline-flex cursor-pointer ">
                <div class="justify-start items-start gap-[25px] inline-flex">
                    <div
                        class="hover:bg-gray-300 pl-3 pr-6 pt-[17px] pb-7 bg-gray-100 rounded-xl border border-stone-300 justify-start items-center flex">
                        <div class="flex-col justify-start items-start gap-[25px] inline-flex">

                            <div class="flex-col justify-start items-start gap-[19px] flex">
                                <div class="text-indigo-900 text-2xl font-semibold font-['General Sans']">
                                    {{ item.title }}
                                </div>
                                <div class="flex-col justify-start items-start gap-[7px] flex">

                                    <div class="w-[261px] text-zinc-700 text-base font-normal  leading-snug">
                                        {{ item.description }}
                                    </div>
                                </div>
                            </div>

                            <div class="w-full flex justify-between">

                                <div @click="calculate(item)"
                                    class="p-2.5 bg-[#6C88F8] rounded-[5px]  gap-2.5  text-white text-base font-bold">
                                    calculate
                                </div>

                                <div @click="destroy(item.id)"
                                    class="p-2.5 bg-[red] rounded-[5px]  gap-2.5  text-white text-base font-bold">
                                    delete
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>

    </div>
</template>

<script setup>
import axios from 'axios';
import router from '../../router';

const props = defineProps({
    data: Object
});

function calculate(item) {
    router.push({ name: "calculator", query: { "id": item.id } })
}

function destroy(id) {
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
        })
        .catch((e) => {
            console.log(e)
        })

}


</script>