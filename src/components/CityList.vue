<template>
    <div v-for="city in savedCities" :key="city.id">
      <CityCard :city="city" @click="goToCityView(city)"/>
    </div>

    <p v-if="savedCities.length === 0">
    No locations added. To start tracking a location, search in the field above.
    </p>
</template>

<script setup>
  import {ref} from "vue";
  import axios from "axios"; 
  import { useRouter } from "vue-router";
  import CityCard from "./CityCard.vue";
  
   const savedCities = ref(null)
   const token = localStorage.getItem('token');

   const getSavedCities = async () =>{
    try {
    const result = await axios.get('https://weather-app-5pix.onrender.com/api/city',{
  headers: {
    'Authorization': `Bearer ${token}`
  }
});
  
    if (result.data.message=="success") {
    savedCities.value = [...result.data.cities]
    const requests = [];
    savedCities.value.forEach(city => {
      requests.push(
        axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${city.latitude}&lon=${city.longitude}&appid=486fbf09686f437b13ea4e839cfc55ee&units=imperial`)
      )
    });

    const weatherData = await Promise.all(requests);

    weatherData.forEach((value, index)=>{
      savedCities.value[index].weather = value.data;
    })
    }
   } catch (error) {
    
   }
   }
   
   if (token) {
    await getSavedCities();
   }
   else{
    savedCities.value = [];
   }
  

   const router = useRouter();
   const goToCityView = (city) =>{
     router.push({
      name:"cityView",
      params:{state: city.state, city: city.city},
      query:{id:city.id,lat:city.latitude,lng:city.longitude}
     })
   }

</script>
