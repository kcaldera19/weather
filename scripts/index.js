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
    citiesDropdown.addEventListener("change", getLocation);
    // https://api.weather.gov/points/{latitude},{longitude}
}
async function getLocation(latitude, longitude) {
    try {
        let getLocation = document.getElementById("cityoptions");
        let response = await fetch(`https://api.weather.gov/points/32.6791,-97.4641`)
        if (!response.ok) {
            throw new Error("could not fetch resources");
        }

        let data = await response.json();


        let result = document.getElementById("results");
       


    }
    catch (error) {
        console.error(error)

    }
}


function initCitiesDropdown() {

    let citiesDropdown = document.querySelector("#cityoptions");

    cities.forEach((city) => {

        let newCity = document.createElement("option");
        newCity.value = city.name;

        newCity.textContent = city.name;
        citiesDropdown.appendChild(newCity);
    })


}