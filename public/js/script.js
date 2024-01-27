async function onSubmit() {
    const destination = document.getElementById("destinationSelect").value
    const departDate = document.getElementById("departDate").value
    const returnDate = document.getElementById("returnDate").value
    const city = document.getElementById("citySelect").value

    const response = await fetch(`http://localhost:3000/travelAgency/search?destination=${destination}&departDate=${departDate}&returnDate=${returnDate}&city=${city}`)
    .then(res => res.json())

    console.log(response)

    emptyTours()
    for (const key in response) {
        displayTours(response[key][1])
    }
    
}

document.addEventListener("DOMContentLoaded", start())

async function start() {
    const response = await fetch('http://localhost:3000/travelAgency/tours')
    .then(res => res.json())
    console.log(response)

    for (const key in response) {
        displayTours(response[key])
    }
}

function displayTours(tours) {
    const resultHolder = document.querySelector(".results")
    
    const tourBlock = document.createElement("div")
    tourBlock.classList.add("col-lg-4", "col-md-6", "mb-4", "diplayedTour")

    tourBlock.innerHTML = `
    <div class="package-item bg-white mb-2">
        <img class="img-fluid" src="${tours.image}" alt="">
        <div class="p-4">
            <div class="d-flex justify-content-between mb-3">
                <small class="m-0"><i class="fa fa-map-marker-alt text-primary mr-2"></i>${tours.destination},${tours.city}</small>
                <small class="m-0"><i class="fa fa-calendar-alt text-primary mr-2"></i>${tours.departDate}</small>
                <small class="m-0"><i class="fa fa-calendar-alt text-primary mr-2"></i>${tours.returnDate}</small>
            </div>
            <div class="d-flex justify-content-between mb-3">
                <small class="m-0"><i class="fa fa-calendar-alt text-primary mr-2"></i>${tours.returnDate}</small>
            </div>
            <a class="h5 text-decoration-none" href="http://localhost:3000/travelAgency/singleTour/${tours.tourID}" style="color: black;">Discover amazing places of the world with us</a>
            <div class="border-top mt-4 pt-4">
                <div class="d-flex justify-content-between">
                    <h6 class="m-0"><i class="fa fa-star text-primary mr-2"></i>4.5</h6>
                    <button class="btn btn-primary" onclick="addToMyTours('${tours.tourID}')">add to MyTours</button>
                    <h5 class="m-0">$${tours.price}</h5>
                </div>
            </div>
        </div>
    </div>`
    
    resultHolder.appendChild(tourBlock)
}

async function addToMyTours(tourID) {
    try {
        await fetch(`http://localhost:3000/travelAgency/addTour/${tourID}`, {
            method: 'POST'
        });
    } catch (error) {
        console.error('Error:', error);
        alert('An unexpected error occurred. Please try again.');
    }
}


function emptyTours() {
    const results = document.querySelectorAll(".diplayedTour")

    results.forEach(element => {
        element.remove()
    })
}

var citiesByDestination = {
    "Korea": ["Seoul", "Busan", "Incheon"],
    "Japan": ["Tokyo", "Osaka", "Kyoto"],
    "Germany": ["Berlin", "Munich", "Hamburg"],
    "Kazakhstan": ["Nur-Sultan", "Almaty", "Shymkent"],
    "": [""] 
};

var destinationSelect = document.getElementById("destinationSelect");
destinationSelect.addEventListener("change", updateCityOptions);

updateCityOptions();

function updateCityOptions() {
    var citySelect = document.getElementById("citySelect");

    citySelect.innerHTML = "";

    var selectedDestination = destinationSelect.value;

    var cities = citiesByDestination[selectedDestination];

    var defaultOption = document.createElement("option");
    defaultOption.text = "Select city";
    defaultOption.value = "";
    defaultOption.disabled = false;
    defaultOption.selected = true;
    citySelect.add(defaultOption);

    for (var i = 0; i < cities.length; i++) {
        var option = document.createElement("option");
        option.value = cities[i];
        option.text = cities[i];
        citySelect.add(option);
    }
}