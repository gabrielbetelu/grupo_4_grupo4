const path = require ('path');
const db = require('../database/models');
const sequelize = db.sequelize;
const Users = db.User; 

module.exports = {
    
    list: async (req , res) => {
        const response = {
            success : true,
            endPoint: '/api/user',
        }
        const PAGE_SIZE = 10;   
        const page = parseInt(req.query.page) || 1; 
        const offset = (page - 1) * PAGE_SIZE;
        
        try {
            const totalData = await Users.findAll();
            response.count = totalData.length;
            
            const { countPage, rows: data } = await Users.findAndCountAll({
                limit: PAGE_SIZE,
                offset: offset,
            });
            const totalPages = Math.ceil(countPage / PAGE_SIZE);

            response.countPage = countPage;
            response.currentPage = page;
            response.totalPages = totalPages;

            if (page < totalPages) {
                response.next = `/api/user?page=${page + 1}`;
            }
            if (page > 1) {
                response.previous = `/api/user?page=${page - 1}`;
            }

            //const data = await Users.findAll()
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
        const perfilImagen = `/public/images/${user.image}`;
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



