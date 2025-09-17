import express from "express";
const router = express.Router();

router.get("/send", (req, res) => {
  res.send("Sending message");
});

router.get("/recieve", (req, res) => {
  res.send("Recieving message");
});

export default router;
