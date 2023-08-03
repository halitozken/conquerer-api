import db from "../../models/index.js";
import asyncErrorWrapper from "express-async-handler";
import {
  getAccessTokenFromHeader,
  isTokenIncluded,
} from "../../helpers/authorization/tokenHelper.js";
import jwt from "jsonwebtoken";


const User = db.users;
const PostModel = db.posts;
const CommentModel = db.comments;


const getAccessToRoute = (req, res, next) => {
  const { JWT_SECRET_KEY } = process.env;

  if (!isTokenIncluded) {
    return next(new Error("You are not authorized to access this route"));
  }

  const accessToken = getAccessTokenFromHeader(req);

  jwt.verify(accessToken, JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      return next(new Error("You are not authorized to access this route"));
    }

    req.user = {
      userId: decoded.id,
      fullName: decoded.fullName,
    };

    next();
  });
};

const checkUserExist = asyncErrorWrapper(async (req, res, next) => {
  const user = await User.findOne({
    where: req.body.email,
  });

  if (user) {
    return res.status(409).json({
      success: false,
      message: "This email is already registered.",
    });
  }

  next();
});

const getPostOwnerAccess = asyncErrorWrapper(async (req, res, next) => {
  const {post_id} = req.params;

  const post = await PostModel.findOne({
    where: {
      id: post_id
    }
  })

  if(post.userId != req.user.userId){
    return next(new Error("Only owner can handle this operation"))
  }

  next();
})

const getCommentOwnerAccess = asyncErrorWrapper(async (req, res, next) => {
  const {comment_id} = req.params;

  const comment = await CommentModel.findOne({
    where: {
      id : comment_id
    }
  })

  if(comment.userId != req.user.userId){
    return next(new Error("Only owner can handle this operation"))
  }

  next();
})

export { checkUserExist, getPostOwnerAccess, getCommentOwnerAccess, getAccessToRoute };
