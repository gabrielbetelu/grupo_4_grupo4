
const imageSizeMiddleware = (err, req, res, next) => {
  console.log("Entró a imageSizeMiddleware");
  //      console.log(err)
        if (err.code === 'LIMIT_FILE_SIZE') {
          req.fileSizeError = "La imagen debe tener un tamaño máximo de 3 MB";
          console.log(req.fileSizeError)
        }
        next();
      };
    
      module.exports = imageSizeMiddleware