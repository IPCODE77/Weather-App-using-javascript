let brand_img = document.getElementById('brand_img')

let images = ['image/day.svg','image/cloudy-day-2.svg','image/thunder.svg','image/rainy-1.svg','image/snowy-2.svg','image/cloudy-night-3.svg','image/night.svg']

let index=0;
function changeimg(){
    brand_img.src = images[index]
    index >5 ? index=0 :index++
    
}

window.onload = async function(){
    setInterval(() => {
        brand_img.classList.add('hide')
        brand_img.classList.remove('active')
        setTimeout(() => {
            brand_img.classList.add('active')
            brand_img.classList.remove('hide')
            
            changeimg()
        }, 500);

    }, 3000);
    await checkweather('delhi')
}

    // let d = new Date()
        // console.log(d.toString())
// 

//     <div class="spinner-border text-light" role="status">
//   <span class="visually-hidden">Loading...</span>
// </div>

// for fetch
let searchbtn = document.getElementById('search_icon');
let spinner = document.getElementById('spinner');
let animated_box = document.querySelector('.animate');
let input_val = document.getElementById('search');
let cityname = document.getElementById('city_name'),
feels_like = document.getElementById('feel'),
temp_val = document.getElementById('temp'),
humidity = document.getElementById('humidity'),
max_temp = document.getElementById('max_temp'),
min_temp = document.getElementById('min_temp'),
wind_spd = document.getElementById('wind_spd'),
sun_rise = document.getElementById('sunrise'),
sun_set = document.getElementById('sunset'),
cr_time = document.getElementById('cr_time'),
current_temp = document.getElementById('temp_val');

setInterval(() => {
    let time = new Date();
    cr_time.innerText = time.toLocaleTimeString()
    cr_time.style.fontSize='20px'
    
}, 100);

// window.onload = async function(){
//     await checkweather('delhi')
// }


searchbtn.addEventListener('click',()=>{
    animated_box.classList.add('mute')
    
    if(input_val.value!=''){
        checkweather(input_val.value)
        spinner.innerHTML = `<div class="spinner-border text-light" role="status">
           <span class="visually-hidden">Loading...</span>
         </div>`

    }
    else{
        spinner.innerHTML = `<div class="alert alert-danger d-flex align-items-center" role="alert">
        <div>
          Please Enter City Name
        </div>`
        setTimeout(() => {
            spinner.innerHTML = ``
        }, 2000);

    }
     


})

async function checkweather(value){
    return new Promise((resolve,reject)=>{
        
        const options = {
            method: 'GET',
        	headers: {
                'X-RapidAPI-Key': 'a5355a0cb7msh55fea16fbef29a6p171752jsna4882a78051b',
        		'X-RapidAPI-Host': 'weather-by-api-ninjas.p.rapidapi.com'
        	}
        };
        
        let check_weather = fetch(`https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=${value}`, options)
        check_weather.then((value1)=>{
            return value1.json()
        }).then((val2)=>{
            if(!val2.error){
            resolve(true)
            animated_box.classList.remove('mute')
            spinner.innerHTML = ''
            temp_val.innerText = `${val2.temp}°C`
            feels_like.innerText = `${val2.feels_like}°C`
            cityname.innerText = value
            cityname.style.textTransform= 'capitalize'
            current_temp.innerText = `${val2.temp}°C`
            humidity.innerText = val2.humidity
            max_temp.innerText =  `${val2.max_temp}°C`
            min_temp.innerText = `${val2.min_temp}°C`
            wind_spd.innerText = `${val2.wind_speed}km/h`
            let sun_rise = new Date(val2.sunrise)
            let sun_set = new Date(val2.sunset)
            animated_box.classList.remove('mute')

            
        }
        else{
            animated_box.classList.add('mute')
            spinner.innerHTML = `<div class="alert alert-danger d-flex align-items-center" role="alert">
            <div>
              Please Enter Correct City Name
            </div>`
            setTimeout(() => {
                spinner.innerHTML = ``
            }, 3000);
            

        }
            
            

            
        }).catch((x)=>{
            // console.log('error');

            
        })
        
        
    })
    }
