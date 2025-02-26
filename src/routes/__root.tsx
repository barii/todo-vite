import { Link, Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { Button } from "@/components/ui/button";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <div className="justify-center items-center max-w-[960px] m-auto h-full">
      <div className="p-2 flex gap-2 text-lg ">
        <Link
          to="/"
          activeProps={{
            className: "font-bold",
          }}
          activeOptions={{ exact: true }}
        >
          Home
        </Link>{" "}
        <Link
          to="/about"
          activeProps={{
            className: "font-bold",
          }}
        >
          About
        </Link>
        <Button
          onClick={() => {
            document.getElementsByTagName("html")[0].classList.add("dark");
          }}
        >
          Dark
        </Button>
      </div>
      <hr />
      <div className="justify-center items-center">
        <Outlet />
      </div>
      <TanStackRouterDevtools position="bottom-right" />
    </div>
  );
}

