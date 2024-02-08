import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { SendHorizonal } from "lucide-react";
import { useChat } from "./use-chat";
import { cn, getTime } from "@/shared/lib/utils";
import { LoadingSpinner } from "@/shared/ui/spinner";

export const HomePage = () => {
  const {
    loading,
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
        {messages.length === 0 && !loading && (
          <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  text-white tracking-widest">
            Feel free to ask me
          </span>
        )}
        {loading && (
          <LoadingSpinner className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-150 text-white" />
        )}
        {messages.map(
          (
            {
              message,
              message_type,
              timestamp,
              sources,
              LLMResponseEvaluationMetrics,
            },
            key
          ) => (
            <li
              key={key}
              className={cn(
                "bg-white  flex flex-col gap-1 items-center border border-white/20 rounded-xl self-start py-1 px-4 relative group relative",
                {
                  "self-end bg-cyan-100": message_type !== "ai",
                }
              )}
            >
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  {message_type === "ai" ? (
                    <div className="w-6 h-6 flex justify-center items-center bg-primary text-white rounded-full shrink-0">
                      ש{" "}
                    </div>
                  ) : (
                    <span>👨🏻‍💼 </span>
                  )}
                  <span className="text-black">{message}</span>
                </div>
                {sources?.length && LLMResponseEvaluationMetrics && (
                  <div className="flex-col md:flex-row flex gap-4 transition-opacity opacity-0  border-slate-600  group-hover:opacity-100 absolute left-[calc(50%+1rem)] -translate-x-1/2 top-[calc(100%+1rem)] z-10">
                    <ul className="bg-slate-200 p-2 border rounded-md shadow-lg">
                      {sources?.map((source, index) => (
                        <li
                          key={index}
                          className="flex whitespace-nowrap text-xs "
                        >
                          {index + 1 + ". " + source}
                        </li>
                      ))}
                    </ul>
                    <p className="bg-teal-600 text-white p-2 rounded-md  text-xs shadow-lg">
                      {" "}
                      {JSON.stringify(LLMResponseEvaluationMetrics, null, 2)}
                    </p>
                  </div>
                )}
              </div>

              <span
                className={cn(
                  "text-slate-200 text-xs absolute -bottom-6 right-2 opacity-75",
                  {
                    "left-2": message_type === "ai",
                  }
                )}
              >
                {getTime(timestamp)}
              </span>
            </li>
          )
        )}

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
