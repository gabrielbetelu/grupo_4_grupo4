
const imageSizeMiddleware = (err, req, res, next) => {
    //    console.log(err)
        if (err.code === 'LIMIT_FILE_SIZE') {
          req.fileSizeError = "La imagen debe tener un tamaño máximo de 3 MB";
        }
        next();
      };
    
      module.exports = imageSizeMiddleware