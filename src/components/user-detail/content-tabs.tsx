"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import type { Post, Todo } from "@/types";
import { useState } from "react";
import { TodosSummary } from "./todos-summary";

interface Props {
  posts: Post[];
  todos: Todo[];
}

type Tab = "posts" | "todos";

export function ContentTabs({ posts, todos }: Props) {
  const [active, setActive] = useState<Tab>("posts");

  return (
    <>
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setActive("posts")}
          className={cn(
            "px-3 py-1 rounded-full text-sm font-medium transition-colors",
            active === "posts"
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground hover:text-foreground",
          )}
        >
          Posts ({posts.length})
        </button>
        <button
          onClick={() => setActive("todos")}
          className={cn(
            "px-3 py-1 rounded-full text-sm font-medium transition-colors",
            active === "todos"
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground hover:text-foreground",
          )}
        >
          Todos ({todos.length})
        </button>
      </div>
      <Card>
        <CardContent className="">
          {active === "posts" &&
            (posts.length === 0 ? (
              <p className="text-muted-foreground text-sm">No posts yet.</p>
            ) : (
              <ul className="flex flex-col gap-3">
                {posts.map((post, i) => (
                  <li key={post.id}>
                    <p className="font-medium text-sm capitalize leading-snug">
                      {post.title}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
                      {post.body}
                    </p>
                    {i < posts.length - 1 && <Separator className="mt-3" />}
                  </li>
                ))}
              </ul>
            ))}

          {active === "todos" && (
            <div className="flex flex-col gap-4">
              <TodosSummary todos={todos} />
              <Separator />
              {todos.length === 0 ? (
                <p className="text-muted-foreground text-sm">No todos yet.</p>
              ) : (
                <ul className="flex flex-col gap-2">
                  {todos.map((todo) => (
                    <li
                      key={todo.id}
                      className="flex items-start gap-2 text-sm"
                    >
                      <span
                        className={
                          todo.completed ? "text-green-600" : "text-orange-500"
                        }
                      >
                        {todo.completed ? "✓" : "⏳"}
                      </span>
                      <span
                        className={cn(
                          todo.completed &&
                            "line-through text-muted-foreground",
                        )}
                      >
                        {todo.title}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
}
