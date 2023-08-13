module.exports = (sequelize, dataTypes) => {
    let alias = 'Talle'; 
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
        tablename: 'talles',
        timestamps: true,
    //    freezeTableName: true,
        paranoid: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at'
    }
    const Talle = sequelize.define(alias,cols,config);

    Talle.associate= (models)=>{
        Talle.belongsToMany(models.Producto,
            
            {
                through:'product-talle-color',
                foreignKey:'id_talle',
                otherKey:'id_product'
            }) 
        Talle.belongsToMany(models.Color,
            
            {
                through:'product-talle-color',
                foreignKey:'id_talle',
                otherKey:'id_color'
            }) 

            

        }

    return Talle
};