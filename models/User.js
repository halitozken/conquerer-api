export default (sequelize, DataTypes) => {
    const User = sequelize.define("user", {
        id:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        fullName: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        userName: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            isEmail:true,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull:false,
            validate: {
                not: /^[0-9a-f]{64}$/i,
                min: 8
            }
        },
        birthday: {
            type: DataTypes.DATEONLY,
            allowNull: true
        }
     
    }, {timestamps : true})

    return User;
}