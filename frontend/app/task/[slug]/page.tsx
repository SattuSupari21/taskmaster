"use client";

import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { format } from "date-fns";
import { FilePenLine, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type TaskType = {
  id: string;
  taskName: string;
  taskDescription: string;
  status: "completed" | "todo" | "in-progress";
  dueDate: Date;
  userId: number;
};

export default function TaskPage({ params }: { params: { slug: string } }) {
  const router = useRouter();

  const [task, setTask] = useState<TaskType>();

  const getTask = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/tasks/getTaskById/${params.slug}`,
        {
          method: "GET",
        }
      );

      if (res) {
        const data = await res.json();
        if (data.status !== "error") {
          setTask(data.task);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTask();
  }, []);

  return (
    <div className="flex flex-col items-center">
      <Header />
      <Card className="max-w-[800px] w-full">
        <CardHeader>
          <CardTitle>Task Details</CardTitle>
          <CardDescription>Shows you details of your task.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-2">
            <div>
              <span>Task Name : </span>
              <span className=" text-primary">{task?.taskName}</span>
            </div>
            <div>
              <span>Task Description : </span>
              <span className=" text-primary">{task?.taskDescription}</span>
            </div>
            <div>
              <span>Task Status : </span>
              <span className=" text-primary">
                {task?.status === "todo"
                  ? "To do"
                  : task?.status === "completed"
                  ? "Completed"
                  : "In Progress"}
              </span>
            </div>
            <div>
              <span>Task Due Date : </span>
              <span className=" text-primary">
                {task?.dueDate ? format(task.dueDate, "dd/MM/yyyy HH:mm") : ""}
              </span>
            </div>
          </div>
          <div className="flex gap-2 justify-end">
            <Button
              className=" space-x-2"
              onClick={() => router.push(`/task/update/${task?.id}`)}
            >
              <FilePenLine className="w-4" />
              <span>Edit Task</span>
            </Button>
            <Button className="space-x-2">
              <Trash2 className="w-4" />
              <span>Delete Task</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
