module.exports = (sequelize, dataTypes) => {
    let alias = 'CategoriaProduct'; 
    let cols = {
        id: {
            type: dataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        
        categoria: {
            type: dataTypes.STRING(100),
            allowNull: false
        },

        borrado:{
            type: dataTypes.TINYINT(1)
        }
        
    };

    let config = {
    //    freezeTableName: true,
        tablename: 'categoriaProducts',
        timestamps: true,
        paranoid: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at'
    }
    const CategoriaProduct = sequelize.define(alias,cols,config);

    CategoriaProduct.associate= (models)=>{
        CategoriaProduct.belongsToMany(models.Product,
            
            {
                as:"productos",
                through: "categorias-products",
                foreignKey:"id_categoriaproduct",
                otherKey:"id_product"
                //timestamps:true
            })
            
            
        }

    return CategoriaProduct
};