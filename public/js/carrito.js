if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded" , ready)
}
else {
    ready()
}

let productos = JSON.parse(localStorage.getItem("carrito"))

function ready() {
    
    if(JSON.parse(localStorage.getItem("carrito")) == null) {
        localStorage.setItem('carrito' , JSON.stringify([]))
    }
    mostrarCarrito(productos)
    
}

    

    function mostrarCarrito (productosEnCarrito) {
        let articulosCarrito = document.querySelector('#articulosCarrito')
        console.log(productosEnCarrito)
        if (productosEnCarrito.length == 0) {
            articulosCarrito.innerHTML = `<h2>El carrito está vacío </h2>
            <h4><a href = "/product/productos">Ir a listado de Productos</a></h4>`
            document.querySelector(".modal__footer").innerHTML = ``
        } else {
            let subTotal = 0
            let descuento = 10
            let flete = 2500
            articulosCarrito.innerHTML = ``
            productosEnCarrito.forEach(element => {
                subTotal += element.subTotal
                articulosCarrito.innerHTML += 
                `<div class="modal__body">
                    <div class="modal__list">
                        <div class="modal__item">
                            <div class="modal__thumb">
                                <img class= "campTheNorth" src=${element.imagen_producto} alt="campera">
                            </div>
                            <div class="modal__text-product">
                                <h3>${element.nombre_producto}</h3>
                                
                                <p>Talle: ${element.talle_producto}</p>
                                <p>Color: ${element.color_producto}</p>
                                <p>Cantidad: ${element.cantidad_producto}</p>
                                <p><strong>Precio unitario: $${element.precio_producto}</strong></p>
                                <p><strong>SubTotal:        $${element.subTotal}</strong></p>
                                </br>

                                <i class="fas fa-trash" onClick=borrarElemento(${element.id_producto})></i>
                                </br>
                                </br>
                                </br>
                            </div>
                        </div>

                    </div>
                </div>`

                

            });

            (subTotal > 50000)? flete = 0 : "";

            document.querySelector(".modal__footer").innerHTML = 
                    `<div class="modal__list-price">
                        <ul>
                            <li>Subtotal: <strong>$${subTotal}</strong></li>
                            <li>Descuento: <strong>$${subTotal*descuento/100}</strong></li>
                            <li>Flete: <strong>$${flete}</strong></li>
                        </ul>
                        <h4 class="modal__total-cart"> Total: $${subTotal-subTotal*descuento/100+flete}</h4>
                    </div>

                    <div class="modal__btns">
                        <a href="#" class="btn-primary">Comprar Ahora</a>
                        </br>
                        <a href="#" class="btn-primary" onClick=vaciarCarrito()>Vaciar Carrito</a>
                    </div>`
        }
    }

    function borrarElemento(id){
        // Necesito traer los productos del localStorage
        let elementos = productos.filter((row) => row.id_producto != id)
        console.log("*****  Carrito sin elemento eliminado  *************")
        console.log(elementos)

        // Tengo que setear los productos en el localStorage
        mostrarCarrito(elementos)
        localStorage.setItem('carrito' , JSON.stringify(elementos))
        productos = JSON.parse(localStorage.getItem("carrito"))
        console.log("*****  Productos en carrito  *************")
        console.log(productos)
        if (productos.length < 1) {
            document.querySelector(".modal__footer").innerHTML = ``
            
        }
    }

    function vaciarCarrito() {
        localStorage.setItem('carrito' , JSON.stringify([]))
        productos = JSON.parse(localStorage.getItem("carrito"))
        mostrarCarrito(productos)
    }
    


    




