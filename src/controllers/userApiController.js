const path = require ('path');
const db = require('../database/models');
const sequelize = db.sequelize;
const Users = db.User; 

module.exports = {
    
    list: async (req , res) => {
        const response = { data : {
            success : true,
            endPoint: '/api/user',
            nameDB: 'User',
            }            
        }

        try {
    
            const data  = await Users.findAll({
            });
            console.log(data)
            response.data.count = data.length;
            const usuario = data.map(user => ({
                id: user.id,
                name: user.first_name, 
                email: user.correo, 
                detail: `/api/user/${user.id}`,
                urlImagenes: `/images/${user.image}`,
            }));
            response.data.data = usuario;
            console.log(data)
            return res.json(response);

        } catch (error) {
            response.data.success = false;
            response.data.msg = 'Hubo un error';
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
        const perfilImagen = `/images/${user.image}`;
        const response = {
            id: user.id,
            name: user.first_name,
            email: user.correo,
            imagenPerfil: perfilImagen,
        };
        return res.json(response);

        } catch (error) {
            console.error(error);
            
        }
    },
};


