import express from "express";
import {create, update, deleteComment} from "../controllers/comment.js"
import { getAccessToRoute, getCommentOwnerAccess } from "../middlewares/authorization/auth.js";

const router = express.Router({mergeParams: true});

router.post("/create", getAccessToRoute, create);
router.put("/:comment_id/update", [getAccessToRoute, getCommentOwnerAccess], update)
router.delete("/:comment_id/delete", [getAccessToRoute, getCommentOwnerAccess], deleteComment)

export default router;