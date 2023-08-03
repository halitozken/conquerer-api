export default (sequelize, DataTypes) => {
  const Post = sequelize.define(
    "post",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      content: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      category: {
        type: DataTypes.ENUM(
          "Artifical Intelligence",
          "Business",
          "Money",
          "Technology"
        ),
        allowNull: false,
      },
      commentCount: {
        type: DataTypes.INTEGER,
      },
    },
    { timestamps: true, 
      paranoid: true, 
      deletedAt: "softDelete" }
  );

  return Post;
};
