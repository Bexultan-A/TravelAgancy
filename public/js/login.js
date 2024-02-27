document.getElementById('submitbtn').addEventListener("click", function(event) {
    event.preventDefault()
    login()
})

async function login() {
    const username = document.getElementById('username').value
    const password = document.getElementById('password').value

    try {
        const response = await fetch(`/auth/login?username=${username}&password=${password}`, {
            method: 'POST'
        }).then(res => res.json());
        alert(response.message)
        window.location.href = '/'
    } catch (error) {
        console.error('Error:', error);
        alert('An unexpected error occurred. Please try again.');
    }
}