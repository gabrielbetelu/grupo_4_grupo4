const path = require ('path');
const db = require('../database/models');
const sequelize = db.sequelize;



const Products = db.Product; 
const CategoriasProduct = db.CategoriaProduct;
const CategoriaProducto = db.CategoriaProducto;
const Fotos = db.Foto;




module.exports = {
    
    list: async (req , res) => {
        const response = {
            success : true,
            endPoint: '/api/product',
        }
        try {
            const data = await Products.findAll();
            response.count = data.length;
            const productitoCat= await CategoriasProduct.findAll();
            const productosCategory = await CategoriaProducto.findAll();
            const fotosProductos = await Fotos.findAll();
            
            const countByCategory = productitoCat.map(row => {
                const contador = productosCategory.filter(category => category.id_categoriaproduct == row.id).length;
                return { categoria: row.categoria, contador: contador };
            });
            
            response.countByCategory = countByCategory;
            
            const producto = data.map(detalle => ({
                id: detalle.id,
                name: detalle.nombre_producto, 
                descripcion: detalle.detalle, 
                imagenes: fotosProductos.filter(imagen => imagen.id_producto == detalle.id),
                detail: `/api/product/${detalle.id}`
            }));    

            response.data = producto;
            return res.json(response);
        } catch (error) {
            response.success = false;
            response.msg = 'Error';
            return res.json(response);
        }
    }
    
}
