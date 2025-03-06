import api from "./_api";
import { queryOptions } from "@tanstack/react-query";

export type TodoType = {
    id: number | null;
    title: string;
    done: boolean | null;
    dueDate: Date | null;
};

export type IsDone = {
    done: boolean;
};

export class PostNotFoundError extends Error {}

export const postTodo = ( data: TodoType ) => {
    return api.post(`api/todo/todo`, data);
};

export const setDone = (data) => {
    let id = data.id;
    let done = data.data
    return api.patch(`api/todo/done/${id}`, {
        done: done,
    } as IsDone);
};

export const todoQueryOptions = (todoId: string) =>
    queryOptions({
        queryKey: ["todos", { todoId }],
        queryFn: () => fetchTodo(todoId),
    });

export const deleteTodo = ( id: number ) => {
    return api.delete(`api/todo/todo/${id}`);
};

export const fetchTodo = async (todoId: string) => {
    console.log(`Fetching post with id ${todoId}...`);
    await new Promise((r) => setTimeout(r, 500));
    return await api
        .get<TodoType>(`api/todo/todo/${todoId}`)
        .then((r) => r.data)
        .catch((err) => {
            if (err.response.status === 404) {
                throw new PostNotFoundError(`Post with id "${todoId}" not found!`);
            }
            throw err;
        });

};

export const todosQueryOptions = () =>
    queryOptions({
    queryKey: ["todos"],
    queryFn: () => fetchTodos(),
});

export const fetchTodos = async () => {
    console.log("Fetching posts...");
    await new Promise((r) => setTimeout(r, 500));
    return api
        .get<TodoType[]>("api/todo/todos")
        .then((r) => r.data.slice(0, 10));
};
