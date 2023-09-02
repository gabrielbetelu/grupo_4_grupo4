const path = require ('path');
const db = require('../database/models');
const sequelize = db.sequelize;



const Users = db.User; 
const CategoriaUser = db.CategoriaUser;



module.exports = {
    
    list: async (req , res) => {
        const response = {
            success : true,
            endPoint: '/api/user',
        }
        try {
            const data = await Users.findAll();
            response.data = data;
            return res.json(response);
        } catch (error) {
            response.success = false;
            response.msg = 'Hubo un error';
            return res.json(response);
        }
    }

}






