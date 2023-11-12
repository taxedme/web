<template>
    <div class="grid lg:grid-cols-2 w-full">
        <div class="hidden  lg:grid place-content-center place-items-center px-[108px] bg-[#ECEDF2]">
            <img class="w-[50%]" src="/images/frame.png">

            <div class="">
                <h1>Welcome</h1>
                <p>
                    Lorem ipsum dolor sit amet consectetur. Lorem velit adipiscing mattis nam. Suspendisse sit facilisis
                    erat metus libero nisi volutpat turpis.
                </p>
            </div>
        </div>
        <form @submit.prevent="login()" class=" flex flex-col justify-center lg:px-[108px] md:px-24 px-4 lg:gap-[40px] gap-[30px]">

            <div class="grid lg:gap-[60px] gap-[40px]">
                <div>
                    <img class="w-[30%]" src="/images/logo.png">
                </div>

                <div class="grid gap-[14px]">
                    <h1 class="text-indigo-900 text-5xl font-semibold">Sign In</h1>
                    <span class=" font-semibold">Already have an account?
                        <router-link :to="{ name: 'signup' }" class="text-red-600 text-xl font-semibold">
                            Sign Up
                        </router-link>
                    </span>
                </div>
            </div>

            <div class="grid gap-[24px]">
                <div class="grid">
                    <label>Email Address</label>
                    <input v-model="form.email" type="email" class="p-2 rounded-md border border-[#D3D0D0] bg-[#eeeded]">
                </div>

                <div class="grid">
                    <label>Password</label>
                    <input v-model="form.password" type="password"
                        class="p-2 rounded-md border border-[#D3D0D0] bg-[#eeeded]">
                </div>

            </div>

            <button
                class="uppercase cursor-pointer bg-[#302E81] w-full h-fit p-2 rounded-md placeholder border border-gray-200 text-white text-center">
                SIGN IN
            </button>
        </form>
    </div>
</template>

<script setup>
import axios from 'axios'
import { ref } from 'vue';

const form = ref({})

function login() {
    axios.post('api/login', form.value, { progress: true })
        .then((e) => {
            location.href = import.meta.env.VITE_APP_URL;
        })
        .catch((e) => {
            console.log(e)
        })
}

</script>