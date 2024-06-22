import { Router } from "express";
import { getAllTasks, getTaskById } from "../controllers/taskController";

const taskRouter = Router();

taskRouter.route("/getAllTasks").get(getAllTasks);
taskRouter.route("/getTaskById").get(getTaskById);

export default taskRouter;
