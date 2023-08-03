module.exports = (sequelize, dataTypes) => {
    let alias = 'User'; 
    let cols = {
        id: {
            type: dataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        
        first_name: {
            type: dataTypes.VARCHAR(100),
            allowNull: false
        },
        last_name: {
            type: dataTypes.VARCHAR(100),
            allowNull: false
        },
        correo: {
            type: dataTypes.VARCHAR(100),
            allowNull: false
        },
        contrasenia: {
            type: dataTypes.VARCHAR(100),
            allowNull: false
        },
        image: {
            type: dataTypes.VARCHAR(100),
            allowNull: false
        },
        cuil: {
            type: dataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        direccion: {
            type: dataTypes.VARCHAR(255),
            allowNull: false
        },
        fecha_nacimiento: {
            type: dataTypes.DATE,
            allowNull: false
        },
        borrado: {
            type: dataTypes.TINYINT(1),
            allowNull: false
        },
        id_categoria_user: {
            type: dataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
    };

    let config = {
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at'
    }
    const Producto = sequelize.define(alias,cols,config);

    Producto.associate= (models)=>{
        Producto.belongsToMany(models.Categoria-Producto,
            
            {
                as:"productos",
                foreignKey:"id_product",
            }) 

            // Movie.belongsToMany(models.Actor,{

            //     through:'Actor_Movie',
            //     foreignKey:'movie_id',
            //     otherKey:'actor_id'
            // })
        }

    return Producto
};