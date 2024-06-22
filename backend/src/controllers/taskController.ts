import { Request, Response } from "express";
import { prisma } from "../../lib/db";

type TaskType = {
  id: string;
  taskName: string;
  taskDescription: string;
  status: "completed" | "todo" | "in-progress";
  dueDate: Date;
  userId: number;
};

const tasks: TaskType[] = [
  {
    id: "1",
    taskName: "Task 1",
    taskDescription: "This is the description of task 1",
    status: "completed",
    dueDate: new Date(),
    userId: 1,
  },
  {
    id: "2",
    taskName: "Task 2",
    taskDescription: "This is the description of task 2",
    status: "in-progress",
    dueDate: new Date(),
    userId: 1,
  },
  {
    id: "3",
    taskName: "Task 3",
    taskDescription: "This is the description of task 3",
    status: "todo",
    dueDate: new Date(),
    userId: 1,
  },
];

export const getAllTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await prisma.task.findMany();
    return res.json({ status: "success", tasks });
  } catch (e) {
    return res.json({ status: "error", error: e });
  }
};

export const getTaskById = async (req: Request, res: Response) => {
  try {
    const taskId = req.params.id;
    const task = await prisma.task.findUnique({
      where: {
        id: taskId,
      },
    });
    return res.json({ status: "success", task });
  } catch (e) {
    return res.json({ status: "error", error: e });
  }
};

export const createTask = async (req: Request, res: Response) => {
  try {
    const { taskName, taskDescription, status, dueDate, userId } = req.body;
    const newEntry = await prisma.task.create({
      data: {
        taskName,
        taskDescription,
        status,
        dueDate,
        userId,
      },
    });
    return res.json({ status: "success", newEntry });
  } catch (e) {
    return res.json({ status: "error", error: e });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  try {
    // check if the task exists or not
    const taskId = req.params.id;
    const task = await prisma.task.findUnique({
      where: {
        id: taskId,
      },
    });

    if (!task) {
      return res.json({ status: "error" });
    }

    const { taskName, taskDescription, status, dueDate, userId } = req.body;
    const updatedEntry = await prisma.task.update({
      where: {
        id: taskId,
      },
      data: {
        taskName,
        taskDescription,
        status,
        dueDate,
        userId,
      },
    });
    return res.json({ status: "success", updatedEntry });
  } catch (e) {
    return res.json({ status: "error", error: e });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    // check if the task exists or not
    const taskId = req.params.id;
    const task = await prisma.task.findUnique({
      where: {
        id: taskId,
      },
    });

    if (!task) {
      return res.json({ status: "error" });
    }

    await prisma.task.delete({
      where: {
        id: taskId,
      },
    });
    return res.json({ status: "success" });
  } catch (e) {
    return res.json({ status: "error", error: e });
  }
};
