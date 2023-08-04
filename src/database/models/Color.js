const Producto = require("./Producto");


module.exports = (sequelize, dataTypes) => {
    let alias = 'Color'; 
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
        descripcion: {
            type: dataTypes.VARCHAR(255),
            allowNull: false
        },
        
    
    };

    let config = {
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at'
    }
    const Color = sequelize.define(alias,cols,config);

    Color.associate= (models)=>{
        Color.belongsToMany(models.Producto,
            
            {
                through:'product-talle-color',
                foreignKey:'id_color',
                otherKey:'id_product'
            }) 

        }

    return Color
};