document.querySelector('#btnCadastrar').addEventListener("click", async () => {
    const nome = document.querySelector('#nome').value
    const email = document.querySelector('#email').value
    const senha = document.querySelector('#senha').value

    try {
        const response = await fetch('http://localhost:3000/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nome, email, senha })
        })

        const data = await response.json()
        document.querySelector('#msg').innerText = data.message || data.error
    } catch (err) {
        document.querySelector('#msg').innerText = 'Erro no cadastro'
    }
})
