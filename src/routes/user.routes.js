import { Router } from "express";
import * as userCtrl from "../controllers/user.controllers.js";
import { authJwt, verifySignup} from "../middlewares/index.js";

const router = Router();

router.post("/", [authJwt.verifyToken, authJwt.isAdmin, verifySignup.checkRolesExisted], userCtrl.createUser);

router.delete("/:id", [authJwt.verifyToken], userCtrl.deleteUserAndTasks);

router.get("/:id", userCtrl.getUserId);
router.get("/", userCtrl.getUsers);



export default router;
