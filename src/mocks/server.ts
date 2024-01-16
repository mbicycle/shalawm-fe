import { getTime } from "@/shared/lib/utils";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const history: HistoryType = [
  {
    id: "abc",
    from: "ai",
    text: "Hello! I'm Shalawm, AI Powered Lawyer! What would you want to ask?",
    timestamp: getTime(),
  },
];

const englishProverbs = [
  "A stitch in time saves nine.",
  "Absence makes the heart grow fonder.",
  "Actions speak louder than words.",
  "Better late than never.",
  "Don't count your chickens before they hatch.",
  "Every cloud has a silver lining.",
  "Haste makes waste.",
  "Honesty is the best policy.",
  "If it ain't broke, don't fix it.",
  "Look before you leap.",
];

export const mockServer = {
  getMessages: async () => {
    await delay(1000);
    return history;
  },
  sendMessage: async (message: Message) => {
    await delay(1500);
    history.push(message);
    history.push({
      id: Math.random().toString(),
      text: englishProverbs[Math.floor(Math.random() * englishProverbs.length)],
      from: "ai",
      timestamp: getTime(),
    });
    return history;
  },
};
