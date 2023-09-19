window.onload = function(){
    const form = document.querySelector(".login-form");

    form.addEventListener('submit', async (e) => {
        e.preventDefault();   
        
        const emailInput = document.querySelector("input[name='email']");
        const contraseniaInput = document.querySelector("input[name='contrasenia']");
        let pError = document.querySelector('#errores');
        let errorEmail = document.querySelector('#errorEmail');
        let errores = [];
        
        // validacion email
        
        function esValidoEmail(email) {
            const arroba = email.indexOf('@');
            const punto = email.lastIndexOf('.');
            const esValido = arroba !== -1 && punto > arroba;
                                                           
        return esValido;
        
    }
    
        if (emailInput.value == "") {
            errores.push("email vacío");
            errorEmail.innerText = "Por favor, complete este campo.";
        } else {
            if (!esValidoEmail(emailInput.value)) {
                errores.push("email inválido");
                errorEmail.innerText = "Email inválido";
            } else {
                errorEmail.innerText = ""; 
    }
}
    errorEmail.innerHTML = '';
       if(emailInput.value == "") {
            errores.push("email vacío");
            errorEmail.innerText = "precisa completar este campo"
            console.log("email vacío")
                    
       } else {
        
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
                const emailExists = userListFromApi.data.some(user => user.correo.toLowerCase() == email.toLowerCase())
                console.log(userListFromApi)
                
                return emailExists;
                } catch (error) {
                console.error('Error al validar el correo electrónico:', error);
                return false; 
                }
            };
            const email = emailInput.value;
            const emailExists = await validateEmailExists(email);
            if (!emailExists) {
                errorEmail.innerText = "Este email no está registrado.";
                errores.push("error email no registrado");
            } else {
                errorEmail.innerText = "";
                
            }

            const esEmailValid = esValidoEmail(email);
            console.log("Es válido el email? =  " + esEmailValid)           
            
        } 
      
    //validacion contraseña
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
        
    }
    
    
        if (errores.length == 0){
            errores.innerText = '';
                       
            Swal.fire(
                'Bienvenido a Patagonic',
                'Difruta de nuestros productos',
                'Success'
            ).then(()=> {
                form.submit();
            })
        }
    })
}