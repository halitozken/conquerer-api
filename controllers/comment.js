import asyncErrorWrapper from "express-async-handler";
import db from "../models/index.js";

const CommentModel = db.comments;
const PostModel = db.posts;

const create = asyncErrorWrapper(async (req, res) => {
  const { post_id } = req.params;
  const content = req.body.content;

  const comment = await CommentModel.create({
    postId: post_id,
    userId: req.user.userId,
    content,
  });

  const posts = await PostModel.findOne({
    where: {
      id: post_id,
    },
    include: [
      {
        model: CommentModel,
        as: "comment",
      },
    ],
  });

  await PostModel.update(
    {
      commentCount: posts.comment.length,
    },
    {
      where: {
        id: post_id,
      },
    }
  );

  return res.status(201).json({
    success: true,
    comment,
  });
});

const update = asyncErrorWrapper(async (req, res) => {
  const { comment_id } = req.params;
  const { content } = req.body;

  const comment = await CommentModel.update(
    {
      content,
    },
    {
      where: {
        id: comment_id,
      },
    }
  );

  return res.status(200).json({
    success: true,
    comment,
  });
});

const deleteComment = asyncErrorWrapper(async (req, res) => {
  const { post_id, comment_id } = req.params;

  await CommentModel.destroy({
    where: {
      id: comment_id,
    },
  });

  const posts = await PostModel.findOne({
    where: {
      id: post_id,
    },
    include: [
      {
        model: CommentModel,
        as: "comment",
      },
    ],
  });

  await PostModel.update(
    {
      commentCount: posts.comment.length,
    },
    {
      where: {
        id: post_id,
      },
    }
  );

  return res.status(200).json({
    success: true,
    message: "Comment has been deleted!",
  });
});

export { create, update, deleteComment };
