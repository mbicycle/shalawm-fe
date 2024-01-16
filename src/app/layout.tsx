import { cn } from "@/shared/lib/utils";
import { NavLink, Outlet } from "react-router-dom";

export const RootLayout = () => {
  return (
    <div className="h-screen flex flex-col bg-blue-500 text-slate-200">
      <header className="shadow-b shadow-md py-2 px-12">
        <ul className="flex gap-4">
          <NavLink
            to="/"
            className={({ isActive }) =>
              cn(
                "rounded-md px-6 py-3 hover:bg-blue-600/50 transition-colors",
                { "bg-blue-600": isActive }
              )
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/admin"
            className={({ isActive }) =>
              cn(
                "rounded-md px-6 py-3 hover:bg-blue-600/50 transition-colors",
                { "bg-blue-600": isActive }
              )
            }
          >
            Admin
          </NavLink>
        </ul>
      </header>
      <main className="grow">
        <Outlet />
      </main>
    </div>
  );
};
