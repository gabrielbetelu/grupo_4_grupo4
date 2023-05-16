const express = require('express')
const path = require('path')
const app = express()
app.use(express.static("./public"));


app.listen(3030, () => 
console.log ('servidor corriendo en el puerto 3030'))


app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, '/views/productCart.html'))
})
