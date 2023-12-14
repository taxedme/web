<template>
    <div v-if="open" class="bg-[#0000007c] fixed top-0 w-full h-full right-0 z-[100] grid place-content-center">
        <div
            class=" border border-gray-200 right-0 bottom-0 h-fit bg-white py-[30px] px-[30px] rounded-md grid place-items-center text-center gap-[24px]">
            <trash-icon :height="60" :width="60" class="mb-[40px]" ></trash-icon>
            <div>
                <span class="text-[24px] font-[600] text-[#FF331F]">Delete Company?</span>
                <h1 class="w-[318px]">Deleting your company will result loosing all tax calculations.</h1>
            </div>

            <div class="flex justify-evenly gap-[24px]">
                <div @click="$emit('accept')"
                    class="cursor-pointer text-[#FF331F] text-[16px] font-[400] font-['General Sans'] bg-[#F8E3E1] px-[27px] py-[8px] rounded-[5px] flex items-center gap-2">
                    <span>Yes, Delete company</span>
                </div>

                <div @click="$emit('cancel')"
                    class=" cursor-pointer text-[#30343F] text-[16px] font-[400] border border-[#30343F] bg-white px-[27px] py-[8px] rounded-[5px] flex items-center gap-2">
                    <span>No, Cancel</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import trashIcon from '@/components/icons/trash-icon.vue';

defineProps(['open'])

</script>