module.exports = (sequelize, dataTypes) => {
    let alias = 'Product-ticket'; 
    let cols = {
        id: {
            type: dataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        
        id_product: {
            type: dataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        id_ticket: {
            type: dataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        cantidad: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        precio_unitario: {
            type: dataTypes.DECIMAL(8, 2),
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
        Producto.belongsToMany(models.Categoria-Producto,
            
            {
                as:"productos",
                foreignKey:"id_product",
            }) 

            // Movie.belongsToMany(models.Actor,{

            //     through:'Actor_Movie',
            //     foreignKey:'movie_id',
            //     otherKey:'actor_id'
            // })
        }

    return Producto
};