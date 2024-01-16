import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { LoadingSpinner } from "@/shared/ui/spinner";
import { SendHorizonal } from "lucide-react";
import { useChat } from "./use-chat";

export const HomePage = () => {
  const { messages, asking, ask, prompt, changePrompt } = useChat();

  return (
    <div className="w-full h-full flex flex-col items-center gap-6 py-8 max-w-3xl mx-auto">
      <ul className="grow p-4 w-full relative flex flex-col gap-2">
        {messages.length === 0 && (
          <LoadingSpinner className="absolute top-1/2 left-1/2 w-10 h-10" />
        )}
        {messages.map(({ id, text, from, timestamp }) => (
          <li key={id} className="flex gap-2">
            <span className="text-slate-200">{timestamp}</span>
            <span>{from === "ai" ? "🤖 : " : "👨🏻‍💼 : "}</span>
            <span className="text-white">{text}</span>
          </li>
        ))}
        {asking && <li className="animate-bounce">🤖: Answering...</li>}
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
