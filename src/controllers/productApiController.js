const path = require ('path');
const db = require('../database/models');
const sequelize = db.sequelize;
const Products = db.Product; 
const Categorias = db.CategoriaProduct;

module.exports = {
    list: async (req , res) => {
        const response = { data : {
            success : true,
            endPoint: '/api/product',
            }
        }
        const PAGE_SIZE = 10; 
        const page = parseInt(req.query.page) || 1; 
        const offset = (page - 1) * PAGE_SIZE;
        try {
/*            const { count, rows: data } = await Products.findAndCountAll({
                limit: PAGE_SIZE,
                offset: offset,
                include: [{ association: 'productoFoto' }],
                distinct:true
            });
*/

            let prods  = await Products.findAll();
            let contador = prods.length;
            prods = "";
            const data  = await Products.findAll({
                limit: PAGE_SIZE,
                offset: offset,
                include: [{ association: 'productoFoto' }],
            });


    //        console.log(data);
            const totalPages = Math.ceil(contador / PAGE_SIZE);
    //        const registrosPage = ((page == totalPages)? contador-(page - 1) * PAGE_SIZE : PAGE_SIZE )
            response.data.count = data.length;
    //        response.registrosPage = registrosPage;
            response.data.currentPage = page;
            response.data.totalPages = totalPages;
            if (page < totalPages) {
                response.data.next = `/api/product?page=${page + 1}`;
            }
            if (page > 1) {
                response.data.previous = `/api/product?page=${page - 1}`;
            }
            const productitoCat= await Categorias.findAll({include: [{association:'productos'}]});
            response.data.countByCategory = {};
            productitoCat.forEach(categoria => {
                response.data.countByCategory[categoria.categoria]=categoria.productos.length
            })
            const producto = data.map(detalle => ({
                id: detalle.id,
                name: detalle.nombre_producto, 
                descripcion: detalle.detalle,
                imagenes: detalle.productoFoto[0],
                detail: `/api/product/${detalle.id}`,
                urlImagenes: detalle.productoFoto[0].imagen_producto,
            }));  
            response.data.data = producto;
            return res.json(response);
        } catch (error) {
            response.data.success = false;
            response.data.msg = 'Error';
            return res.json(response);
        }
    },
    
    detail: async (req, res) => {
        const producId = req.params.id
        try {
            const productoBuscado = await Products.findByPk(producId, {
                include: [{association: 'productoFoto'},{association: 'productoMarca'}],
                attributes: {exclude: ['precio_producto' , 'borrado', 'id_marca', 'created_at', 'updated_a' , 'deleted_at']},
            })
            productoBuscado.dataValues.imagenes = `/public${productoBuscado.productoFoto[0].imagen_producto}`;
            const response = {
                data: productoBuscado,
            }
            return res.json(response)
        } catch (error) {
            console.log(error)
        }
    }   
}
