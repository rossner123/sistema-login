import express from "express"
import bcrypt from "bcrypt"
import db from "./db.js"
import cors from "cors"

const app = express()
app.use(cors())
app.use(express.json())

app.post("/register", (req, res) => {
    const { nome, email, senha } = req.body

    bcrypt.hash(senha, 10, (err, hash) => {
        if(err) return res.status(500).json({ error: 'Erro ao criptografar senha' })

        const sql = 'INSERT INTO users (nome, email, senha) VALUES (?, ?, ?)'
        db.query(sql, [nome, email, hash], (err) => {
            if (err) {
                console.error(err)
                return res.status(500).json({ error: 'Erro ao cadastrar usuário' })
              }
            res.status(201).json({ message: 'Usuário cadastrado com sucesso!' })
        })
    })
})

app.post('/login', (req, res) => {
    const { email, senha } = req.body

    const sql = 'SELECT * FROM users WHERE email = ?'
    db.query(sql, [email], (err, results) => {
        if(err) return res.status(500).json({ error: 'Usuário não encontrado' })

        const user = results[0]

        bcrypt.compare(senha, user.senha, (err, match) => {
            if (err) return res.status(500).json({ error: 'Erro ao verificar senha' })
            if (!match) return res.status(401).json({ error: 'Senha incorreta' })

            res.json({ message: 'Login realizado com sucesso' })
        })
    })
})

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000...")
})