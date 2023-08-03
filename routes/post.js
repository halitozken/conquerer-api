import express from "express";
import comment from "../routes/comment.js";
import {
  create,
  update,
  deletePost,
  lastPosts,
  businessPosts,
  moneyPosts,
  technologyPosts,
  aiPosts,
  onePost,
  searchPosts
} from "../controllers/post.js";
import {
  getAccessToRoute,
  getPostOwnerAccess,
} from "../middlewares/authorization/auth.js";

const router = express.Router();

router.post("/create", getAccessToRoute, create);
router.put("/:post_id/update", [getAccessToRoute, getPostOwnerAccess], update);
router.delete(
  "/:post_id/delete",
  [getAccessToRoute, getPostOwnerAccess],
  deletePost
);

router.get("/:id/one", onePost)

router.get("/last", getAccessToRoute, lastPosts)
router.get("/business", getAccessToRoute, businessPosts);
router.get("/money", getAccessToRoute, moneyPosts);
router.get("/technology", getAccessToRoute, technologyPosts);
router.get("/ai", getAccessToRoute, aiPosts);

router.get("/search", getAccessToRoute, searchPosts)

router.use("/:post_id/comment", comment);

export default router;
