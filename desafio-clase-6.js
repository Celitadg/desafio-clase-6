const express = require ('express')

const app = express()

const PORT = process.env.PORT || 3000
const server = app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`)
})

server.on('error', error => console.log(`Hubo un error en el servidor ${error}`))

app.get('/', (request, response) => {
    response.send('Hola mundo!')
})