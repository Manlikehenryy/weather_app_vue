<template>
    <SiteNavigation/> 
    <div>
     <Suspense>
        <AsyncCityView/>

        <template #fallback>
         <p class="text-white text-center m-20">Loading...</p>
        </template> 
     </Suspense>
    </div>
</template>

<script setup>
import AsyncCityView from '../components/AsyncCityView.vue';
import SiteNavigation from "../components/SiteNavigation.vue";

</script>

