const path = require ('path');
const db = require('../database/models');
const sequelize = db.sequelize;



const Products = db.Product; 




module.exports = {
    
    list: async (req , res) => {
        const response = {
            success : true,
            endPoint: '/api/product',
        }
        try {
            const data = await Products.findAll();
            response.data = data;
            return res.json(response);
        } catch (error) {
            response.success = false;
            response.msg = 'Error';
            return res.json(response);
        }
    }

}