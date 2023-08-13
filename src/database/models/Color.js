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
            type: dataTypes.STRING(100),
            allowNull: false
        },
        descripcion: {
            type: dataTypes.STRING(255),
            allowNull: false
        },
        
        borrado:{
            type: dataTypes.TINYINT(1)
        }
        
    
    };

    let config = {
        tablename: 'colors',
        timestamps: true,
        //    freezeTableName: true,
        paranoid: true,
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

        Color.belongsToMany(models.Talle,
        
            {
                as:"tallesColores",
                through: "product-talle-color",
                foreignKey:"id_color",
                otherKey:"id_talle"
                 //timestamps:true
            })  

        }

    return Color
};