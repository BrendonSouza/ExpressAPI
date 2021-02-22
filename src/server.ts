import express, { response } from 'express';

const app = express();
//rota e dps request response
app.get("/", (request, response) => {
    return response.json({ message: "Hello" })
})

app.post("/", (request, response) => {
    return response.json({ message: "Informação gravada com sucesso" })
})

app.listen(3333, () => console.log("Server is running!"))

