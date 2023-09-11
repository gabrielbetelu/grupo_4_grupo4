module.exports = (sequelize, dataTypes) => {
    let alias = 'Foto'; 
    let cols = {
        id: {
            type: dataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        
        imagen_producto: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        
        id_producto: {
            type: dataTypes.INTEGER.UNSIGNED,
            allowNull: false
        }       
    };

    let config = {
        freezzeTableName: true,
        tablename: 'fotos',
        timestamps: true,
        
        paranoid: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at'
    }
    const Foto = sequelize.define(alias,cols,config);

    Foto.associate= (models)=>{
        Foto.belongsTo(models.Product,
            
            {
                as:"fotoProducto",
                foreignKey:"id_producto",
            }) 

        }

    return Foto
};