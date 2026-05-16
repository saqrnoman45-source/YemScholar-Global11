import { Router, type IRouter } from "express";
import healthRouter from "./health";
import authRouter from "./auth";
import coursesRouter from "./courses";
import scholarshipsRouter from "./scholarships";
import articlesRouter from "./articles";
import skillsRouter from "./skills";
import adminRouter from "./admin";
import lessonsRouter from "./lessons";
import bookmarksRouter from "./bookmarks";
import certificatesRouter from "./certificates";
import testScoresRouter from "./test-scores";
import aiRouter from "./ai";

const router: IRouter = Router();

router.use(healthRouter);
router.use(authRouter);
router.use(coursesRouter);
router.use(scholarshipsRouter);
router.use(articlesRouter);
router.use(skillsRouter);
router.use(adminRouter);
router.use(lessonsRouter);
router.use(bookmarksRouter);
router.use(certificatesRouter);
router.use(testScoresRouter);
router.use(aiRouter);

export default router;
