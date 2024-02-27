document.addEventListener("DOMContentLoaded", showNavbar())

async function showNavbar() {
    const userid = document.cookie
    .split("; ")
    .find((row) => row.startsWith("userid="))
    ?.split("=")[1];
    const role = document.cookie
    .split("; ")
    .find((row) => row.startsWith("role="))
    ?.split("=")[1];

    const navbaritems = document.querySelector(".navbaritems")
    if(userid != '' && role == 'ADMIN') {
        navbaritems.innerHTML = `
        <a href="/" class="nav-item nav-link px-3">Home</a>
        <a href="/travelAgency" class="nav-item nav-link px-3">Tours</a>
        <a href="/mytours" class="nav-item nav-link px-3">My Tours</a>
        <a href="/" onclick='logOut()' class="nav-item nav-link px-3">Log Out</a>
        <a href="/admin" class="nav-item nav-link px-3">Admin</a>`
    }else if(userid != '') {
        navbaritems.innerHTML = `
        <a href="/" class="nav-item nav-link px-3">Home</a>
        <a href="/travelAgency" class="nav-item nav-link px-3">Tours</a>
        <a href="/mytours" class="nav-item nav-link px-3">My Tours</a>
        <a href="/" onclick='logOut()' class="nav-item nav-link px-3">Log Out</a>`
    }else {
        navbaritems.innerHTML = `
        <a href="/" class="nav-item nav-link px-3">Home</a>
        <a href="/travelAgency" class="nav-item nav-link px-3">Tours</a>
        <a href="/auth/registration" class="nav-item nav-link px-3">SignUp</a>
        <a href="/auth/login" class="nav-item nav-link px-3">Login</a>`
    }
}

async function logOut() {
    try {
        const response = await fetch(`/auth/logout`, {
            method: 'POST'
        }).then(res => res.json());
        alert(response.message)
        showNavbar()
    } catch (error) {
        console.error('Error:', error);
        alert('An unexpected error occurred. Please try again.');
    }
}