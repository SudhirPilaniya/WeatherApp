const Api_key = '00c49e0824dec1f44bc4699387198fc8'

const makeIconURL = (iconId)=>` http://openweathermap.org/img/wn/${iconId}@2x.png`

const getformateddata=async (city,units='matric')=>{
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${Api_key}&units=${units}`
    const data = await  fetch(URL).then((resp)=>resp.json()).then((data)=>data);
  
    const {
        weather,
        main:{temp,feels_like,temp_min,temp_max,pressure,humidity},
        wind:{speed},
        sys:{country},
        name
    }=data;
    
    const {description,icon}=weather[0];
    return{
        description,iconURL:makeIconURL(icon) ,temp,temp_min,temp_max,feels_like,pressure,humidity,speed,country,name
    }
}

export default getformateddata;