import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { LoadingSpinner } from "@/shared/ui/spinner";
import { SendHorizonal } from "lucide-react";
import { useChat } from "./use-chat";
import { cn } from "@/shared/lib/utils";

export const HomePage = () => {
  const { messages, asking, ask, prompt, changePrompt } = useChat();

  return (
    <div className="w-full h-full flex flex-col items-center gap-6 py-8 max-w-3xl mx-auto">
      <ul className="grow w-full relative flex flex-col gap-4 overflow-auto pr-4 scrollbar-thin scrollbar-thumb-sky-900/50 scrollbar-track-rounded-md scrollbar-track-slate-100/10">
        {messages.length === 0 && (
          <LoadingSpinner className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-150" />
        )}
        {messages.map(({ id, text, from, timestamp }) => (
          <li
            key={id}
            className={cn(
              "bg-white  flex flex-col gap-1 items-center border border-white/20 rounded-xl max-w-[45%]  self-start py-1 px-4 relative",
              {
                "self-end bg-cyan-100": from !== "ai",
              }
            )}
          >
            <div>
              <span>{from === "ai" ? "👨🏻‍⚖️ " : "👨🏻‍💼 "}</span>
              <span className="text-black">{text}</span>
            </div>
            <span
              className={cn(
                "text-slate-200 text-xs absolute -bottom-6 right-2 opacity-75",
                {
                  "left-2": from === "ai",
                }
              )}
            >
              {timestamp}
            </span>
          </li>
        ))}

        <li
          className={cn(
            "opacity-0 translate-opacity animate-bounce flex flex-col gap-1 items-center border border-white/20 rounded-xl self-start py-1 px-4 relative",
            {
              "opacity-100": asking,
            }
          )}
        >
          <div>
            <span>👨🏻‍⚖️ </span>
            <span className="text-white">Answering...</span>
          </div>
        </li>
      </ul>
      <div className="flex w-full gap-4">
        <Input
          className="grow"
          placeholder="Message Shalawm AI..."
          value={prompt}
          onChange={changePrompt}
          onKeyDown={({ key }) => key === "Enter" && ask()}
        />
        <Button className=" aspect-square p-0" onClick={ask}>
          <SendHorizonal />
        </Button>
      </div>
    </div>
  );
};
