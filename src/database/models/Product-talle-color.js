module.exports = (sequelize, dataTypes) => {
    let alias = 'Product-talle-color'; 
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
        id_talle: {
            type: dataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        stock: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        id_color: {
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