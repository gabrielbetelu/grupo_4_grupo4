window.addEventListener("load", () =>{
    const formEdicion = document.getElementById("editForm")
    const erroresLista = document.querySelector(".erroresLista")


    formEdicion.addEventListener("submit", (e) =>{
        
        e.preventDefault();

        let errores = [];

        const nameProd = document.querySelector(".nombre");
        if (nameProd.value == "") {
            errores.push("Este campo es obligatorio");
        }else if (nameProd.value.length < 5){
            errores.push("Este campo debe de tener al menos 5 caracteres");
        }

        const descProd = document.querySelector(".descripcion");
        if (descProd.value.length < 20) {
            errores.push("Este campo debe de tener al menos 20 caracteres");
        }


        if (errores.length > 0) {
            erroresLista.innerHTML = ``;
            for (let error of errores){
                erroresLista.innerHTML += `<li>${error}</li>`
            }
        }else {
            erroresLista.innerHTML = ``;

            formEdicion.submit();
        }
    })
})