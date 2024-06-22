import { format } from "date-fns";

import { Calendar } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";
import { useRouter } from "next/navigation";

type TaskType = {
  id: string;
  taskName: string;
  taskDescription: string;
  status: "completed" | "todo" | "in-progress";
  dueDate: Date;
  userId: number;
};

export default function TaskComponent({ task }: { task: TaskType }) {
  const router = useRouter();
  return (
    <Card
      className="lg:w-[600px] hover:bg-secondary cursor-pointer"
      onClick={() => router.push(`/task/${task.id}`)}
    >
      <CardHeader>
        <CardTitle>{task.taskName}</CardTitle>
        <CardDescription>{task.taskDescription}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <Calendar className="w-4" />
            <span>{format(task.dueDate, "dd/MM/yyyy HH:mm")}</span>
          </div>
          <span>
            {task.status === "todo" ? (
              <Badge>To do</Badge>
            ) : task.status === "completed" ? (
              <Badge className="bg-green-500">Completed</Badge>
            ) : (
              <Badge className="bg-yellow-500">In Progress</Badge>
            )}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
