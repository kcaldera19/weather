"use strict"
let cities = [
    { name: "Benbrook, TX", latitude: 32.6732, longitude: -97.4606 },
    { name: "Denver, CO", latitude: 39.712179, longitude: -104.973050 },
    { name: "Portland, OR", latitude: 45.520117, longitude: -122.676683 },
    { name: "Portland, ME", latitude: 43.662093, longitude: -70.260251 },
    { name: "Fort Peck, MT", latitude: 48.00855, longitude: -106.45366 },
    { name: "Ogden, UT", latitude: 41.22037, longitude: -111.97746 },
    { name: "Plain City, UT", latitude: 41.29789, longitude: -112.09397 }

];

window.onload = () => {
    // console.log("Wow I am working")
    initCitiesDropdown();
    let citiesDropdown = document.querySelector("#cityoptions")
    citiesDropdown.addEventListener("change",displayWeather );

}
async function displayWeather(event) {

    let selectedCity  = cities.find((city)=>{
        return city.name === event.target.value;
    })
    if(!selectedCity){
        throw new Error("City not found");
    }

    let latitudeAndLongitude =`${selectedCity.latitude},${selectedCity.longitude}`

    let weatherData = await getWeatherData(latitudeAndLongitude);
    let forecast = await getForecastData(weatherData.properties.forecast);

    populateTable(forecast.properties.period)



}
function populateTable(data){
    console.log(data);
}

async function getWeatherData(latitudeAndLongitude){
    let response = await fetch (` https://api.weather.gov/points/${latitudeAndLongitude}`);
    let data = await response.json()
    return data;
}



function initCitiesDropdown() {

    let citiesDropdown = document.querySelector("#cityoptions");

    cities.forEach((city) => {

        let newCity = document.createElement("option");
        newCity.textContent = city.name;
        newCity.value = city.name;
                
        citiesDropdown.appendChild(newCity);
    })


}