const path = require ('path');
const db = require('../database/models');
const sequelize = db.sequelize;
const Products = db.Product; 
const Categorias = db.CategoriaProduct;

module.exports = {
    list: async (req , res) => {
        const response = {
            success : true,
            endPoint: '/api/product',
        }
        try {
            const data = await Products.findAll({include: [{association:'productoFoto'}]});
            response.count = data.length;
            const productitoCat= await Categorias.findAll({include: [{association:'productos'}]});
    //        const fotosProductos = await Fotos.findAll({include: [{association:'fotoProducto'}]});
            response.countByCategory = {};
            productitoCat.forEach(categoria => {
                response.countByCategory[categoria.categoria]=categoria.productos.length
            })
            const producto = data.map(detalle => ({
                id: detalle.id,
                name: detalle.nombre_producto, 
                descripcion: detalle.detalle,
                imagenes: detalle.productoFoto[0],
                detail: `/api/product/${detalle.id}`,
                urlImagenes: '/public'+detalle.productoFoto[0].imagen_producto,
            }));  
            response.data = producto;
            return res.json(response);
        } catch (error) {
            response.success = false;
            response.msg = 'Error';
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
