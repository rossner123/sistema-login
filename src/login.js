document.querySelector('#btnLogin').addEventListener("click", async () => {
    const email = document.querySelector('#email').value
    const senha = document.querySelector('#senha').value

    try {
        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, senha })
        })

        const data = await response.json()
        document.querySelector('#msg').innerText = data.message || data.error
    } catch (error) {
        document.querySelector('#msg').innerText = `Erro no login: ${error}`
    }
})