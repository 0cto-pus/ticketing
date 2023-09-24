import express from "express";

import { currentUser } from "@eettickets/common";
import { requireAuth } from "@eettickets/common";

const router = express.Router();

router.get("/api/users/currentuser", currentUser, requireAuth, (req, res) => {
  res.send({ currentUser: req.currentUser || null });
});

export { router as currentUserRouter };
