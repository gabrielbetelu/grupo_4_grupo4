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
    botonAgregarCarrito.addEventListener('click' , agregarItem)


}

function agregarItem () {
//    let regex = /\/product\/producto\/(\d+)/
//    let urlProducto = window.location.href
    console.log(document.querySelector("#idProd"))
    let productosEnCarrito = JSON.parse(localStorage.getItem("carrito"))
/*    let productoAgregado = {
        id_producto: document.querySelector("#idProd").value,
        nombre_producto: ,
        imagen_producto: ,
        color_producto: ,
        talle_producto: ,
        precio_producto:
    }
*/
}