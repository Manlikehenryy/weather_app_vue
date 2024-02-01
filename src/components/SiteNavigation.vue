<template>
  

  <header class="sticky top-0 bg-weather-primary shadow-lg " >

   
    <nav class="container flex flex-col sm:flex-row items-center gap-4 text-white py-6">
      <div class="fixed top-3 right-4 flex h-16 items-center justify-between">

        <div @click="toggleMenu" style="" class="absolute top-0 inset-y-0 right-0 flex items-center sm:hidden">
        <!-- Mobile menu button-->
        <button type="button" class="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
          <span class="sr-only">Open main menu</span>
          <!--
            Icon when menu is closed.

            Menu open: "hidden", Menu closed: "block"
          -->
          <svg class="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
          <!--
            Icon when menu is open.

            Menu open: "block", Menu closed: "hidden"
          -->
          <svg class="hidden h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
          <RouterLink :to="{name:'home'}">
            <div class="flex items-center gap-3">
            <i class="fa-solid fa-sun text-2xl"></i>      
            <p class="text-2xl">The Local Weather</p>
          </div>
          </RouterLink>

            
        
      

      <div class="hidden sm:ml-6 sm:block">
      <div class="flex gap-3 flex-1 justify-end mx-20">
        <i @click="toggleModal" class="fa-solid fa-circle text-xl hover:text-weather-secondary duration-150 cursor-pointer"></i>
        <i v-if="route.query.preview" @click="addCity" class="fa-solid fa-plus text-xl hover:text-weather-secondary duration-150 cursor-pointer"></i>
     </div>
    </div>
    <div class="hidden sm:ml-6 sm:block">
     <div v-if="name" class="flex gap-3 flex-1 justify-end">
      <p class="text-1xl">Hi {{ name }}</p>
     </div>
    </div>

     <div class="hidden sm:ml-6 sm:block">
      <div v-if="!token" class="flex gap-3 flex-1 justify-end">
        <RouterLink  :to="{name:'registerView'}">
        <p class="text-1xl">Register</p>
      </RouterLink>

      <RouterLink :to="{name:'loginView'}">
        <p class="text-1xl">Login</p>
      </RouterLink>
     </div>

     <div @click="logout" v-if="token" class="flex gap-3 flex-1 justify-end cursor-pointer"> 
        <p class="text-1xl">Logout</p>
     </div>
    </div>
  

     <BaseModal :modalActive="modalActive" @close-modal="toggleModal">
      <div class="text-black">
      <h1 class="text-2xl mb-1">About:</h1>
      <p class="mb-4">
            The Local Weather allows you to track the current and
            future weather of cities of your choosing.
          </p>
          <h2 class="text-2xl">How it works:</h2>
          <ol class="list-decimal list-inside mb-4">
            <li>
              Search for your city by entering the name into the
              search bar.
            </li>
            <li>
              Select a city within the results, this will take
              you to the current weather for your selection.
            </li>
            <li>
              Track the city by clicking on the "+" icon in the
              top right. This will save the city to view at a
              later time on the home page.
            </li>
          </ol>

          <h2 class="text-2xl">Removing a city</h2>
          <p>
            If you no longer wish to track a city, simply select
            the city within the home page. At the bottom of the
            page, there will be am option to delete the city.
        </p>
    </div>
    
    </BaseModal>
  <!-- Mobile menu, show/hide based on menu state. -->
  <div v-if="showMobileMenu" class="sm:hidden " id="mobile-menu">
    <div v-if="!token" class="space-y-1 px-2 pb-3 pt-2">
      <RouterLink :to="{name:'loginView'}">
        <p class="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">Login</p>
      </RouterLink>
      <RouterLink  :to="{name:'registerView'}">
        <p class="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">Register</p>
      </RouterLink>
    </div>

    <div v-if="token" @click="logout" class="space-y-1 px-2 pb-3 pt-2">
        <p class="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">Logout</p> 
    </div>
  </div>

    </nav>
  </header>
 
</template>

<script setup>
import { ref } from 'vue';
import { RouterLink, useRoute, useRouter } from 'vue-router';
import BaseModal from './BaseModal.vue';
import axios from 'axios';

let token = ref(localStorage.getItem('token')); 
let name = ref(localStorage.getItem('name'));
let showMobileMenu = ref(false)

const route = useRoute();
const router = useRouter();

const toggleMenu = () =>{
      showMobileMenu.value = !showMobileMenu.value
    }

const addCity = async () =>{
  const locationObj = {
  State: route.params.state,
  City: route.params.city,
  Lat: route.query.lat,
  Lng: route.query.lng 
}

try {
  const result = await axios.post('https://weather-app-5pix.onrender.com/api/city',locationObj,{
  headers: {
    'Authorization': `Bearer ${token.value}`
  }
});
  
  if (result.data.message == "created successfully") {
    console.log('preview')
    let query = Object.assign({}, route.query);
  delete query.preview;
  query.id = result.data.obj.id
  router.replace({query})
  alert('City added successfully');
  }
  else{
  alert(result.data.message);
  }

} catch (error) {
  console.log(error.response.data.message)
  console.log(error.response.data.validation_error)
}




}

const logout = async () =>{
  try {
    const result = await axios.get('https://weather-app-5pix.onrender.com/api/logout',{
  headers: {
    'Authorization': `Bearer ${token.value}`
  }  });

   localStorage.removeItem('token')
   localStorage.removeItem('name')
   token.value = null
   name.value = null
  //  router.push({
  //   name:"home"
  //  })
  router.push({
    name:"loginView"
   })
   
  } catch (error) {
    console.log(error.response.data)
  }
}


const modalActive = ref(null);
const toggleModal = () => {
   modalActive.value = !modalActive.value;
}
</script>
