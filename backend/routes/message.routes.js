import express from "express"
import { sendMessage, getMessages, getAllConversationsOfUser } from "../controllers/messages.controller.js";
import protectedRoute from "../middlewares/protectedRoute.js";

const router = express.Router();

router.get("/:id", protectedRoute, getMessages);
router.post("/send/:id", protectedRoute, sendMessage);
router.get("/", protectedRoute, getAllConversationsOfUser);

export default router;