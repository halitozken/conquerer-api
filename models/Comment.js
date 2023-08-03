export default (sequelize, DataTypes) => {
    const Comment = sequelize.define('comment', {
        id:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        content: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },{timestamps:true})

    return Comment;
}
