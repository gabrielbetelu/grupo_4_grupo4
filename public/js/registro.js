window.onload = function(){
    const form = document.querySelector(".registro");

    form.addEventListener('submit', async (e) => {
        e.preventDefault();        
   
        const nombreInput = document.querySelector("input[name='nombre']");
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
        
        let errores = [];

        if (nombreInput.value.length < 2) {
            errores.push('error nombre')
            errorNombre.innerText = "precisa completar los campos en rojo";
            nombreInput.classList.add('is-invalid')
            nombreInput.classList.remove('is-valid')
            
        } else {
            nombreInput.classList.remove('is-invalid')
            nombreInput.classList.add('is-valid')
        }

        if (apellido.value.length < 2) {          
            errores.push('error apellido')
            errorApellido.innerText = "precisa completar los campos en rojo";
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
            errores.push("error contraseña");
            pError.innerText = "La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un símbolo"
        } else if (contraseniaInput.value !== confirmContraseniaInput.value) {
            errores.push ="error confirmacion contraseña";
            pError.innerText = "Las contraseñas no coinciden"
        }
         ///--------
        const getUserListFromApi = async () => {
            try {
              const response = await fetch('/api/user');
              const users = await response.json();
              console.log(users)
              return users;
            } catch (error) {
              console.error('Error al obtener el listado de usuarios:', error);
              throw error; 
            }
          };
          
        const validateEmailExists = async (email) => {
            try {
              const userListFromApi = await getUserListFromApi();
              const emailExists = userListFromApi.some(user => user.correo === email)
              console.log(userListFromApi)
              return emailExists;
            } catch (error) {
              console.error('Error al validar el correo electrónico:', error);
              return false; // En caso de error, considera que el correo no existe para evitar problemas
            }
          };
          
          // Uso de la función de validación
          const email = 'correo@example.com';
          const emailExists = await validateEmailExists(email);
          if (emailExists) {
            console.log('El correo electrónico ya existe en la API.');
          } else {
            console.log('El correo electrónico no existe en la API.');
          }
         
         
        //---
       /* const userListFromApi = []; // Aquí deberías almacenar el listado de usuarios obtenido de la API

        emailInput.addEventListener('blur', () => {
        const email = emailInput.value;
        const isValidEmail = esValidoEmail(email);

        if (!isValidEmail) {
            errorEmail.innerText= 'Ingrese un correo electrónico válido';
            return;
        }

        const emailExists = userListFromApi.some(user => user.correo === email);

        if (emailExists) {
            errorEmail.innerText = 'El correo electrónico ya está registrado';
        } else {
            errorEmail.innerHTML = '';
        }
        });

        function esValidoEmail(email) {
        const arroba = email.indexOf('@');
        const punto = email.lastIndexOf('.');

        const esValido = arroba !== -1 && punto > arroba;
        return esValido;
        }*/







     // Validar email
     // tengo que verificar si un email ya está registrado
        //checkEmailExiste trae booleano 
       /* async function checkEmailExiste(email) {
            try {
                const response = await fetch(`/api/user/${encodeURIComponent(email)}`);
                const data = await response.json();
                return data.emailExists;

            } catch (error) {
                console.error('Error al verificar el email:', error);
                throw error;
            }
        }
        
             
               
               
        async function checkEmailExiste(email) {
            
        
        }
        const email = emailInput.value;
        const esEmailValid = esValidEmail(email);

        if (!esEmailValid) {
            errorEmail.innerText = "Ingrese un email válido";
            errores.push("email invalido" )
        } else {
        try {
        const siEmailExiste = await checkEmailExiste(email);
        if (siEmailExiste) {
            errorEmail.innerText = "El email ya está registrado";
            errores.push("error email registrado")
        }
        } catch (error) {
             console.error('Error al verificar el email:', error);
        }
    }
        function esValidEmail(email) {
            const arroba = email.indexOf("@");
            const punto = email.lastIndexOf(".");
        
            const esValido = arroba !== -1 && punto > arroba;
            return esValido;*/
    
    
    // Validación de la imagen 
        const imagen = imagenInput.files[0];
        if (!imagen) {
        errorImagen.innerText ="Debe seleccionar una imagen de perfil";
        errores.push('error imagen')
        
        } else {
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
    }
console.log(errores)
        if (errores.length == 0){
                       
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



