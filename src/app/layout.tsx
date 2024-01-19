import { cn } from "@/shared/lib/utils";
import Logo from "./logo.svg";
import ShortLogo from "./favicon.png";
import { ChevronRight, HomeIcon, UserRoundCog } from "lucide-react";
import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";

const SideBar = ({ className }: { className?: string }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => setExpanded((p) => !p);

  return (
    <nav
      className={cn(
        "shadow-b shadow-md py-8 px-4 relative w-[72px] transition-all text-white",
        className,
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
        <img
          src={expanded ? Logo : ShortLogo}
          alt="logo"
          className={cn("shrink-0 opacity-0 transition-opacity", {
            "opacity-100 min-w-[104px]": expanded,
            "w-6 h-6 self-center opacity-100": !expanded,
          })}
        />

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

const TopBar = ({ className }: { className?: string }) => (
  <nav className={cn(className, "shadow-lg px-6 py-2 gap-4")}>
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
      <span className={cn("opacity-100 transition-opacity", {})}>Home</span>
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
      <span className={cn("opacity-100 transition-opacity", {})}>Admin</span>
    </NavLink>
  </nav>
);

export const RootLayout = () => (
  <div className="h-[100dvh] flex flex-col lg:flex-row bg-primary font-open">
    <SideBar className="hidden lg:block" />
    <TopBar className="flex lg:hidden" />
    <main className="grow">
      <Outlet />
    </main>
  </div>
);
