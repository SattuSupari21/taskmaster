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
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";
import { format } from "date-fns";
import { FilePenLine, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type TaskType = {
  id: string;
  taskName: string;
  taskDescription: string;
  status: "completed" | "todo" | "inprogress";
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

  async function DeleteTaskHandler() {
    try {
      const res = await fetch(
        `http://localhost:5000/api/tasks/deleteTask/${params.slug}`,
        {
          method: "DELETE",
        }
      );

      if (res) {
        const data = await res.json();
        if (data.status !== "error") {
          toast({
            title: "Task Deleted successfully!",
            description: `Task ${task?.taskName} Deleted successfully.`,
          });
          router.push("/");
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex flex-col items-center">
      <Header />
      <Card className="lg:w-[800px] md:w-[600px] max-[500px]:w-full max-[500px]:border-0">
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
                {task?.dueDate ? format(task.dueDate, "dd/MM/yyyy") : ""}
              </span>
            </div>
          </div>
          <div className="flex gap-2 lg:justify-end mt-4 md:justify-end max-[500px]:justify-center max-[500px]:mt-10">
            <Button
              className="space-x-2 max-[500px]:w-full"
              onClick={() => router.push(`/task/update/${task?.id}`)}
            >
              <FilePenLine className="w-4" />
              <span>Edit Task</span>
            </Button>
            {/* delete task confirmation dialog */}

            <Dialog>
              <DialogTrigger asChild>
                <Button className="space-x-2 max-[500px]:w-full">
                  <Trash2 className="w-4" />
                  <span>Delete</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Delete Task</DialogTitle>
                  <DialogDescription>
                    Are you sure you want to delete this task?
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant={"outline"}>Cancel</Button>
                  </DialogClose>
                  <Button
                    variant={"destructive"}
                    onClick={() => DeleteTaskHandler()}
                  >
                    Delete
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
