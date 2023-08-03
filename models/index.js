import { Sequelize, DataTypes } from "sequelize";
import UserModel from "./User.js";
import PostModel from "./Post.js";
import CommentModel from "./Comment.js";

const sequelize = new Sequelize({
  host: "localhost",
  port: 5432,
  database: "conquerer",
  username: "postgres",
  password: "postgres",
  dialect: "postgres",
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Successfully connected to db.");
  })
  .catch((err) => {
    console.log("Unable to connect to the database:" + err);
  });

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = UserModel(sequelize, DataTypes);
db.posts = PostModel(sequelize, DataTypes);
db.comments = CommentModel(sequelize, DataTypes);

db.sequelize.sync({ force: false }).then(() => {
  console.log("re sync done");
});

// User's Posts
db.users.hasMany(db.posts, {
  foreignKey: {
    type: DataTypes.UUID,
    allowNull: false,
    name: "userId",
  },
  as: "post",
});

db.posts.belongsTo(db.users, {
  foreignKey: {
    type: DataTypes.UUID,
    allowNull: false,
    name: "userId",
  },
  as: "user",
});

// User's Comments
db.users.hasMany(db.comments, {
  foreignKey: {
    type: DataTypes.UUID,
    allowNull: false,
    name: "userId",
  },
  as: "comment",
});

db.comments.belongsTo(db.users, {
  foreignKey: {
    type: DataTypes.UUID,
    allowNull: false,
    name: "userId",
  },
  as: "user",
});

// Post's Comments

db.posts.hasMany(db.comments, {
  foreignKey: {
    type: DataTypes.UUID,
    allowNull: false,
    name: "postId",
  },
  as: "comment",
});

db.comments.belongsTo(db.posts, {
  foreignKey: {
    type: DataTypes.UUID,
    allowNull: false,
    name: "postId",
  },
  as: "post",
});

export default db;