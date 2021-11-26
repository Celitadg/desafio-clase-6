const fs = require ('fs')
const express = require ('express');

class Contenedor {
    constructor (archivo){
        this.archivo = archivo
    }

    static countId = 0
    static lista = []

    save(object){
        try{
            Contenedor.countId++
            object.id = Contenedor.countId
            Contenedor.lista.push(object)
            let string = JSON.stringify(Contenedor.lista)
            fs.writeFileSync(this.archivo, string)
            console.log(object.id)
            return object.id
        }
        catch{
            console.log('Hubo un error, no se pudo guardar')
        }   
    }

    async getById(id){
        let todos = await this.getAll()
        let elemento = todos.filter(element => element.id == id)

        if (elemento.length != 0) {
            const resultado = elemento
            return resultado
        } else {
            const resultado = null
            return resultado
        }   
    }

    async getAll(){
        try{
            const contenido = await fs.promises.readFile(this.archivo, 'utf-8')
            const contenidoStr = JSON.parse(contenido)
            return contenidoStr
        }
        catch{
            console.log("Hubo un error, no se puede leer el archivo")
        }
    }

}


const contenedor = new Contenedor ('./productos.json');

const app = express()

const PORT = process.env.PORT || 8080
const server = app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`)
})

server.on('error', error => console.log(`Hubo un error en el servidor ${error}`))

app.get('/', (request, response) => {
    response.send('Hola mundo!')
}) 

app.get('/productos', async (request, response) => {
    const productos = await contenedor.getAll()
    response.json(productos)
})

app.get('/productosRandom', async (request, response) => {
    const productos = await contenedor.getAll() 
    let id = Math.floor(Math.random() * productos.length)
    console.log(id) 
    let productosRandom = await contenedor.getById(id+1)
    response.send(productosRandom)
})

