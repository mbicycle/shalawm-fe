import { cn } from "@/shared/lib/utils";
import { ChevronRight, HomeIcon, UserRoundCog } from "lucide-react";
import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";

const SideBar = () => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => setExpanded((p) => !p);

  return (
    <nav
      className={cn(
        "shadow-b shadow-md py-8 px-4 relative w-[72px] transition-all",
        {
          "w-[8.5rem]": expanded,
        }
      )}
    >
      <button
        className="absolute top-1/2 -translate-y-1/2 -right-8"
        onClick={toggleExpanded}
      >
        <ChevronRight
          className={cn("transition-transform", {
            "rotate-180": expanded,
          })}
        />
      </button>
      <ul className="flex flex-col gap-4">
        <NavLink
          to="/"
          className={({ isActive }) =>
            cn(
              "rounded-md p-2 hover:bg-sky-800 transition-colors flex items-center gap-2",
              {
                "bg-sky-700": isActive,
              }
            )
          }
        >
          <HomeIcon className="shrink-0" />
          <span
            className={cn("opacity-100 transition-opacity", {
              "opacity-0": !expanded,
            })}
          >
            Home
          </span>
        </NavLink>
        <NavLink
          to="/admin"
          className={({ isActive }) =>
            cn(
              "rounded-md p-2 hover:bg-sky-800 transition-colors flex items-center gap-2",
              {
                "bg-sky-700": isActive,
              }
            )
          }
        >
          <UserRoundCog className="shrink-0" />
          <span
            className={cn("opacity-100 transition-opacity", {
              "opacity-0": !expanded,
            })}
          >
            Admin
          </span>
        </NavLink>
      </ul>
    </nav>
  );
};

export const RootLayout = () => (
  <div className="h-screen flex bg-gradient-to-tr from-cyan-500 to-sky-800 text-slate-200 font-open">
    <SideBar />
    <main className="grow">
      <Outlet />
    </main>
  </div>
);
