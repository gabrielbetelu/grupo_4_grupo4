module.exports = (sequelize, dataTypes) => {
    let alias = 'Product'; 
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
            type: dataTypes.STRING(255),
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
        tableName: 'products',
        freezzeTableName: true,
        paranoid: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at'
    }
    const Product = sequelize.define(alias,cols,config);

    Product.associate= (models)=>{
        Product.belongsToMany(models.CategoriaProduct,
            
            {
                as:"categoriasproductos",
                through: "categorias-products",
                foreignKey:"id_product",
                otherKey:"id_categoriaproduct"
                //timestamps:true
            }) 

        Product.belongsToMany(models.Ticket,
        
            {
                as:"ticketsProductos",
                through: "products_tickets",
                foreignKey:"id_product",
                otherKey:"id_ticket"
                //timestamps:true
            }) 
            
        Product.belongsTo(models.Marca,
        
            {
                as:"productoMarca",
                foreignKey:"id_marca",
            }) 

        Product.belongsToMany(models.Color,
        
            {
                as:"coloresProductos",
                through: "product-talle-color",
                foreignKey:"id_product",
                otherKey:"id_color"
                //timestamps:true
            }) 

        Product.belongsToMany(models.Talle,
        
            {
                as:"tallesProductos",
                through: "product-talle-color",
                foreignKey:"id_product",
                otherKey:"id_talle"
                 //timestamps:true
            }) 
            
    

        }

    return Product
};