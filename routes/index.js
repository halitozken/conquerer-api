import express from "express";
import auth from "./auth.js"
import post from "./post.js"

const router = express.Router();
router.use("/post", post);
router.use("/auth", auth);

export default router;