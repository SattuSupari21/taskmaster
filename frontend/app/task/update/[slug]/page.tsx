"use client";

import React, { useEffect, useState } from "react";

import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { useRouter } from "next/navigation";

type TaskType = {
  id: string;
  taskName: string;
  taskDescription: string;
  status: "completed" | "todo" | "in-progress";
  dueDate: Date;
  userId: number;
};

export default function UpdateTask({ params }: { params: { slug: string } }) {
  const router = useRouter();

  const [task, setTask] = useState<TaskType>();
  const [loading, setLoading] = useState(false);

  const [date, setDate] = React.useState<Date | undefined>();

  const getTask = async () => {
    try {
      setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTask();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center">
      <Header />
      {loading && <div>Loading...</div>}
      {!loading && (
        <Card className="lg:w-[550px]">
          <CardHeader>
            <CardTitle>Update Task</CardTitle>
            <CardDescription>Update your existing task.</CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid w-full items-center gap-6">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="title">Title</Label>
                  <Input id="title" defaultValue={task?.taskName} />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="description">Description</Label>
                  <Input
                    id="description"
                    defaultValue={task?.taskDescription}
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="status">Status</Label>
                  <Select defaultValue={task?.status}>
                    <SelectTrigger id="status">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      <SelectItem value="todo">Todo</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="inprogress">In Progress</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label>Due Date</Label>
                  <div className="flex self-center">
                    <Calendar
                      mode="single"
                      selected={new Date(task?.dueDate ?? "")}
                      onSelect={setDate}
                      className="rounded-md border"
                    />
                  </div>
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => router.back()}>
              Back
            </Button>
            <Button onClick={() => console.log(task)}>Update</Button>
          </CardFooter>
        </Card>
      )}
    </main>
  );
}
