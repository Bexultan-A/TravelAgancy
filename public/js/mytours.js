
document.addEventListener("DOMContentLoaded", start())

async function start() {
    const response = await fetch('http://localhost:3000/mytours/tours')
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
    tourBlock.setAttribute('id',`displayedTour${tours.tourID}`)

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
                <small class="m-0"><i class="fa fa-calendar-alt text-primary mr-2"></i>Added: ${tours.dateAdded}</small>
            </div>
            <a class="h5 text-decoration-none" href="" style="color: black;">Discover amazing places of the world with us</a>
            <div class="border-top mt-4 pt-4">
                <div class="d-flex justify-content-between">
                    <h6 class="m-0"><i class="fa fa-star text-primary mr-2"></i>4.5</h6>
                    <button class="btn btn-danger" onclick="deleteTour('${tours.tourID}')">delete</button>
                    <h5 class="m-0">$${tours.price}</h5>
                </div>
            </div>
        </div>
    </div>`
    
    resultHolder.appendChild(tourBlock)
}

async function deleteTour(tourID) {

    try {
        await fetch(`http://localhost:3000/mytours/deleteTour/${tourID}`, {
            method: 'DELETE'
        });
    } catch (error) {
        console.error('Error:', error);
        alert('An unexpected error occurred. Please try again.');
    }

    
    const toDelete = document.getElementById("displayedTour"+tourID)

    toDelete.remove()
}