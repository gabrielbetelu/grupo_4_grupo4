window.addEventListener("load", () =>{
    const creacionProducto = document.getElementById("creacionValid");
    const fileInput = document.getElementById("imag-valid");
    fileInput.addEventListener('change', function (event){
    creacionProducto.addEventListener("submit", function (e){
        e.preventDefault();
       

    let errores = [];

    const nombreProducto = document.getElementById("nomb-valid");
        if(nombreProducto.value == ""){
            errores.push("Este campo es obligatorio")
        }else if (nombreProducto.value.length < 5){ 
            errores.push("Este campo debe tener al menos 5 caracteres")
        }
            
        
    const descripProducto = document.getElementById("descr-valid");
        if(descripProducto.value.length < 20){
        errores.push("Este campo debe tener al menos 20 caracteres")
        }
    
        
        let error = 1;
        const files = Array.from(event.target.files);
        console.log(files)
        //files.map(file => (file.type.includes('image')) ? errores.push("Imagen no valida") : error=0)
        for (let i = 0; i< files.length; i++){
            if (files[i].type.includes('image')){
                error=0;

            }
            else {
                errores.push("Imagen no valida")
            } 
        }
        
      
        
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
 })       
