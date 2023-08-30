window.onload = function(){
    const form = document.querySelector(".registro");

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const nombre = document.querySelector("input[name='nombre']");
        const apellido = document.querySelector("input[name='apellido']");
        const emailInput = form.querySelector("input[name='email']");
        const imagenInput = form.querySelector("input[name='imagen']");
        const contraseniaInput = document.querySelector("input[name='contrasenia']");
        const confirmContraseniaInput = document.querySelector("input[name='confirm-contrasenia']");
        let pError = document.querySelector('#errores');
        let errorNombre = document.querySelector('#errorNombre');
        let errorApellido = document.querySelector('#errorApellido');
        let errorEmail = document.querySelector('#errorEmail');
        let errorImagen = document.querySelector('#errorImagen');
                
        let errores = {};

        if (nombre.value.length < 2 || nombre.value == '') {
            errorNombre.nombre= "precisa completar los campos en rojo";
            nombre.classList.add('is-invalid')
            nombre.classList.remove('is-valid')
            
        } else {
            nombre.classList.remove('is-invalid')
            nombre.classList.add('is-valid')
        }

        if (apellido.value.length < 2) {          
            errorApellido.apellido = "precisa completar los campos en rojo";
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

       
     // Validar email
     // tengo que verificar si un email ya está registrado pero comooo?? a ver:
        //checkEmailExiste boolea
        async function checkEmailExiste(email) {
            const User = await User.findOne({ where: { correo: email } });
        
        return User !== null;

        }

        const email = emailInput.value;
        const esEmailValid = esValidEmail(email);

        if (!esEmailValid) {
            errorEmail.emailInput = "Ingrese un email válido";
        } else {
        try {
        const siEmailExiste = await checkEmailExiste(email);
        if (siEmailExiste) {
            errorEmail.emailInput = "El email ya está registrado";
        }
        } catch (error) {
             console.error('Error al verificar el email:', error);
        }
    }

        function esValidEmail(email) {
            const arroba = email.indexOf("@");
            const punto = email.lastIndexOf(".");
        
            const esValido = arroba !== -1 && punto > arroba;
            return esValido;
    }
    
               
    // Validación de la imagen 
        const imagen = imagenInput.files[0];
        if (!imagen) {
        errorImagen.imagenInput ="Debe seleccionar una imagen de perfil";
        } else {
    // Validar tipo de archivo(necesito poner mas? verifica, no recuerdo)
        const tiposPermitidos = ['image/jpeg', 'image/png', 'image/gif']; 

        if (!tiposPermitidos.includes(imagen.type)) {
        errorImagen.imagenInput ="El tipo de archivo de imagen no es válido";
        }

        //despues validar tamaño de archivo(preguntar a gabi)
        const maxTamano = 2 * 1024 * 1024; 
        if (imagen.size > maxTamano) {
        errorImagen.imagenInput ="La imagen es demasiado grande. El tamaño máximo permitido es de 2 MB";
        }
    }

        if (Object.keys(errores).length > 0){
            pError.innerHTML = ``
            Object.values(errores).forEach(error => {
            pError.innerHTML += `<p>${error}</p>`;          
        });
        } else {
            pError.innerHTML = ``
            Swal.fire(
                'Bienvenido',
                'Usuario regitrado!',
                'Success'
            ).then(()=> {
                form.submit();
            })
           
        }
    })
}



