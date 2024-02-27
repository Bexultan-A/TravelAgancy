
document.addEventListener("DOMContentLoaded", start())

async function start() {
    const response = await fetch('/admin/tours')
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
    <td><input type="text" class="form-control" id="destination${tours._id}" value="${tours.destination}"></td>
    <td><input type="text" class="form-control" id="city${tours._id}" value="${tours.city}"></td>
    <td><input type="text" class="form-control" id="departDate${tours._id}" value="${tours.departDate}"></td>
    <td><input type="text" class="form-control" id="returnDate${tours._id}" value="${tours.returnDate}"></td>
    <td><input type="text" class="form-control" id="price${tours._id}" value="${tours.price}"></td>
    <td><input type="text" class="form-control" id="image${tours._id}" value="${tours.image}"></td>
    <td>
        <button class="btn btn-primary text-white px-3 me-3" 
        onclick="updateTour('${tours._id}')">Update</button>
        <button class="btn btn-danger" onclick="deleteTour('${tours._id}')">Delete</button>
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

    
    await fetch(`/admin/addTour?destination=${destination}&departDate=${departDate}&returnDate=${returnDate}&city=${city}&price=${price}&image=${image}`, {
        method: "POST"
    })

    window.location.reload()
}

async function deleteTour(tourID) {
    try {
        await fetch(`/admin/deleteTour/${tourID}`, {
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

    
    await fetch(`/admin/updateTour/${tourID}?destination=${destination}&departDate=${departDate}&returnDate=${returnDate}&city=${city}&price=${price}&image=${image}`, {
        method: "PUT"
    })
}