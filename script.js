let apiKey = 'f274aa17d58eaac7268f043a704333a6',

setWeather = function (city) {
    fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
    )
    .then((response) => response.json())
    .then((data) => setVarsAndDisplay(data));
},

setVarsAndDisplay = function(data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;
    console.log(name, icon, description, temp, humidity, speed); 

    const tempInFar = kelvinToFar(temp);

    document.getElementById('city').innerHTML = `Weather in ${name}:`
    document.getElementById('temp').innerHTML = `Temperature: ${tempInFar}°F`
    document.getElementById('conditions').innerHTML = `Current conditions: ${description}`
}


function search() {
    let cityQueue = document.getElementById('city-search').value
    console.log(cityQueue);
    setWeather(cityQueue);
    
}

function kelvinToFar(kelvin) {
    let far = kelvin - 273.15;
    far *= 1.8;
    far += 32;
    far = Math.ceil(far);
    return far;
}


setWeather('New York City');