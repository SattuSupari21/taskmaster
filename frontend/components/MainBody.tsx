"use client";

import { useEffect, useState } from "react";
import TaskComponent from "./TaskComponent";

export default function MainBody() {
  type TaskType = {
    id: string;
    taskName: string;
    taskDescription: string;
    status: "completed" | "todo" | "in-progress";
    dueDate: Date;
    userId: number;
  };

  const [tasks, setTasks] = useState<TaskType[]>([]);

  const getAllTasks = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/tasks/getAllTasks", {
        method: "GET",
      });

      if (res) {
        const data = await res.json();
        if (data.status !== "error") {
          setTasks(data.tasks);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllTasks();
  }, []);

  return (
    <div className="flex flex-col gap-4">
      {tasks.map((task) => {
        return <TaskComponent key={task.id} task={task} />;
      })}
    </div>
  );
}
