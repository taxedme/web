<template>
    <div class="justify-start items-start gap-[25px] flex flex-wrap">
        <div
            class="hover:bg-gray-300 px-[15px] pt-[17px] pb-[16px] bg-white  rounded-xl border border-stone-300 justify-start items-center flex cursor-pointer">
            <div class="flex-col justify-start items-start gap-[25px] inline-flex">

                <div class=" justify-between items-start gap-[86px] flex ">
                    <div
                        class="text-white text-2xl font-semibold font-['General Sans'] bg-[#6D88F9] p-[10px] rounded-[5px]">
                        <home-box-icon></home-box-icon>
                    </div>

                    <div
                        class="leading-[21px]  text-[#FF331F] text-[15px] font-[400] font-['General Sans'] bg-[#FF331F0F] py-[4px] px-[10px] rounded-full border border-[#FF331F] ">
                        Basic: 3 company
                    </div>
                </div>

                <div class="w-full flex justify-between flex-col">
                    <h1 class="text-[20px]">
                        Company used
                    </h1>

                    <h1 class="text-[48px]">
                        3
                    </h1>

                </div>
            </div>
        </div>


        <div
            class="hover:bg-gray-300 px-[15px] pt-[17px] pb-[16px] bg-white  rounded-xl border border-stone-300 justify-start items-center flex cursor-pointer">
            <div class="flex-col justify-start items-start gap-[25px] inline-flex">

                <div class=" justify-between items-start gap-[86px] flex ">
                    <div
                        class="text-white text-2xl font-semibold font-['General Sans'] bg-[#6D88F9] p-[10px] rounded-[5px]">
                        <home-list-icon></home-list-icon>
                    </div>

                    <div
                        class="leading-[21px]  text-[#FF331F] text-[15px] font-[400] font-['General Sans'] bg-[#FF331F0F] py-[4px] px-[10px] rounded-full border border-[#FF331F] ">
                        Basic: 3 company
                    </div>
                </div>

                <div class="w-full flex justify-between flex-col">
                    <h1 class="text-[20px]">
                        Company used
                    </h1>

                    <h1 class="text-[48px]">
                        3
                    </h1>

                </div>
            </div>
        </div>



        <div
            class="hover:bg-gray-300 pl-[15px] pr-[70px] pt-[17px] pb-[16px]  rounded-xl border border-stone-300 justify-start items-center flex cursor-pointer relative  bg-[url('/images/premium.png')] bg-cover xl:h-full lg:h-fit h-fit">
            <div class="flex-col justify-start items-start gap-[12px] inline-flex">

                <div class=" justify-between items-start gap-[86px] flex ">
                    <div
                        class="w-fit leading-[21px]  text-[#003CBF] text-[15px] font-[400] font-['General Sans'] bg-white py-[4px] px-[10px] rounded-full ">
                        Premium
                    </div>
                </div>

                <div class="w-full flex justify-between flex-col gap-[24px]">
                    <h1 class="text-[14px] w-[306px]">
                        orem ipsum dolor sit amet consectetur. Lorem velit adipiscing mattis nam. Suspendisse sit facilisis
                        erat metus libero nisi volutpat turpis.
                    </h1>

                    <div
                        class=" w-fit leading-[21px]  text-white text-[15px] font-[400] font-['General Sans'] bg-[#273469] py-[8px] px-[27px] rounded-[5px] ">
                        Upgrade Plan
                    </div>

                </div>
            </div>
        </div>
    </div>

    <div class=" mt-[40px] flex flex-col gap-[24px]">

        <h1 class="text-[24px] font-[600]">
            Recent Drafts
        </h1>

        <div v-if="drafts.length > 0" class="relative overflow-x-auto bg-white p-[13px] rounded-md">
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" class="px-6 py-3">
                            Name
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Employees
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Category
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Price
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            Apple MacBook Pro 17"
                        </th>
                        <td class="px-6 py-4">
                            Silver
                        </td>
                        <td class="px-6 py-4">
                            Laptop
                        </td>
                        <td class="px-6 py-4">
                            $2999
                        </td>
                    </tr>
                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            Microsoft Surface Pro
                        </th>
                        <td class="px-6 py-4">
                            White
                        </td>
                        <td class="px-6 py-4">
                            Laptop PC
                        </td>
                        <td class="px-6 py-4">
                            $1999
                        </td>
                    </tr>

                </tbody>
            </table>
        </div>

        <div v-else >
            <EmptyState></EmptyState>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';


import EmptyState from '@/components/reusables/emptyState.vue';
import homeBoxIcon from '@/components/icons/home-box-icon.vue';
import homeListIcon from '@/components/icons/home-list-icon.vue';


const drafts = ref(['ee'])
</script>