
console.log('estacorriendo el registro js')
    document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector(".registro");

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const nombreInput = form.querySelector("input[name='nombre']");
        const apellidoInput = form.querySelector("input[name='apellido']");
        const emailInput = form.querySelector("input[name='email']");
        const imagenInput = form.querySelector("input[name='imagen']");
        const contraseniaInput = form.querySelector("input[name='contrasenia']");
        const confirmContraseniaInput = form.querySelector("input[name='confirm-contrasenia']");
        const pContrasenia = form.querySelector('#idContrasenia');
        const pConfirmContrasenia= form.querySelector('#confirmContrasenia');

        let errores = [];

        if (nombreInput.value.trim().length < 2) {
            errores.push("precisa completar este campo");
        }

        if (apellidoInput.value.trim().length < 2) {
            errores.push("precisa completar este campo");
        }
        
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
        

        function isValidPassword(contrasenia) {
            // Verificar que la contraseña tenga al menos 8 caracteres,
            // una mayúscula, una minúscula y un símbolo
            console.log(contrasenia)
            const tieneUpperCase = /[A-Z]/.test(contrasenia);
            const tieneLowerCase = /[a-z]/.test(contrasenia);
            const tieneSymbol = /[\W_]/.test(contrasenia);
            let esValida = false;
            if(tieneUpperCase && tieneLowerCase && tieneSymbol && contrasenia.length >=8)
            esValida = true
            return esValida
        }
        console.log(contraseniaInput.value)
        const isContraseniaValid = isValidPassword(contraseniaInput.value);
        console.log(isContraseniaValid)
        if (!isContraseniaValid) {
            console.log('contraseniano valida')
            errores.push("La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un símbolo");
            pContrasenia.innerText = "La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un símbolo"
        } else if (contraseniaInput.value != confirmContraseniaInput.value) {
            console.log('difierencontraseñas')
            errores.push("Las contraseñas no coinciden");
        }


    })})
        
        /*else {
           errores.innerTexttext = "La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un símbolo";
        }  */      
        
//----------------

        /*// Validación de la imagen 
        const imagen = imagenInput.files[0];
        if (!imagen) {
            errores.push("Debe seleccionar una imagen de perfil");
        }

        if (errores.length > 0) {
            const errores= form.querySelector(".error");
            errores.innerText = errores.join(", ");
        } else {
            form.submit();
        }
    });
});*/



