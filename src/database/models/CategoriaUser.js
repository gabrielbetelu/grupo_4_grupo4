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
            type: dataTypes.STRING(100),
            allowNull: false
        },
        
        borrado:{
            type: dataTypes.TINYINT(1)
        }
        
    };

    let config = {
        timestamps: true,
        freezeTableName: true,
        tablename: 'categoriauser',
        paranoid: true,        
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