const weather = document.querySelector(".js-weather");


const API_KEY = "7e0a26ab917f89c16c51112eb981e357";
const COORDS = 'coords'; 

function getWeather(lat,lng) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
    ).then(function(response){
     return response.json();
    }).then(function(json){
       const temperature = json.main.temp;
       const place = json.name;
       weather.innerText = `${temperature} @ ${place}`;
    });
}

function saveCoord(coordsObj) {
    localStorage.setItem(COORDS,JSON.stringify(coordsObj));
}


function handleGeoSucces(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,
        longitude
    };
    saveCoord(coordsObj);
    getWeather(latitude,longitude);
}

function handleGeoError(position){
    console.log("위치를 읽을 수 없습니다.")
}

function askForCoords() {
    navigator.geolocation.getCurrentPosition(handleGeoSucces,handleGeoError)
}

function loadCoords() {
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords === null) {
        askForCoords();
    } else {
    const parseCoords = JSON.parse(loadedCoords);
    getWeather(parseCoords.latitude,parseCoords.longitude);

    }
}


function init (){
    loadCoords();
}


init();