<template>
    <SiteNavigation/> 
  
  <main class="container text-white">
    <div class="pt-4 mb-8 relative">
      <input
        type="text"
        v-model="searchQuery"
        @input="getSearchResults"
        placeholder="Search for a city or state"
        class="py-2 px-1 w-full bg-transparent border-b focus:border-weather-secondary focus:outline-none focus:shadow-[0px_1px_0_0_#004E71]"
      />

      <ul
        class="absolute bg-weather-secondary text-white w-full shadow-md py-2 px-1 top-[66px]"
        v-if="mapboxSearchResults"
      >
        <p class="py-2" v-if="searchError">
          Sorry, something went wrong, please try again.
        </p>
        <p
          class="py-2"
          v-if="!searchError && mapboxSearchResults.length === 0"
        >
          No results match your query, try a different term.
        </p>
        <template v-else>
          <li
            v-for="searchResult in mapboxSearchResults"
            :key="searchResult.id"
            class="py-2 cursor-pointer"
            @click="previewCity(searchResult)"
          >
            {{ searchResult.place_name }}
          </li>
        </template>
      </ul>
    </div>

    <div  class="flex flex-col gap-4"></div>
    <Suspense>
      <CityList/>
      <template #fallback>
        <p v-if="token" class="text-center my-20">Loading...</p>
      </template>
    </Suspense>
  </main>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios'
import {useRouter} from 'vue-router';
import CityList from '../components/CityList.vue';
import SiteNavigation from "../components/SiteNavigation.vue";
// import SiteNavigation from "../components/temp.vue";


const router = useRouter();
const token = ref(localStorage.getItem('token'));

const previewCity = (searchResult) => {
  const [city, state] = searchResult.place_name.split(",");
 
  if (token.value) {
    router.push({
    name: "cityView",
    params: {state:state.replaceAll(" ",""), city:city.replaceAll(" ","")},
    query:{
      city: city,
      country: searchResult.context[2]?.short_code ?? searchResult.context[1].short_code,
      lat: searchResult.geometry.coordinates[1],
      lng: searchResult.geometry.coordinates[0],
      preview: true,
    }
  })
  }
  else{
    router.push({
            name: "loginView"
        })
  }
};

const searchQuery = ref("");
const queryTimeout = ref(null);
const mapboxAPIKey = "pk.eyJ1IjoibWFubGlrZWhlbnJ5IiwiYSI6ImNsaTZ3aGs4MDNnMHUzbG13eWd2eDY1M28ifQ.THArHidsV2xYohW8zgd1KA"
const mapboxSearchResults = ref(null);
const searchError = ref(null);

const getSearchResults = () =>{
  clearTimeout(queryTimeout.value );
  
  try {
    queryTimeout.value = setTimeout(async ()=>{
    if (searchQuery.value != "") {
      const result = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${searchQuery.value}.json?access_token=${mapboxAPIKey}&types=place`);
      mapboxSearchResults.value = result.data.features;
      return
    }
    mapboxSearchResults.value = null;
  },300)
  } catch (error) {
    searchError.value = true;
  }
}
</script>

