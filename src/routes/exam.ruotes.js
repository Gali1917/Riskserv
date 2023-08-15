import { Router } from "express";
import * as examCtrl from "../controllers/exam.controller.js";
import { authJwt } from "../middlewares/index.js";

const router = Router();

router.get('/', examCtrl.getExams)

router.get('/:id', examCtrl.getExam);

router.post('/', [authJwt.verifyToken], examCtrl.createExam);

router.delete('/:id', [authJwt.verifyToken], examCtrl.removeExam);

router.put('/:id', [authJwt.verifyToken], examCtrl.updateExam);

export default router;