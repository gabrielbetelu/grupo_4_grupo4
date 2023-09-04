// AHORA VAMOS A HACER LAS VALIDACIONES
// O SEA QUE EL ARCHIVO SEA DEL TIPO IMAGEN 
// Y EL TAMAÑO MENOR QUE 3MB
const fileFilter = (req, file , cb) => {

    console.log("Entró a imageMiddleware");
    
    if(req.files.length > 0) {
        for (let i = 0 ; i < req.files.length ; i++) {
            if (req.files[i].mimetype.includes('image')) {
                        console.log('Archivo correcto');
                        cb (null , true)
                    } else {
                        console.log('Archivo incorrecto');
                        req.fileError = true;
                        i= req.files.length
                        cb (null , false)
            }
        }

    /*    for (file of req.files){
            if (file.mimetype.includes('image')) {
                //    if (file.mimetype.includes('image') && file.fileSize < (1024 * 1024 * 3)) {            
                        console.log('Archivo correcto');
                        cb (null , true)
                    } else {
                        console.log('Archivo incorrecto');
                        req.fileError = "La imagen debe tener un formato valido";
                        cb (null , false)
                        
                    }
        }
    */

    } else {
        console.log('Archivo incorrecto');
        req.fileImgError = true;
        cb (null , false)
    }
    
    
    
};
// DE ACA PASAMOS AL MIDDLEWARE DE VALIDACIONES

module.exports = fileFilter;