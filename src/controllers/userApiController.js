const path = require ('path');
const db = require('../database/models');
const sequelize = db.sequelize;

const Users = db.User; 
const CategoriaUser = db.CategoriaUser;

module.exports = {
    
    list: async (req , res) => {
        const response = {
            success : true,
            count: data.length,
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
    },
    detail: async (req, res) => {
        const userId = req.params.id;
        try {
            const user = await Users.findByPk(userId, {
                attributes: {
                    exclude: ['contrasenia', 'borrado', 'categoria'], 
                },
            });
    
            if (!user) {
                return res.send(error);
            }
    
            // cuando este la tabla imagen hacer esta parte
            //const perfilImageUrl = `/path/image/${user.image}`;
    
            const response = {
                id: user.id,
                first_name: user.first_name,
                last_name: user.last_name,
                correo: user.correo,
                image_url: profileImageUrl,
                cuil: user.cuil,
                direccion: user.direccion,
                fecha_nacimiento: user.fecha_nacimiento,
                
            };
    
            return res.json(response);
        } catch (error) {
            console.error(error);
            
        }
    }

}


