const path = require ('path');
const db = require('../database/models');
const sequelize = db.sequelize;
const Users = db.User; 

module.exports = {
    
    list: async (req , res) => {
        const response = { data : {
            success : true,
            endPoint: '/api/user',
            }            
        }
        const PAGE_SIZE = 10;   
        const page = parseInt(req.query.page) || 1; 
        const offset = (page - 1) * PAGE_SIZE;
        
        try {
    /*        const { count, rows: data } = await Users.findAndCountAll({
                limit: PAGE_SIZE,
                offset: offset,
            });
    */        
        //    const totalData = await Users.findAll();
        //    response.data.count = totalData.length;
            
    /*        const { countPage, rows: data } = await Users.findAndCountAll({
                limit: PAGE_SIZE,
                offset: offset,
            });
            const totalPages = Math.ceil(countPage / PAGE_SIZE);
            */

            let usrs  = await Users.findAll();
            let contador = usrs.length;
            console.log("*************  usrs  ********************")
            console.log(usrs)
            console.log("*************  FIN usrs  ********************")
            usrs = "";
            const data  = await Users.findAll({
                limit: PAGE_SIZE,
                offset: offset,
            });
            
            const totalPages = Math.ceil(contador / PAGE_SIZE);

            response.data.count = data.length;
            response.data.currentPage = page;
            response.data.totalPages = totalPages;

            if (page < totalPages) {
                response.data.next = `/api/user?page=${page + 1}`;
            }
            if (page > 1) {
                response.data.previous = `/api/user?page=${page - 1}`;
            }
        //    response.data.count = data.length;
            //const data = await Users.findAll()
            const usuario = data.map(user => ({
                id: user.id,
                name: user.first_name, 
                email: user.correo, 
                detail: `/api/user/${user.id}`
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



