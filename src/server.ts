import 'reflect-metadata'
const express = require('express')
import { AppDataSource } from './utils/db_connection'
import { route } from "./routes";
const app = express()

const port = 3000

AppDataSource.initialize().then(() => {
    console.log('Database connected')
}).catch(error => {
    console.log('Error connecting to database: ' + error)
})

app.use(express.json())
app.use(route)
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))