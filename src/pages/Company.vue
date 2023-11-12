<template>
    <div class="p-8 bg-gray-100 rounded-[9px] border border-stone-300 flex justify-between items-center mt-[30px] ">
        <div class="self-stretch flex-col justify-start items-start gap-[7px] flex">
            <div class="text-zinc-700 text-2xl font-semibold font-['General Sans']">Good Morning James</div>
            <div class="text-zinc-700 text-lg font-normal font-['General Sans']">It’s a good day to manage some tax.</div>
        </div>
        <div class="flex flex-col justify-center">
            <NewCompany @created="push($event)"></NewCompany>
        </div>
    </div>


    <!-- Empty state-->
    <EmptyState v-if="data.total < 1"></EmptyState>

    <!-- Data table -->
    <Companies v-else :data="data"></Companies>
</template>



<script setup>

import { onBeforeMount, onMounted, ref } from 'vue';
import EmptyState from '@/components/reusables/emptyState.vue';
import Companies from '@/components/reusables/companies.vue';
import NewCompany from '@/components/reusables/newCompany.vue';
import axios from 'axios';

const data = ref({
    total: 0
});

function push(e) {
    data.value.data.push(e)
}

onBeforeMount(() => {
    axios.get('api/organization')
        .then((e) => {
            data.value = e.data.data;
            console.log(data.value)
        })
        .catch((e) => {
            console.log(e)
        })
})
</script>