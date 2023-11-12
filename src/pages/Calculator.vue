<template>
    <div class="pt-[30px] h-fit ">
        <div class="  flex-col justify-start items-start gap-[13px] inline-flex">
            <div class="text-zinc-700 text-[22px] font-semibold ">
                Sandy Telephone LTD
            </div>
            <!-- <div class="w-[569px] text-zinc-700 text-lg font-normal  leading-[25.20px]">
                Lorem ipsum dolor
                sit amet consectetur. Lorem velit adipiscing mattis nam. Suspendisse sit facilisis erat metus libero nisi
                volutpat turpis.
            </div> -->
        </div>
    </div>

    <!-- Empty state-->
    <EmptyState v-if="Object.keys(organization).length < 1"></EmptyState>

    <!-- Data table -->
    <Calculator v-else :organization="organization"></Calculator>
</template>

<script setup>

import { onBeforeMount, ref } from 'vue';
import EmptyState from '@/components/reusables/emptyState.vue';
import Calculator from '../components/reusables/calculator.vue';
import axios from 'axios';

import { useRoute } from 'vue-router';
const route = useRoute()

const organization = ref({});

onBeforeMount(() => {
    if (route.query.id != undefined) {
        axios.get('api/organization/show?id=' + route.query.id)
            .then((e) => {
                organization.value = e.data.data
            })
            .catch((e) => {
                console.log(e)
            })
    }
})

</script>