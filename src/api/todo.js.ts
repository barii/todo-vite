import axios from "axios";
import { queryOptions } from "@tanstack/react-query";

export type TodoType = {
    id: string;
    title: string;
    status: string;
};

export class PostNotFoundError extends Error {}

export const postTodo = ({ data }: { data: TodoType }) => {
    return axios.post(`api/todo/todo`, data);
};

export const todoQueryOptions = (todoId: string) =>
    queryOptions({
        queryKey: ["todos", { todoId }],
        queryFn: () => fetchTodo(todoId),
    });

export const fetchTodo = async (todoId: string) => {
    console.log(`Fetching post with id ${todoId}...`);
    await new Promise((r) => setTimeout(r, 500));
    const todo = await axios
        .get<TodoType>(`api/todo/todo/${todoId}`)
        .then((r) => r.data)
        .catch((err) => {
            if (err.response.status === 404) {
                throw new PostNotFoundError(`Post with id "${todoId}" not found!`);
            }
            throw err;
        });

    return todo;
};

export const todosQueryOptions = queryOptions({
    queryKey: ["todos"],
    queryFn: () => fetchTodos(),
});

export const fetchTodos = async () => {
    console.log("Fetching posts...");
    await new Promise((r) => setTimeout(r, 500));
    return axios
        .get<TodoType[]>("api/todo/todos")
        .then((r) => r.data.slice(0, 10));
};
