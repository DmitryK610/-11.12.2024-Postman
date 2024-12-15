<template>
    <div v-if="weather">
        <h1>Погода в {{  weather.name }}</h1>
        <p>Температура: {{ weather.main.temp }} Цельсия</p>
        <p>Влажность: {{ weather.main.humidity }} %</p>
        <p>Давление: {{ weather.main.pressure }} ММРТС</p>
        <p>Состояние: {{ weather.weather[0].description }} ММРТС</p>
        <img :src="'http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png'" alt="Weather Icon" />
    </div>
    <div v-else>
        <p>Loading...</p>
    </div>
</template>
<script lang="ts">
import { defineComponent, onMounted,ref } from 'vue';
import { getWeatherByLocation } from '@/stores/WeatherStore';
import { WeatherResponse} from '@/models/WeatherModel';
import { from } from 'rxjs';
import {switchMap} from 'rxjs/operators';
import axios from 'axios';
export default defineComponent({
    name:'WeatherComponent',
    setup(){
        const weather = ref<WeatherResponse | null >(null);
        const getCurrentLocation =()=>{
            return new Promise<GeolocationCoordinates>((resolve,reject)=>{
                if(navigator.geolocation){
                    navigator.geolocation.getCurrentPosition(resolve,reject);
                }else{
                    reject(new Error('Geolocation is not supported by this browser'))
                }
            });
        };
        onMounted(()=>{
            from(getCurrentLocation()).pipe(
                switchMap((position)=>{
                    return getWeatherByLocation(position.latitude,position.longitude)
                })
            ).subscribe({
                next:(data)=> {
                    weather.value= data;
                },
                error:(err)=>{
                    console.log('Error fetching weather data:',err);
                }
            });

        });
        return {weather};
    },
    
});
</script>
