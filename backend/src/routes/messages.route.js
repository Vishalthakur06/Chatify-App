import express from "express";
import { recieve, send } from "../controllers/message.controller.js";
const router = express.Router();

router.get("/send", send);

router.get("/recieve", recieve);

export default router;
