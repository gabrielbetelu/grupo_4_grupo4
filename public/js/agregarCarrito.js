console.log("Entraste a carrito.js")
if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded" , ready)
}
else {
    ready()
}
function ready() {
    if(JSON.parse(localStorage.getItem("carrito")) == null) {
        localStorage.setItem('carrito' , JSON.stringify([]))
    }
    let botonAgregarCarrito = document.querySelector('.btn-add-to-cart')
    botonAgregarCarrito.addEventListener("click" , agregarItem)
}

function agregarItem() {
    let regex = /\/product\/producto\/(\d+)/
    let urlProducto = window.location.href
    let productosEnCarrito = JSON.parse(localStorage.getItem("carrito"))
    let productoAgregado = {
        id_producto: urlProducto.match(regex)[1],
        nombre_producto: document.querySelector(".container-title").innerHTML,
        imagen_producto: document.querySelector(".imgProd").alt,
        color_producto: document.querySelector("#colour").value,
        talle_producto: document.querySelector("#size").value,
        precio_producto: document.querySelector(".container-price-spam").innerHTML.replace("$" , "")
    }
    if(productosEnCarrito.length == 0){
        productoAgregado.cantidad_producto =  parseInt(document.querySelector(".input-quantity").value)
        productoAgregado.subTotal =   productoAgregado.cantidad_producto *  productoAgregado.precio_producto
        productosEnCarrito.push(productoAgregado)
    } else {
                let productoBuscar = productosEnCarrito.find(prod => prod.id_producto == productoAgregado.id_producto  && prod.color_producto == productoAgregado.color_producto && prod.talle_producto == productoAgregado.talle_producto)
                if(productoBuscar) {
                    productoBuscar.cantidad_producto += parseInt(document.querySelector(".input-quantity").value)
                    productoBuscar.subTotal = productoBuscar.cantidad_producto * productoAgregado.precio_producto
                } else {
                    productoAgregado.cantidad_producto = parseInt(document.querySelector(".input-quantity").value)
                    productoAgregado.subTotal =   productoAgregado.cantidad_producto *  productoAgregado.precio_producto
                    productosEnCarrito.push(productoAgregado)
    
        }
    }
    localStorage.setItem("carrito" , JSON.stringify(productosEnCarrito))
}