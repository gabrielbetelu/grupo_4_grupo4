module.exports = (sequelize, dataTypes) => {
    let alias = 'Marca'; 
    let cols = {
        id: {
            type: dataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        
        nombre: {
            type: dataTypes.VARCHAR(100),
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