const fs = require ('fs');
const path = require ('path');
const rutaJSON = path.resolve('./src/database/products.json');
const products = JSON.parse (fs.readFileSync(rutaJSON));



module.exports = {
    home : (req, res) => {
        return res.render('home')
    }
    
};