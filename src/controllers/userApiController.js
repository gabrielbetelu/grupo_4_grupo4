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
            const data = await Users.findAll()
            response.count = data.length;
            
                        
            const usuario = data.map(user => ({
                id: user.id,
                name: user.first_name, 
                email: user.correo, 
                detail: `/api/user/${user.id}`
            }));
    
            response.data = usuario;

            console.log(data)
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

        //const userImage = await Users.findOne({ where: { id: user.id } });
        const perfilImagen = `/images/${user.image}`;
        const response = {
            id: user.id,
            name: user.first_name,
            email: user.correo,
            imagenPerfil: perfilImagen,
            //imagen: userImage ? `/api/user/${user.id}/image` : null,
        };
        /*
        const perfilImagen = `/path/to/images/${user.image}`;

        const response = {
            id: user.id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.correo,
            image_url: perfilImagen,
          */

        return res.json(response);

        } catch (error) {
            console.error(error);
            
        }
    },
};

