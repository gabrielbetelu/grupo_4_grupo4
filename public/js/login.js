window.onload = function(){
    const form = document.querySelector(".login-form");

    form.addEventListener('submit', async (e) => {
        e.preventDefault();   
        
        const emailInput = document.querySelector("input[name='email']");
        const contraseniaInput = document.querySelector("input[name='contrasenia']");
        let pError = document.querySelector('#errores');

        let errores = [];
        //validacion email


        //validacion contraseña
        const contrasenia = contraseniaInput.value
        if (contrasenia == '') {
            
            errores.push("error contraseña");
            pError.innerText = "Campo obligatorio"
        
        }
        if (errores.length == 0){
                       
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