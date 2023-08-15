module.exports = (sequelize, dataTypes) => {
    let alias = 'ProductTalleColor'; 
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
        freezeTableName: true,
        tableName: 'products-talles-colores',
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at'
    }
    const ProductTalleColor = sequelize.define(alias,cols,config);

    return ProductTalleColor
};