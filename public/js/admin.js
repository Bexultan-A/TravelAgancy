
document.addEventListener("DOMContentLoaded", start())

async function start() {
    const response = await fetch('http://localhost:3000/admin/tours')
    .then(res => res.json())
    console.log(response)

    for (const key in response) {
        displayTours(response[key])
    }
}

function displayTours(tours) {
    const resultHolder = document.querySelector(".listOfTours")
    
    const tourBlock = document.createElement("tr")
    tourBlock.classList.add("diplayedTour")

    tourBlock.innerHTML = `
    <td><input type="text" class="form-control" id="destination${tours.tourID}" value="${tours.destination}"></td>
    <td><input type="text" class="form-control" id="city${tours.tourID}" value="${tours.city}"></td>
    <td><input type="text" class="form-control" id="departDate${tours.tourID}" value="${tours.departDate}"></td>
    <td><input type="text" class="form-control" id="returnDate${tours.tourID}" value="${tours.returnDate}"></td>
    <td><input type="text" class="form-control" id="price${tours.tourID}" value="${tours.price}"></td>
    <td><input type="text" class="form-control" id="image${tours.tourID}" value="${tours.image}"></td>
    <td>
        <button class="btn btn-primary text-white px-3 me-3" 
        onclick="updateTour('${tours.tourID}')">Update</button>
        <button class="btn btn-danger" onclick="deleteTour('${tours.tourID}')">Delete</button>
    </td>
    `
    
    resultHolder.appendChild(tourBlock)
}


async function addTour() {
    const destination = document.getElementById("destination").value
    const departDate = document.getElementById("departDate").value
    const returnDate = document.getElementById("returnDate").value
    const city = document.getElementById("city").value
    const price = document.getElementById("price").value
    const image = document.getElementById("image").value

    
    await fetch(`http://localhost:3000/admin/addTour?destination=${destination}&departDate=${departDate}&returnDate=${returnDate}&city=${city}&price=${price}&image=${image}`, {
        method: "POST"
    })

    window.location.reload()
}

async function deleteTour(tourID) {
    try {
        await fetch(`http://localhost:3000/admin/deleteTour/${tourID}`, {
            method: 'DELETE'
        });
    } catch (error) {
        console.error('Error:', error);
        alert('An unexpected error occurred. Please try again.');
    }

    window.location.reload()
}

async function updateTour(tourID) {
    const destination = document.getElementById(`destination${tourID}`).value
    const departDate = document.getElementById(`departDate${tourID}`).value
    const returnDate = document.getElementById(`returnDate${tourID}`).value
    const city = document.getElementById(`city${tourID}`).value
    const price = document.getElementById(`price${tourID}`).value
    const image = document.getElementById(`image${tourID}`).value

    
    await fetch(`http://localhost:3000/admin/updateTour/${tourID}?destination=${destination}&departDate=${departDate}&returnDate=${returnDate}&city=${city}&price=${price}&image=${image}`, {
        method: "PUT"
    })
}