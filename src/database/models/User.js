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
    const User = sequelize.define(alias,cols,config);

    User.associate= (models)=>{
        User.belongsTo(models.CategoriaUser,
            
            {
                as:"usuarios",
                foreignKey:"id_categoria_user",
            }) 

        }

    return User
};