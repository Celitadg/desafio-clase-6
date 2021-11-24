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

    getById(id){
        let elemento = Contenedor.lista.filter(element => element.id == id)

        if (elemento.length != 0) {
            const resultado = elemento
            console.log(resultado)
            return resultado
        } else {
            const resultado = null
            console.log(resultado)
            return null
        }   
    }

    async getAll(){
        try{
            const contenido = await fs.promises.readFile(this.archivo, 'utf-8')
            const contenidoStr = JSON.parse(contenido)
            console.log(contenidoStr)
            return contenidoStr
        }
        catch{
            console.log("Hubo un error, no se puede leer el archivo")
        }
    }

}


let contenedor = new Contenedor ('./productos.json');

const app = express()


const PORT = process.env.PORT || 8080
const server = app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`)
})

server.on('error', error => console.log(`Hubo un error en el servidor ${error}`))

app.get('/', (request, response) => {
    response.send('Hola mundo!')
}) 

app.get('/productos', (request, response) => {
    let productos = contenedor.getAll()
    response.send(productos)
})

app.get('/productosRandom', (request, response) => {
    let id = Math.floor(Math.random()*((3+1)-1)+1)
    console.log(id) 
    let productosRandom = contenedor.getById(id)
    response.send(productosRandom)
})


