import asyncErrorWrapper from "express-async-handler";
import db from "../models/index.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const UserModel = db.users;
const PostModel = db.posts;
const CommentModel = db.comments;

const register = asyncErrorWrapper(async (req, res) => {
  const {fullName, email, userName, password, confirmPassword} = req.body;

  if(password != confirmPassword){
    return new Error("Passwords doesn't matches")
  }

  const user = await UserModel.create({
    fullName,
    email,
    userName,
    password: await bcrypt.hash(password, 10),
  });

  if (user) {
    let token = jwt.sign(
      {
        id: user.id,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );

    res
      .status(201)
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .json({
        success: true,
        access_token: token,
        data: {
          fullName: user.fullName,
          email: user.email,
        },
      });
  }
});

const login = asyncErrorWrapper(async (req, res) => {
  const { email, password } = req.body;

  const user = await UserModel.findOne({
    where: {
      email,
    },
  });

  if (!user) {
    return res
      .status(404)
      .json({ success: false, message: "Please provide your credentials" });
  }

  const isSame = await bcrypt.compare(password, user.password);
  console.log(isSame);
  if (!isSame) {
    return res
      .status(404)
      .json({ success: false, message: "Please provide your credentials" });
  }

  let token = jwt.sign(
    {
      id: user.id,
    },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: "1h",
    }
  );

  res
    .status(200)
    .cookie("access_token", token, {
      httpOnly: true,
    })
    .json({
      success: true,
      access_token: token,
      data: {
        fullName: user.fullName,
        email: user.email,
      },
    });
});

const logout = asyncErrorWrapper(async (req, res) => {
  return res
    .status(200)
    .cookie("access_token", "none", {
      httpOnly: true,
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "Logout Successfull",
    });
});

const profile = asyncErrorWrapper(async (req, res) => {
  const user = await UserModel.findOne({
    where: {
      id: req.user.userId,
    },
  });

  console.log(req.user.userId)
  return res.status(200).json({
    success: true,
    user,
  });
});

const update = asyncErrorWrapper(async (req, res) => {
  const info = req.body;

  const user = await UserModel.update(
    {
      ...info
    },
    {
      where: {
        id: req.user.userId,
      },
    }
  );

  return res.status(200).json({
    success: true,
    user,
  });
});

const updatePassword = asyncErrorWrapper(async (req, res) => {
  const { newPassword, confirmNewPassword } = req.body;

  if (newPassword !== confirmNewPassword) {
    return new Error("Passwords doesn't matches");
  }

  await UserModel.update(
    {
      password: await bcrypt.hash(newPassword, 10),
    },
    {
      where: {
        id: req.user.userId,
      },
    }
  );

  return res.status(200).json({
    success: true,
    message: "User info has been successfully updated!",
  });
});

const deleteAccount = asyncErrorWrapper(async (req, res) => {
  await UserModel.destroy({
    where: {
      id: req.user.userId,
    },
  });
  console.log(req.user.userId);
  return res.status(200).json({
    success: true,
    message: "User has been deleted!",
  });
});

const myPosts = asyncErrorWrapper(async (req, res) => {
  const posts = await PostModel.findAll({
    where: {
      userId: req.user.userId,
    },
  });

  return res.status(200).json({
    success: true,
    posts,
  });
});

const myComments = asyncErrorWrapper(async (req, res) => {
  const comments = await CommentModel.findAll({
    where: {
      userId: req.user.userId,
    },
  });

  return res.status(200).json({
    success: true,
    comments,
  });
});

export {
  register,
  login,
  logout,
  profile,
  update,
  updatePassword,
  deleteAccount,
  myPosts,
  myComments,
};
