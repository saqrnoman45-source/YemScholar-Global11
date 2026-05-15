import { Router, type IRouter } from "express";
import healthRouter from "./health";
import authRouter from "./auth";
import coursesRouter from "./courses";
import scholarshipsRouter from "./scholarships";
import articlesRouter from "./articles";
import skillsRouter from "./skills";
import adminRouter from "./admin";

const router: IRouter = Router();

router.use(healthRouter);
router.use(authRouter);
router.use(coursesRouter);
router.use(scholarshipsRouter);
router.use(articlesRouter);
router.use(skillsRouter);
router.use(adminRouter);

export default router;
