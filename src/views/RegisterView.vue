<template>
    <SiteNavigation/> 
    <div style="margin-top: -50px;" class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
  <div class="sm:mx-auto sm:w-full sm:max-w-sm">
    <!-- <img class="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company"> -->
    <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight" style="color: #fff;">Create an account</h2>
  </div>

  <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    <form class="space-y-6" action="#" @submit.prevent="RegisterUser()" style="color: #fff;">
      

        <div>
        <label for="first name" class="block text-sm font-medium leading-6">First Name</label>
        <div class="mt-2">
          <input id="" v-model="Firstname" name="" type="text" autocomplete="first name" required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
        </div>
      </div>

      <div>
        <label for="last name" class="block text-sm font-medium leading-6">Last Name</label>
        <div class="mt-2">
          <input id="" v-model="Lastname" name="" type="text" autocomplete="last name" required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
        </div>
      </div>

      <div>
        <label for="email" class="block text-sm font-medium leading-6">Email address</label>
        <div class="mt-2">
          <input id="email" v-model="Email" name="email" type="email" autocomplete="email" required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
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
          <input id="password" v-model="Password" name="password" type="password" autocomplete="current-password"  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
        </div>
      </div>

      <div>
        <div class="flex items-center justify-between">
          <label for="password" class="block text-sm font-medium leading-6">Confirm Password</label>
          <!-- <div class="text-sm">
            <a href="#" class="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
          </div> -->
        </div>
        <div class="mt-2">
          <input id="password" v-model="ConfirmPassword" name="" type="password" autocomplete="current-password"  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
        </div>
      </div>

      <div>
        <button type="submit"  class="bg-weather-secondary flex w-full justify-center rounded-md  px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">Sign up</button>
      </div>
    </form>

   
  </div>
</div>

  
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import SiteNavigation from "../components/SiteNavigation.vue";

const router = useRouter();
const Firstname = ref("");
const Lastname = ref("");
const Password = ref("");
const Email = ref("");
const ConfirmPassword = ref("");



const RegisterUser = async () =>{
    const UserDetails = {
        Firstname : Firstname.value,
        Lastname : Lastname.value,
        Password : Password.value,
        Email    : Email.value,
        ConfirmPassword : ConfirmPassword.value
    }
    try {
     const response = await axios.post("https://weather-app-5pix.onrender.com/api/register/user",UserDetails)
    
     if (response.data.message="success") {
        router.push({
            name: "loginView"
        })
     }
    } catch (error) {
        console.log(error)
        // if (error.response.data.message.substring(54,69) == "Duplicate entry") {
        //     const message = "Email already exists";
        // }
        // else if(error.response.data.validation_error){
        //     const errors = error.response.data.validation_error;
        // }
        // else{
        //     const message = error.response.data.message;
        // }
    }
   
}



</script>

