import { Router, type IRouter } from "express";
import healthRouter from "./health";
import projectsRouter from "./projects";
import experienceRouter from "./experience";
import publicationsRouter from "./publications";
import postsRouter from "./posts";
import contactRouter from "./contact";
import skillsRouter from "./skills";
import statsRouter from "./stats";

const router: IRouter = Router();

router.use(healthRouter);
router.use(projectsRouter);
router.use(experienceRouter);
router.use(publicationsRouter);
router.use(postsRouter);
router.use(contactRouter);
router.use(skillsRouter);
router.use(statsRouter);

export default router;
