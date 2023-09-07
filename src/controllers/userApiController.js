const path = require ('path');
const db = require('../database/models');
const { error } = require('console');
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
            const data = await Users.findAll()
            response.data = data;
            response.count = data.length;
            //response.data.detail = '/:id';

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
                return  'Usuario no encontrado' 
            }

            //aca hacer la parte de la imagen de perfil cuando gabi tenga la tabla

            const response = {
                id: user.id,
                first_name: user.first_name,
                last_name: user.last_name,
                correo: user.correo,
                cuil: user.cuil,
                direccion: user.direccion,
                fecha_nacimiento: user.fecha_nacimiento,
                //agregar la img
            };

            return res.json(response);
        } catch (error) {
            console.error(error);
            
            
        }
    },
};

