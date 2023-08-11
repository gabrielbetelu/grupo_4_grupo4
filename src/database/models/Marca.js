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
            type: dataTypes.STRING(100),
            allowNull: false
        },
        
        borrado:{
            type: dataTypes.TINYINT(1)
        }
        
    };

    let config = {
        tablename: 'marcas',
        timestamps: true,
        paranoid: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at'
    }
    const Marca = sequelize.define(alias,cols,config);

    Marca.associate= (models)=>{
        Marca.hasMany(models.Producto,
            
            {
                as:"marcaProducto",
                foreignKey:"id_marca",
            }) 

        }

    return Marca
};