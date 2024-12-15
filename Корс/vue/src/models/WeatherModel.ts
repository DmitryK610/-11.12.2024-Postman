export class Weather
{
    id:number;
    main:string;
    description:string;
    icon:string;
}
export class WeatherResponse
{
    weather: Weather[];
    main:{
        temp:number;
        pressure: number;
        humidity:number;
    };
    name:string;
}