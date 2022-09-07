import 'reflect-metadata'
const express = require('express')
import { AppDataSource } from './utils/db_connection'
import { route } from "./routes";
const path = require("path");

const app = express()
const port = 3000

app.use(express.json())

AppDataSource.initialize().then(() => {
    console.log('Database connected')
}).catch(error => {
    console.log('Error connecting to database: ' + error)
})
app.use(
    "/files",
    express.static(path.resolve(__dirname, "..", "tmp", "uploads"))
  );
app.use(route)
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))