document.getElementById('submitbtn').addEventListener("click", function(event) {
    event.preventDefault()
    signup()
})

async function signup() {
    const username = document.getElementById('username').value
    const password = document.getElementById('password').value

    try {
        const response = await fetch(`/auth/registration?username=${username}&password=${password}`, {
            method: 'POST'
        }).then(res => res.json());
        alert(response.message)
        window.location.href = '/'
    } catch (error) {
        console.error('Error:', error);
        alert('An unexpected error occurred. Please try again.');
    }
}