import mysql2 from "mysql2"
import dotenv from 'dotenv'

dotenv.config()

const db = mysql2.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.SENHA_SQL,
    database: 'escola'
})

db.connect((err) => {
    if(err) {
        console.error("Erro de conexão: ", err)
        return
    }
    console.log("Conectado ao MySQL")
})

export default db