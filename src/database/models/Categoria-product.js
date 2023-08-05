module.exports = (sequelize, dataTypes) => {
    let alias = 'Categoria-producto'; 
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
        id_categoriaproduct: {
            type: dataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },

    
    };

    let config = {
        timestamps: false,
 /*       createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at' */
    }
    const CategoriaProducto = sequelize.define(alias,cols,config);
  

    return CategoriaProducto
};