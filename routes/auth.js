import express from "express";
import {
  register,
  login,
  logout,
  profile,
  update,
  deleteAccount,
  updatePassword,
  myPosts,
  myComments,
} from "../controllers/auth.js";
import { getAccessToRoute } from "../middlewares/authorization/auth.js";
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", getAccessToRoute, logout);
router.get("/profile", getAccessToRoute, profile);
router.put("/update", getAccessToRoute, update);
router.put("/updatePassword", getAccessToRoute, updatePassword);
router.delete("/delete", getAccessToRoute, deleteAccount);

router.get("/my-posts", getAccessToRoute, myPosts);
router.get("/my-comments", getAccessToRoute, myComments);

export default router;
