import { Router } from "express";
import * as authCtrl from "../controllers/auth.controller.js";
import { verifySignup } from "../middlewares/index.js";
import { verifyToken } from "../middlewares/authJwt.js";

const router = Router();

router.post("/signin", authCtrl.signin);

router.post(
  "/signup",
  [verifySignup.checkDuplicateDocumentOrEmail, verifySignup.checkRolesExisted],
  authCtrl.signup
);

router.put("/profile/:id", verifyToken, authCtrl.profileUpdate);

router.get("/profile", verifyToken, authCtrl.profile);


export default router;
