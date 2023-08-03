import asyncErrorWrapper from "express-async-handler";
import db from "../models/index.js";
import { Op } from "sequelize";

const PostModel = db.posts;
const CommentModel = db.comments;
const UserModel = db.comments;

const create = asyncErrorWrapper(async (req, res) => {
  const info = req.body;

  const post = await PostModel.create({
    ...info,
    userId: req.user.userId,
  });

  return res.status(201).json({
    success: true,
    post,
  });
});

const update = asyncErrorWrapper(async (req, res) => {
  const { post_id } = req.params;

  const { title, content } = req.body;

  const post = await PostModel.update(
    {
      title,
      content,
    },
    {
      where: {
        id: post_id,
      },
    }
  );

  return res.status(200).json({
    success: true,
    message: "The post has been successfully updated!",
    post,
  });
});

const deletePost = asyncErrorWrapper(async (req, res) => {
  const { post_id } = req.params;

  await PostModel.destroy({
    where: {
      id: post_id,
    },
  });

  return res.status(200).json({
    success: true,
    message: "The post has been deleted",
  });
});


const lastPosts = asyncErrorWrapper(async (req, res) => {
  const posts = await PostModel.findAll({
    order: [["createdAt", "DESC"]],
    include:[{all:true}],
  });

  return res.status(200).json({
    success: true,
    posts,
  });
});

const businessPosts = asyncErrorWrapper(async (req, res) => {
  const posts = await PostModel.findAll({
    order: [["createdAt", "DESC"]],
    include:[{all:true}],
    where: {
      category: "Business",
    },
  });

  return res.status(200).json({
    success: true,
    posts,
  });
});

const aiPosts = asyncErrorWrapper(async (req, res) => {
  const posts = await PostModel.findAll({
    order: [["createdAt", "DESC"]],
    include:[{all:true}],
    where: {
      category: "Artifical Intelligence"
    }
  });

  return res.status(200).json({
    success: true,
    posts,
  });
});

const moneyPosts = asyncErrorWrapper(async (req, res) => {
  const posts = await PostModel.findAll({
    order: [["createdAt", "DESC"]],
    include:[{all:true}],
    where: {
      category: "Money",
    },
  });

  return res.status(200).json({
    success: true,
    posts,
  });
});

const technologyPosts = asyncErrorWrapper(async (req, res) => {
  const posts = await PostModel.findAll({
    order: [["createdAt", "DESC"]],
    include:[{all:true}],
    where: {
      category: "Technology",
    },
  });

  return res.status(200).json({
    success: true,
    posts,
  });
});

const onePost = asyncErrorWrapper(async (req, res) => {
  const {id} = req.params;

  const post = await PostModel.findOne({
    include:[{all:true}],
    where: {
      id,
    }
  })

  return res.status(200).json({
    success:true,
    post
  })
})

const searchPosts = asyncErrorWrapper(async (req, res) => {
  const { term } = req.query;

  const posts = await PostModel.findAll({
    order: [["createdAt", "DESC"]],
    where: {
      content: {
        [Op.like] : '%' + term + '%'
      }
    }
  })

  return res.status(200).json({
    success: true,
    posts
  })

})

export {
  create,
  update,
  deletePost,
  lastPosts,
  businessPosts,
  aiPosts,
  moneyPosts,
  technologyPosts,
  onePost,
  searchPosts
};
