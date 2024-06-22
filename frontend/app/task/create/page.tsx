"use client";

import React from "react";

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
import { toast } from "@/components/ui/use-toast";

type NewTaskType = {
  taskName: string;
  taskDescription: string;
  status: "completed" | "todo" | "in-progress";
  dueDate: Date;
};

export default function CreateTask() {
  const router = useRouter();
  const [title, setTitle] = React.useState<string | null>(null);
  const [description, setDescription] = React.useState<string | null>(null);
  const [status, setStatus] = React.useState("todo");
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  async function CreateNewTask() {
    try {
      const res = await fetch(`http://localhost:5000/api/tasks/createTask`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          taskName: title,
          taskDescription: description,
          status,
          dueDate: date,
          userId: 1,
        }),
      });

      if (res) {
        const data = await res.json();
        if (data.status !== "error") {
          toast({
            title: "Task created successfully!",
            description: `Task ${title} created successfully.`,
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center">
      <Header />
      <Card className="lg:w-[550px]">
        <CardHeader>
          <CardTitle>Create New Task</CardTitle>
          <CardDescription>Create a new task.</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-6">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  placeholder="Title of your task"
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  placeholder="Description of your task"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="status">Status</Label>
                <Select
                  defaultValue="todo"
                  onValueChange={(value) => setStatus(value)}
                >
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="todo">Todo</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="inprogress">In-Progress</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label>Due Date</Label>
                <div className="flex self-center">
                  <Calendar
                    mode="single"
                    selected={date}
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
          <Button onClick={() => CreateNewTask()}>Create</Button>
        </CardFooter>
      </Card>
    </main>
  );
}
