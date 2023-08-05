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
        CategoriaUser.hasMany(models.User,
            
            {
                as:"categoriaUsuario",
                foreignKey:"id_categoria_user",
            }) 

            
        }

    return CategoriaUser
};