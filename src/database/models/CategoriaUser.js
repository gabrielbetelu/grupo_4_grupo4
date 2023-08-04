module.exports = (sequelize, dataTypes) => {
    let alias = 'CategoriaUser'; 
    let cols = {
        id: {
            type: dataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        
        categoria: {
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
    const CategoriaUser = sequelize.define(alias,cols,config);

    CategoriaUser.associate= (models)=>{
        CategoriaUser.belongsToMany(models.Categoria-Producto,
            
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

    return CategoriaUser
};