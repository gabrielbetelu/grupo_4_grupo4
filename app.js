/*const express = require('express')
const path = require('path')
const app = express()
app.use(express.static("./public"));


app.listen(3030, () => 
console.log ('servidor corriendo en el puerto 3030'))


app.get("/", (req, res) => {
    res.sendFile(path.join(dirname, '/views/home.html'))
})

app.get("/login.html", (req, res) => {
    res.sendFile(path.join(dirname, '/views/login.html'))
})

app.get("/registro.html", (req, res) => {
    res.sendFile(path.join(dirname, '/views/registro.html'))
})

app.get("/carrito.html", (req, res) => {
    res.sendFile(path.join(dirname, '/views/carrito.html'))
})

app.get("/productos.html", (req, res) => {
    res.sendFile(path.join(dirname, '/views/productos.html'))
})

app.get("/producto.html", (req, res) => {
    res.sendFile(path.join(dirname, '/views/producto.html'))
})*/








const express = require('express')
const path = require('path')
const app = express()
app.use(express.static("./public"));


app.listen(3030, () => 
console.log ('servidor corriendo en el puerto 3030'))


app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, '/views/home.html'))
})

app.get("/login.html", (req, res) => {
    res.sendFile(path.join(__dirname, '/views/login.html'))
})

app.get("/registro.html", (req, res) => {
    res.sendFile(path.join(__dirname, '/views/registro.html'))
})

