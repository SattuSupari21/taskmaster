import { Router } from "express";
import {
  createTask,
  deleteTask,
  getAllTasks,
  getTaskById,
  updateTask,
} from "../controllers/taskController";

const taskRouter = Router();

taskRouter.route("/getAllTasks").get(getAllTasks);
taskRouter.route("/getTaskById/:id").get(getTaskById);
taskRouter.route("/createTask").post(createTask);
taskRouter.route("/updateTask/:id").put(updateTask);
taskRouter.route("/deleteTask/:id").delete(deleteTask);

export default taskRouter;
