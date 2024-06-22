"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";

export default function Header() {
  return (
    <div className="container mx-auto">
      <header className="flex h-20 w-full shrink-0 items-center">
        <Link href="/" className="flex" prefetch={false}>
          <span className="text-xl font-semibold">TaskMaster</span>
        </Link>
        <div className="ml-auto flex gap-2">
          <Link href={"/task/create"}>
            <Button variant="outline" className="justify-self-end">
              <PlusIcon className="w-5 mr-2" />
              <span>Add Task</span>
            </Button>
          </Link>
        </div>
      </header>
    </div>
  );
}
