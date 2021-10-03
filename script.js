let apiKey = 'f274aa17d58eaac7268f043a704333a6';
let locationInput = document.getElementById('city-search');
let deetsPlus = "string";
let loadingIcon = document.getElementById('loading');
let locError = document.getElementById('loc-error');
let nameCorrection = "string";
let today = new Date();
let bgImage = document.getElementById('content');
let time = today.getHours();
console.log(time);

const nightHours = [20, 21, 22, 23, 24, 1, 2, 3, 4, 5, 6, 7];

if (nightHours.includes(time)) {
    console.log('night');
    bgImage.setAttribute('class', 'nightBg');
} else {
    console.log('day');
    bgImage.setAttribute('class', 'dayBg');
}

let searchMethod = 1;
//search method: 1=manual, 2=coords;

locationInput.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
      search()
    }
  }); 

let weather = {

    setWeather: function (city) {
        loadingIcon.style.opacity = '100%'
        inCaseErrorLoadingGIF()
        searchMethod = 1;
        fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
        )
        .then((response) => response.json())
        .then((data) => this.setVarsAndDisplay(data));
    },

    setWeatherByCoords: function (lat, long) {
        searchMethod = 2;
        loadingIcon.style.opacity = '100%'
        inCaseErrorLoadingGIF()
        fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}`
        )
        .then((response) => response.json())
        .then((data) => this.setVarsAndDisplay(data));
    },
    
    setVarsAndDisplay: function(data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, feels_like, humidity } = data.main;
        const { speed } = data.wind;
        console.log(name, icon, description, temp, humidity, speed); 
    
        const tempInFar = this.kelvinToFar(temp);
        const feelsLikeTempInFar = this.kelvinToFar(feels_like);
        deetsPlus = rewriteDeets(description);

        if (searchMethod === 2) {
            nameCorrection = `${name} County`;
        } else if (searchMethod === 1) {
            nameCorrection = name;
        }

        document.getElementById('city').innerHTML = `${nameCorrection}`
        document.getElementById('temp').innerHTML = `${tempInFar}°F | ${deetsPlus}`
        document.getElementById('conditions').innerHTML = ``
        loadingIcon.style.opacity = '0%'
    },
       
    kelvinToFar: function(kelvin) {
        let far = kelvin - 273.15;
        far *= 1.8;
        far += 32;
        far = Math.round(far);
        return far;
    },   

}

function search() {
    let cityQueue = document.getElementById('city-search').value
    console.log(cityQueue);
    weather.setWeather(cityQueue);
    
}

function getByCoords() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(coordsCallSearch);
    } else {
        locError.style.opacity = "100%";
        setTimeout(function () {
            locError.style.opacity = "0%";
        }, 5000);
    }
}

function coordsCallSearch(position) {
    console.log(position.coords.latitude);
    console.log(position.coords.longitude);
    weather.setWeatherByCoords(position.coords.latitude, position.coords.longitude);
}

function rewriteDeets (desc) {
    let output;
    switch (desc) {
        case "clear sky":
            output = 'Clear';
            break;
        case 'few clouds':
            output = 'Few Clouds';
            break;
        case 'scattered clouds':
            output = 'Partly Cloudy';
            break;
        case 'broken clouds':
            output = 'Cloudy';
            break;
        case 'shower rain':
            output = 'Drizzle';
            break;
        case 'rain':
            output = 'Rain';
            break;
        case 'thunderstorm':
            output = 'Thunderstorm';
            break;
        case 'snow':
            output = 'Snow';
            break;
        case 'mist':
            output = 'Fog';
            break;
        default:
            output = desc;
            break;
    }
    return output;
}

function inCaseErrorLoadingGIF() {
    setTimeout(function () {
        loadingIcon.style.opacity = "0%"
    }, 5000);
}



getByCoords();