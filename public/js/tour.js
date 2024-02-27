document.addEventListener("DOMContentLoaded", setTourInfo())

async function setTourInfo() {
    const currentUrl = window.location.href;

    const urlParts = currentUrl.split('/');


    const tourID = urlParts[5]

    const response = await fetch(`/travelAgency/getTourDetails/${tourID}`)
    .then(res => res.json())

    displayTourInfo(response)
    getWeatherInfo(response)
}

async function getWeatherInfo(tour) {
    const response = await fetch(`/travelAgency/api/weather/${tour.city}`)
    .then(res => res.json())

    console.log(response)
    displayWeather(response)
}

function displayWeather(weather) {
    const resultHolder = document.querySelector(".weatherHolder")
    
    const weatherBlock = document.createElement("div")
    weatherBlock.classList.add("mt-4")

    weatherBlock.innerHTML = `
    <h5>Weather</h5>
            <p class="mb-2">Current temperature: <strong>${weather.current.temp_c}°C</strong></p>
            <p>Feels like: <strong>${weather.current.feelslike_c}°C</strong></p>
            <p>Humidity: <strong>${weather.current.humidity}%</strong></p>

            <div class="d-flex flex-row align-items-center">
            <p class="mb-0 me-4">Scattered Clouds</p>
            </div>
    
    `


    resultHolder.appendChild(weatherBlock)
}


function displayTourInfo(tour) {
    const resultHolder = document.querySelector(".resultHolder")
    
    const tourBlock = document.createElement("div")
    tourBlock.classList.add("displayedTour", "row")

    tourBlock.innerHTML =
    `<div class="col-lg-6" style="min-height: 500px;">
    <div class="position-relative h-100">
            <img class="position-absolute w-100 h-100" src="${tour.image}" style="object-fit: cover;">
        </div>
    </div>
    <div class="col-lg-6 pt-5 pb-lg-5">
        <div class="about-text bg-white p-4 p-lg-5 my-lg-5">
        <h6 class="text-primary text-uppercase" style="letter-spacing: 5px;">${tour.destination}</h6>
        <h3 class="mb-3">${tour.city}</h3>
        <div class="row justify-content-between mx-1">
            <small class="m-0"><i class="fa fa-calendar-alt text-primary mr-2"></i>${tour.departDate}</small>
            <i class="fa fa-angle-double-right pt-1 px-3"></i>
            <small class="m-0"><i class="fa fa-calendar-alt text-primary mr-2"></i>${tour.returnDate}</small>
        </div>
        <div class="container-fluid col-12 mt-4">
            <div class="row justify-content-between">
                <div class="col-4">
                    <div class="row">
                        <h6>Adults</h6>
                        <input type="number" id="adultNumber" class="form-control" />
                    </div>
                </div>
                <div class="col-4">
                    <div class="row">
                        <h6>Children</h6>
                        <input type="number" id="childrenNumber" class="form-control" />
                    </div>
                </div>
            </div>
        </div>
        <div class="weatherHolder">
        </div>
        <div class="container-fluid col-12 mt-5">
            <div class="row justify-content-between">
                <h4 class="col-6" id="priceHolder">Price: ${tour.price} per person</h1>
                <button onclick="calculatePrice('${tour.tourID}')" class="btn btn-primary col-4">Calculate Price</button>
            </div>
        </div>
    </div>
    </div>`

    

    resultHolder.appendChild(tourBlock)
}

async function calculatePrice(tourID) {
    const tour = await fetch(`/travelAgency/getTourDetails/${tourID}`)
    .then(res => res.json())

    const adults = document.getElementById('adultNumber').value
    const children = document.getElementById('childrenNumber').value

    const price = parseFloat(tour.price)*adults + parseFloat(tour.price)*children*0.5
    
    console.log(tour.price)

    document.getElementById('priceHolder').textContent = `Price: $${price}`
}