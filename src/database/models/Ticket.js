module.exports = (sequelize, dataTypes) => {
    let alias = 'Ticket'; 
    let cols = {
        id: {
            type: dataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        
        numero: {
            type: dataTypes.BIGINT,
            allowNull: false
        },
        fecha: {
            type: dataTypes.DATE,
            allowNull: false
        },
        total: {
            type: dataTypes.DECIMAL(8, 2),
            allowNull: false
        },
        id_user: {
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
    const Ticket = sequelize.define(alias,cols,config);

    Ticket.associate= (models)=>{
        Ticket.belongsTo(models.User,            
            {
                as:"ticketUsuario",
                foreignKey:"id_user",
            }) 
        Ticket.belongsToMany(models.Product,
    
            {
                as:"productosTickets",
                through: "products_tickets",
                foreignKey:"id_ticket",
                otherKey:"id_product"
                //timestamps:true
            })

        }

    return Ticket
};