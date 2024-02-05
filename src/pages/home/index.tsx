import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { LoadingSpinner } from "@/shared/ui/spinner";
import { SendHorizonal } from "lucide-react";
import { useChat } from "./use-chat";
import { cn } from "@/shared/lib/utils";

export const HomePage = () => {
  const {
    messages,
    asking,
    clearing,
    clearHistory,
    ask,
    prompt,
    changePrompt,
  } = useChat();

  return (
    <div className="w-full h-full flex flex-col items-center gap-6 p-5 lg:px-0 lg:py-8 max-w-3xl mx-auto">
      <ul className="grow w-full relative flex flex-col gap-8 overflow-auto lg:pr-4 scrollbar-thin scrollbar-thumb-sky-900/50 scrollbar-track-rounded-md scrollbar-track-slate-100/10">
        {messages.length === 0 && (
          <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  text-white tracking-widest">
            Feel free to ask me
          </span>
          // <LoadingSpinner className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-150 text-white" />
        )}
        {messages.map(({ text, from, timestamp, sources }) => (
          <li
            key={timestamp}
            className={cn(
              "bg-white  flex flex-col gap-1 items-center border border-white/20 rounded-xl self-start py-1 px-4 relative group relative",
              {
                "self-end bg-cyan-100": from !== "ai",
              }
            )}
          >
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                {from === "ai" ? (
                  <div className="w-6 h-6 flex justify-center items-center bg-primary text-white rounded-full shrink-0">
                    ש{" "}
                  </div>
                ) : (
                  <span>👨🏻‍💼 </span>
                )}
                <span className="text-black">{text}</span>
              </div>
              <ul className="flex justify-center flex-col  bg-slate-200 transition-opacity rounded-md opacity-0 p-2 border border-slate-600 shadow-lg group-hover:opacity-100 absolute left-1/2 -translate-x-1/2 top-[calc(100%+1rem)]">
                {sources.map((source, index) => (
                  <li key={source} className="flex whitespace-nowrap">
                    {index + 1 + ". " + source}
                  </li>
                ))}
              </ul>
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
            "bg-white opacity-0 translate-opacity animate-bounce flex flex-col gap-1 items-center border border-white/20 rounded-xl self-start py-1 px-4 relative",
            {
              "opacity-100": asking,
            }
          )}
        >
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 flex justify-center items-center bg-primary text-white rounded-full">
              ש{" "}
            </div>
            <span>Answering...</span>
          </div>
        </li>
      </ul>
      <div className="flex w-full gap-4">
        <Input
          className="grow"
          placeholder="Message Shalawm AI..."
          value={prompt}
          onChange={changePrompt}
          onKeyDown={({ key }) => key === "Enter" && !asking && ask()}
        />
        <Button className=" aspect-square p-0" onClick={ask} disabled={asking}>
          <SendHorizonal />
        </Button>
        <Button
          variant="destructive"
          onClick={clearHistory}
          disabled={clearing}
        >
          {clearing ? "Clearing..." : "Clear History"}
        </Button>
      </div>
    </div>
  );
};
