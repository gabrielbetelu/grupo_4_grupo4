module.exports = (sequelize, dataTypes) => {
    let alias = 'Producto'; 
    let cols = {
        id: {
            type: dataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        
        nombre_producto: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        detalle: {
            type: dataTypes.STRING(255),
            allowNull: false
        },
        imagenes_producto: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        precio_producto: {
            type: dataTypes.DECIMAL(8, 2),
            allowNull: false
        },
        borrado: {
            type: dataTypes.TINYINT(1),
            allowNull: false
        },
        id_marca: {
            type: dataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
    
    };

    let config = {
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at'
    }
    const Producto = sequelize.define(alias,cols,config);

    Producto.associate= (models)=>{
        Producto.belongsToMany(models.CategoriaProduct,
            
            {
                as:"categoriasproductos",
                through: "categorias-products",
                foreignKey:"id_product",
                otherKey:"id_categoriaproduct"
                //timestamps:true
            }) 

        Producto.belongsToMany(models.Ticket,
        
            {
                as:"ticketsProductos",
                through: "products_tickets",
                foreignKey:"id_product",
                otherKey:"id_ticket"
                //timestamps:true
            }) 
            
        Producto.belongsTo(models.Marca,
        
            {
                as:"productoMarca",
                foreignKey:"id_marca",
            }) 

        Producto.belongsToMany(models.Color,
        
            {
                as:"coloresProductos",
                through: "product-talle-color",
                foreignKey:"id_product",
                otherKey:"id_color"
                //timestamps:true
            }) 

        Producto.belongsToMany(models.Talle,
        
            {
                as:"tallesProductos",
                through: "product-talle-color",
                foreignKey:"id_product",
                otherKey:"id_talle"
                 //timestamps:true
            }) 
            
    

        }

    return Producto
};