<template>
    <section class="  space-y-6 py-7 px-2 relative inset-y-0 left-0 transform -translate-x-full  md:translate-x-0 transition duration-200 ease-in-out bg-white w-[18%] flex flex-col gap-16  ">
        <div class="flex justify-center text-black gap-2 ">
            <img src="/favicon.ico">
            <span>textme</span>
        </div>


        <ul class=" text-[#AFAFAF] text-[16px]  font-[500]  flex flex-col gap-8">


            <router-link @click="swap('home')" :id="page == 'home' ? 'active' : ''" :to="{ name: 'home' }"
                class="grid grid-cols-5 items-center gap-6 px-[29px] py-3 hover:bg-[#25d3653a] ">
                <DashboardIcon></DashboardIcon>
                <div class="col-span-4 text-[12px]">Dashboard</div>
            </router-link>

            <router-link @click="swap('company')" :id="page == 'company' ? 'active' : ''" :to="{ name: 'company' }"
                class="grid grid-cols-5 items-center gap-6 px-[29px] py-3 hover:bg-[#25d3653a] ">
                <companyIcon></companyIcon>
                <div class="col-span-4 text-[12px]">Company</div>
            </router-link>


        </ul>

    </section>
</template>

<script setup>
import DashboardIcon from '@/components/icons/dashboard-icon.vue';
import companyIcon from '@/components/icons/company-icon.vue';
import { ref } from 'vue';

const page = ref('home')

function swap(p) {
    page.value = p
}

</script>

<style scoped>
#active {
    background: linear-gradient(257deg, #ECEFF8 19.22%, rgba(245, 245, 245, 0.00) 87.97%, rgba(245, 245, 245, 0.00) 87.97%);
}
</style>