window.onload = function(){
    const form = document.querySelector("registroPerfil");

    form.addEventListener('submit', async (e) => {
        e.preventDefault();       

        const emailInput = form.querySelector("input[name='email']");
        const imagenInput = form.querySelector("input[name='imagen']");
        const contraseniaInput = document.querySelector("input[name='contrasenia']");
        const confirmContraseniaInput = document.querySelector("input[name='confirm-contrasenia']");
        
        let pError = document.querySelector('#errores');
        
        let errorEmail = document.querySelector('#errorEmail');
        let errorImagen = document.querySelector('#errorImagen');
        
        let errores = [];


        // Validación de la imagen 
        const imagen = imagenInput.files[0];
        if (!imagen) {
        errorImagen.innerText ="Debe seleccionar una imagen de perfil";
        errores.push('error imagen') 

        const tiposPermitidos = ['image/jpeg', 'image/png', 'image/gif']; 

        if (!tiposPermitidos.includes(imagen.type)) {
        errorImagen.innerText ="El tipo de archivo de imagen no es válido";
        errores.push("error imagen tipo archivo")
        }

        const maxTamano = 3 * 1024 * 1024; 
        if (imagen.size > maxTamano) {
        errorImagen.innerText ="La imagen es demasiado grande. El tamaño máximo permitido es de 2 MB";
        errores.push("error imagen tamaño")
        }
    
    //validacion contraseñas
    function esValidPassword(contrasenia) {
        
        const tieneUpperCase = /[A-Z]/.test(contrasenia);//esto me devuelve booleanos
        const tieneLowerCase = /[a-z]/.test(contrasenia);
        const tieneSymbol = /[\W_]/.test(contrasenia);
        let esValida = false;
        if(tieneUpperCase && tieneLowerCase && tieneSymbol && contrasenia.length >=8)
        esValida = true
        return esValida
    }

    const ContraseniaValid = esValidPassword(contraseniaInput.value);
    
    if (!ContraseniaValid) {
        console.log('contraseniano valida')
        errores.push("error contraseña");
        pError.innerText = "La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un símbolo"
    } else if (contraseniaInput.value !== confirmContraseniaInput.value) {
        errores.push ="error confirmacion contraseña";
        pError.innerText = "Las contraseñas no coinciden"
    }
   
        console.log(errores)
            if (errores.length == 0){
                        
                Swal.fire(
                    'Patagonic perfil',
                    'Usuario editado',
                    'Success'
                ).then(()=> {
                    form.submit();
                })
            }
        }
    })
}
