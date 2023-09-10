window.addEventListener("load", () =>{
    const creacionProducto = document.getElementById("creacionValid");
    const fileInput = document.getElementById("imag-valid");
    const errorImagen = document.getElementById("errorImg");

    let errores = [];
//    let imagenVacia = 1
    fileInput.addEventListener('change', function (event){
    const files = Array.from(event.target.files);
    console.log(files)
        if (files.length == 0) {
            errores.push("Imagen vacia")
            errorImagen.innerText= "Debe seleccionar al menos una imagen válida";
        }

        for (let i = 0; i< files.length; i++){
            if(!files[i].type.includes('image')) {
            errores.push("Imagen invalida")
            errorImagen.innerText= "Debe seleccionar una imagen válida";
            i = files.length;
//            imagenVacia = 0
            }
            console.log(errores);      
        }
        
    })

    
   
    creacionProducto.addEventListener("submit", function (e){
    e.preventDefault();
    
    
    const nombreProducto = document.getElementById("nomb-valid");
    const descripProducto = document.getElementById("descr-valid");
    const errorNombre = document.getElementById("errorNombre");
    const errorDescripcion = document.getElementById("errorDescr");
    console.log(errorNombre)
        let errores = [];

        if(nombreProducto.value == ""){
            errores.push("Este campo es obligatorio")
            errorNombre.innerText = "Campo obligatorio, mínimo 5 caracteres";
        }else if (nombreProducto.value.length < 5){ 
            errores.push("Este campo debe tener al menos 5 caracteres")
            errorNombre.innerText= "Campo obligatorio, mínimo 5 caracteres";
        }
    
        if(descripProducto.value.length < 20){
            errores.push("Este campo debe tener al menos 20 caracteres")
            errorDescripcion.innerText= "Campo obligatorio, mínimo 20 caracteres";
        }

    //    if (imagenVacia=1) {
    //        errores.push("Imagen vacia")
    //        errorImagen.innerText= "Debe seleccionar una imagen válida";
    //    }
    
         
        console.log(errores);
        if (errores.length == 0){

            Swal.fire(
                'Producto creado!',
                'Success'
            ).then(()=> {
                creacionProducto.submit();
            })
        }
    })
    

 })       
