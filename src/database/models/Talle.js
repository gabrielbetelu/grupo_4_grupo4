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
        
    };

    let config = {
        timestamps: true,
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

        }

    return Talle
};