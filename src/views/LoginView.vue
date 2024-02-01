<template>
    <SiteNavigation/> 
    <div style="margin-top: -50px; " class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
  <div class="sm:mx-auto sm:w-full sm:max-w-sm">
    <!-- <img class="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company"> -->
    <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight" style="color: #fff;">Sign in to your account</h2>
  </div>

  <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    <form class="space-y-6" action="#" @submit.prevent="AuthenticateUser()" style="color: #fff;">
      <div>
        <label for="email" class="block text-sm font-medium leading-6">Email address</label>
        <div class="mt-2">
          <input id="email" v-model="Email" type="email" autocomplete="email" required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
        </div>
      </div>

      <div>
        <div class="flex items-center justify-between">
          <label for="password" class="block text-sm font-medium leading-6">Password</label>
          <!-- <div class="text-sm">
            <a href="#" class="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
          </div> -->
        </div>
        <div class="mt-2">
          <input id="password" v-model="Password" type="password" autocomplete="current-password"  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
        </div>
      </div>

   

      <div>
        <button type="submit" class="bg-weather-secondary flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ">Sign in</button>
      </div>
    </form>

    <p class="mt-10 text-center text-sm" style="color: #fff;">
      Don't have an account?
      <RouterLink to="/register">
        <div href="" class="font-semibold leading-6 ">Register</div>
      </RouterLink>
     
    </p>
  </div>
</div>

    <!-- <div>
        <form action="">
        <input v-model="Email" type="email" placeholder="Enter Email">
         <input v-model="Password" type="password" placeholder="Enter Password">
          <input @click="AuthenticateUser" class="cursor-pointer" type="button" value="Login">
      </form>
    </div> -->
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import SiteNavigation from "../components/SiteNavigation.vue";
import { RouterLink } from 'vue-router';

const Email = ref("");
const Password = ref("");
const router = useRouter();


const AuthenticateUser = async () => {
    try {
        const LoginDetails = {
        Email : Email.value,
        Password : Password.value,
        Browser : navigator.userAgent
        };

        const result = await axios.post("https://weather-app-5pix.onrender.com/api/login/user",LoginDetails);
        console.log(result);
        if (result.data.message == "success") {
            localStorage.setItem('token',result.data.token);
            localStorage.setItem('name',result.data.name);
           
            router.push({
                name: "home"
            })
        }
    } catch (error) {
        console.log(error);
    }
}
</script>

