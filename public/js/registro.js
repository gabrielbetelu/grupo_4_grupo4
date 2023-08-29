
window.onload = function(){
    const form = document.querySelector(".registro");

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const nombre = document.querySelector("input[name='nombre']");
        const apellido = document.querySelector("input[name='apellido']");
        //const emailInput = form.querySelector("input[name='email']");
        //const imagenInput = form.querySelector("input[name='imagen']");
        const contraseniaInput = document.querySelector("input[name='contrasenia']");
        const confirmContraseniaInput = document.querySelector("input[name='confirm-contrasenia']");
        //let boton = document.querySelector('#botonSubmit');
        let pError = document.querySelector('#errores');
        let errorNombre = document.querySelector('#errorNombre');
        let errorApellido = document.querySelector('#errorApellido');
        let errorEmail = document.querySelector('#errorEmail');
        let errorImagen = document.querySelector('#errorImagen');
                
        let errores = {};

        if (nombre.value.length < 2 && nombre.value == '') {
            errorNombre.nombre = "precisa completar este campo";
            nombre.classList.add('is-invalid')
            nombre.classList.remove('is-valid')
        } else {
            nombre.classList.remove('is-invalid')
            nombre.classList.add('is-valid')
        }


        if (apellido.value.length < 2) {
            errores.apellido = "precisa completar este campo";
            apellido.classList.add('is-invalid')
            apellido.classList.remove('is-valid')
        } else {
            apellido.classList.remove('is-invalid')
            apellido.classList.add('is-valid')
        }
        
        function esValidPassword(contrasenia) {
            // Verificar que la contraseña tenga al menos 8 caracteres,
            // una mayúscula, una minúscula y un símbolo
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
            errores.contraseniaInput ="La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un símbolo";
            pError.innerText = "La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un símbolo"
        } else if (contraseniaInput.value !== confirmContraseniaInput.value) {
            errores.confirmContraseniaInput ="Las contraseñas no coinciden";
        }

        if (Object.keys(errores).length > 0){
            pError.innerHTML = ``
            Object.values(errores).forEach(error => {
                pError.innerHTML += `<p>${error}</p>`;
            
            
        });
     } else {
            form.submit();
        }
    })
}
    





//----------------

        /*// Validación de la imagen 
        const imagen = imagenInput.files[0];
        if (!imagen) {
            errores.push("Debe seleccionar una imagen de perfil");
        }

        if (errores.length > 0) {
            const errores= form.querySelector(".error");
     
        } else {
            form.submit();
        }
    });
});*/
//---------------
/*
        const email = emailInput.value.trim();
        const isEmailValid = isValidEmail(email);
        if (!isEmailValid) {
            errores.push("Ingrese un email válido");
        } else {
            // Realizo una solicitud a la base de datos para verificar si el email ya está registrado¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡?????????????
            const siEmailExiste = await checkEmailExiste(email);
            if (siEmailExiste) {
                errores.push("El email ya está registrado");
            }
        }
        function isValidEmail(email) {
            const arroba = email.indexOf("@");
        const punto = email.lastIndexOf(".");
    
        return arroba !== -1 && punto > arroba;
        }

        /*async function checkEmailExiste(email) {
    
            return false;
        }*/
        
        
        //--------------
        


    
