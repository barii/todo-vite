import {useMutation, useQueryClient, useSuspenseQuery} from "@tanstack/react-query";
import {deleteTodo, postTodo, setDone, todosQueryOptions} from "../api/todo.js";
import { createFileRoute } from "@tanstack/react-router";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {CalendarIcon, Check, MoveLeft} from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button.js";
import {ProtectedRoute} from "@/components/ProtectedRoute.tsx";
import {useForm} from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {InputField} from "@/components/ui/input-field.tsx";
import {useEffect} from "react";
import {Trash2} from "lucide-react";
import {cn} from "@/lib/utils.ts";
import {format} from "date-fns";

export const Route
    = createFileRoute("/")({
  component: Todos,
  // loader: ({ context: { queryClient } }) => {
  //   queryClient.ensureQueryData(todosQueryOptions());
  // },
});

function Todos() {
  // Access the client
  const queryClient = useQueryClient();

  // // Queries
  // const query = useQuery({
  //   queryKey: ["todos"],
  //   queryFn: fetchTodos,
  // });

  const todosQuery = useSuspenseQuery(todosQueryOptions());
  const todos = todosQuery.data;

  // Mutations
  const newTodoFormMutation = useMutation({
    mutationFn: postTodo,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
  const deleteTodoMutation = useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
  const doneTodoMutation = useMutation({
    mutationFn: setDone,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const newTodoForm = useForm({
    defaultValues: { title: "test" },
  });

  useEffect(() => {
    newTodoForm.reset({title:""});
  }, [todos, newTodoForm]);

  async function newTodoFormSubmit(values: any) {
    newTodoFormMutation.mutate({
      ...values,
      status: "new"
    });
  }

  return (
      <ProtectedRoute>
        <div className="flex flex-col gap-4 justify-center items-center">

          <Card className="w-full min-w-full">
            <CardHeader>
              <CardTitle>Card Title</CardTitle>
              <CardDescription>Card Description</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className=" flex items-center space-x-4 rounded-md border p-4">
                <div className="flex-1 space-y-1">
                  <Table>
                    <TableCaption>Bla-bla-bla</TableCaption>
                    <TableHeader>
                      <TableRow  className="grid grid-cols-[100px_1fr_auto_auto_auto_auto] w-full">
                        <TableHead className="w-[100px]">Id</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead></TableHead>
                        <TableHead></TableHead>
                        <TableHead className="text-right></TableHead>
                        <TableHead className="text-right></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {todos?.map((todo) => (
                          <TableRow  className="grid grid-cols-[100px_1fr_auto_auto_auto_auto] w-full">
                            <TableCell className="font-medium flex-none">{todo.id}</TableCell>
                            <TableCell className="flex-1">{todo.title}</TableCell>
                            <TableCell className="text-right flex-none"></TableCell>
                            <TableCell className="text-right flex-none"></TableCell>
                            <TableCell className="text-right flex-none">
                              {(todo.done) ?
                                  <Button className="!bg-secondary m-1"
                                          onClick={async () => {
                                            await doneTodoMutation.mutateAsync({
                                              id: todo.id!,
                                              data: false
                                            })
                                          }}
                                  >
                                <MoveLeft
                                    className="h-5 w-5 text-muted-foreground hover:text-destructive"
                                    aria-hidden="true"
                                />
                              </Button>
                            :
                              <Button className="!bg-secondary m-1"
                                      onClick={async () => {
                                        await doneTodoMutation.mutateAsync({
                                          id: todo.id!,
                                          data: true
                                        })
                                      }}
                              >
                                <Check
                                    className="h-5 w-5 text-muted-foreground hover:text-destructive"
                                    aria-hidden="true"
                                />
                              </Button>
                            }
                          </TableCell>
                          <TableCell>
                            <Button className="!bg-secondary m-1"
                                    onClick={async () => {
                                      await deleteTodoMutation.mutateAsync(todo.id!)
                                    }}
                            >
                              <Trash2
                                  className="h-5 w-5 text-muted-foreground hover:text-destructive"
                                  aria-hidden="true"
                              />
                            </Button>
                          </TableCell>
                          </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Form {...newTodoForm}>
                <InputField name="title" label="" className="w-full mr-1 " placeholder="Add a new todo"/>
                <FormField
                    name="dueDate"
                    render={({ field }) => (
                        <FormItem className="flex flex-col ">
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                    className={cn(
                                        "w-[240px] pl-3 text-left font-normal !bg-background !forground",
                                        !field.value && "text-muted-foreground"
                                    )}
                                >
                                  {field.value ? (
                                      format(field.value, "PPP")
                                  ) : (
                                      <span>Due date</span>
                                  )}
                                  <CalendarIcon className="h-4 w-4 opacity-50 !bg-background" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0 bg-white text-black dark:bg-white dark:text-black" align="start">
                              <Calendar
                                  mode="single"
                                  selected={field.value}
                                  onSelect={field.onChange}
                                  disabled={(date) =>
                                      date > new Date() || date < new Date("1900-01-01")
                                  }
                                  initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                    )}
                />
                <Button
                    className="w-full !bg-primary ml-1"
                    onClick={newTodoForm.handleSubmit(newTodoFormSubmit)}
                >
                  Add Todo
                </Button>
              </Form>
            </CardFooter>
          </Card>

        </div>
      </ProtectedRoute>
  );
}

