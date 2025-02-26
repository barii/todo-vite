import {createFileRoute} from '@tanstack/react-router'

export const Route = createFileRoute('/todos/')({
    component: Todos,
})

function Todos() {
    const todos = ["todo1", "todo2", "todo3"]
    return <div>
        {todos.map(todo => <div>{todo}</div>)}
    </div>
}
