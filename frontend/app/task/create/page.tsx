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

export default function CreateTask() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

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
                <Input id="title" placeholder="Title of your task" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  placeholder="Description of your task"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="status">Status</Label>
                <Select defaultValue="todo">
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
          <Button variant="outline">Cancel</Button>
          <Button>Create</Button>
        </CardFooter>
      </Card>
    </main>
  );
}
