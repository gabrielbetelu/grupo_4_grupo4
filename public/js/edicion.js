window.addEventListener("load", () =>{
    const formEdicion = document.getElementById("editForm")
    const imgEdit = document.querySelector(".imgEdit")


    formEdicion.addEventListener("submit", (e) =>{
        
        e.preventDefault();

        const nameProd = document.querySelector(".nombre");
        const descProd = document.querySelector(".descripcion");
        const errorNom = document.getElementById("errorNom")
        const errorDesc = document.getElementById("errorDesc")
        const erroresLista = document.getElementById("erroresLista")

        let errores = [];
    
        if (nameProd.value == "") {
            errores.push("Este campo es obligatorio");
        }else if (nameProd.value.length < 5){
            errores.push("Este campo debe de tener al menos 5 caracteres");
            errorNom.innerText = "Este campo debe de tener al menos 5 caracteres"
        }
        
        if (descProd.value.length < 20) {
            errores.push("Este campo debe de tener al menos 20 caracteres");
            errorDesc.innerText = "Este campo debe de tener al menos 20 caracteres"

        }

        
        if (errores.length > 0) {
            //erroresLista.innerHTML = ``;
           // for (let error of errores){
            //   erroresLista.innerHTML += `<li>${error}</li>`
            //}
        }else {
            //erroresLista.innerHTML = ``;
            
            formEdicion.submit();
        }
    })
})
