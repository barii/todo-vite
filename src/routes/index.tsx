import {
    useQuery,
    useMutation,
    useQueryClient,
} from '@tanstack/react-query'
import {postTodo, fetchTodos} from '../api/todo.js'
import {createFileRoute} from "@tanstack/react-router";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {cn} from "@/lib/utils.ts";
import { Button } from '@/components/ui/button.js';

export const Route
    = createFileRoute('/')({
    component: Todos,
})

function Todos() {
    // Access the client
    const queryClient = useQueryClient()

    // Queries
    const query = useQuery({
        queryKey: ['todos'],
        queryFn: fetchTodos }
    )

    // Mutations
    const mutation = useMutation({
        mutationFn: postTodo,
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ['todos'] })
        },
    })


    const notifications = [
        {
            title: "Your call has been confirmed.",
            description: "1 hour ago",
        },
        {
            title: "You have a new message!",
            description: "1 hour ago",
        },
        {
            title: "Your subscription is expiring soon!",
            description: "2 hours ago",
        },
    ]

    return (
        <div>
            <Card className={cn("w-[380px]",)}>
                <CardHeader>
                    <CardTitle>Notifications</CardTitle>
                    <CardDescription>You have 3 unread messages.</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <div className=" flex items-center space-x-4 rounded-md border p-4">
                        <div className="flex-1 space-y-1">
                            <p className="text-sm font-medium leading-none">
                                Push Notifications
                            </p>
                            <p className="text-sm text-muted-foreground">
                                Send notifications to device.
                            </p>
                        </div>
                    </div>
                    <div>
                        {notifications.map((notification, index) => (
                            <div
                                key={index}
                                className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
                            >
                                <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                                <div className="space-y-1">
                                    <p className="text-sm font-medium leading-none">
                                        {notification.title}
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        {notification.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
                <CardFooter>
                    <Button className="w-full">
                        Mark all as read
                    </Button>
                </CardFooter>
            </Card>


            <Card className={cn("w-[380px]")}>
                <CardHeader>
                    <CardTitle>Card Title</CardTitle>
                    <CardDescription>Card Description</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <div className=" flex items-center space-x-4 rounded-md border p-4">
                        <div className="flex-1 space-y-1">
                            <Table>
                                <TableCaption>A list of your recent invoices.</TableCaption>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[100px]">Id</TableHead>
                                        <TableHead>Title</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Doe date</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {query.data?.map((todo) =>
                                        <TableRow>
                                            <TableCell className="font-medium">{todo.id}</TableCell>
                                            <TableCell>{todo.title}</TableCell>
                                            <TableCell></TableCell>
                                            <TableCell className="text-right"></TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button className="w-full bg-primary"
                        onClick={() => {
                            mutation.mutate({
                                id: "Date.now().toString()",
                                title: 'Do Laundry',
                            })
                        }}
                    >
                        Add Todo
                    </Button>
                </CardFooter>
            </Card>


        </div>
    )
}