"use strict"
let cities = [
    { name: "Benbrook, TX", latitude: 32.6732, longitude: -97.4606 },
    { name: "Denver, CO", latitude: 39.712179, longitude: -104.973050 },
    { name: "Portland, OR", latitude: 45.520117, longitude: -122.676683 },
    { name: "Portland, ME", latitude: 43.662093, longitude: -70.260251 },
    { name: "Fort Peck, MT", latitude: 48.00855, longitude: -106.45366 },
    { name: "Ogden, UT", latitude: 41.22037, longitude: -111.97746 },
    { name: "Plain City, UT", latitude: 41.29789, longitude: -112.09397 },
    { name: "Austin, TX", latitude: 30.2672, longitude: -97.7431 },
    { name: "Los Angeles, CA", latitude: 34.0522, longitude: -118.2437 },
    { name: "Boston, MA", latitude: 42.3601, longitude: -71.0589 }

];

window.onload = () => {
    // console.log("Wow I am working")

    let citiesDropdown = document.querySelector("#cityoptions")
    populateDropDown(citiesDropdown, cities)
    citiesDropdown.addEventListener("change", displayWeather);

}


async function displayWeather(event) {

    let selectedCity = cities.find((city) => {
        return city.name === event.target.value;
    });
    if (!selectedCity) {
        throw new Error("City not found");
    }

    let latitudeAndLongitude = `${selectedCity.latitude},${selectedCity.longitude}`
    try {
        let weatherData = await getWeatherData(latitudeAndLongitude);
        if (!weatherData || !weatherData.properties || !weatherData.properties.forecast) {
            throw new Error("Invalid weather data");
        }



        let forecastURL = weatherData.properties.forecast;
        let forecastData = await getForecastData(forecastURL);

        populateTable(forecastData.properties.periods)
    } catch (error) {
        console.log(error);
    }



}


async function getForecastData(forecastURL) {
    
    try{
        let response = await fetch(forecastURL);
        let data = await response.json();
        return data;

    } catch(error){
        throw new Error("Cant Fetch Forecast",error)
    }
   
}

// to get latitude and longitude
async function getWeatherData(latitudeAndLongitude) {

    let response = await fetch(` https://api.weather.gov/points/${latitudeAndLongitude}`);
    let data = await response.json()
    return data;
}
// get the table
function populateTable(information) {
    let tablebody = document.querySelector("#tableBody")
    tablebody.innerHTML="";

    information.forEach(info =>{
        let row = tablebody.insertRow();
        row.insertCell(0).textContent =info.name;
        row.insertCell(1).textContent =`${info.temperature}${info.temperatureUnit}`;
        row.insertCell(2).textContent =`${info.windDirection}  ${info.windSpeed}`;
        row.insertCell(3).textContent =info.shortForecast;
    })
    
}
// get the options on the dropdwn and adding a default
function populateDropDown(drowpdown, ) {
    let defaultOption = document.createElement("option");
    defaultOption.textContent = "Select a City";
    defaultOption.value = ""

    drowpdown.appendChild(defaultOption);

    cities.forEach((city) => {

        let newCity = document.createElement("option");
        newCity.textContent = city.name;
        newCity.value = city.name;

        drowpdown.appendChild(newCity);
    })


}





