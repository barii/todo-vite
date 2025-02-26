import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/about')({
  component: AboutComponent,
})

function AboutComponent() {
  return (
      <div className="p-2">
          <h3>About</h3>

          <h1 className="text-3xl font-bold underline">
              Hello world!
          </h1>

      </div>

  )
}
