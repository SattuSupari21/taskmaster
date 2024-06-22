import { Request, Response } from "express";

type TaskType = {
  id: string;
  taskName: string;
  taskDescription: string;
  status: "completed" | "todo" | "in-progress";
  dueDate: Date;
};

const tasks: TaskType[] = [
  {
    id: "1",
    taskName: "Task 1",
    taskDescription: "This is the description of task 1",
    status: "completed",
    dueDate: new Date(),
  },
  {
    id: "2",
    taskName: "Task 2",
    taskDescription: "This is the description of task 2",
    status: "in-progress",
    dueDate: new Date(),
  },
  {
    id: "3",
    taskName: "Task 3",
    taskDescription: "This is the description of task 3",
    status: "todo",
    dueDate: new Date(),
  },
];

export const getAllTasks = async (req: Request, res: Response) => {
  return res.json(tasks);
};

export const getTaskById = async (req: Request, res: Response) => {
  const taskId = req.query.id;
  const task = tasks.find((t) => t.id === taskId);
  return res.json(task);
};
