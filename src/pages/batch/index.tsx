import { DropZone } from "@/shared/ui/dropzone";
import { useState } from "react";
import { Button } from "@/shared/ui/button";
import { AlertTriangle } from "lucide-react";

export const BatchPage = () => {
  const [files, setFiles] = useState<File[]>([]);
  console.log(files);
  return (
    <div className="w-full h-full flex flex-col gap-4 items-center justify-center">
      <DropZone onFileAdd={(files) => setFiles(files)} />
      <Button disabled>Get Answer!</Button>
      <caption className="text-white text-sm flex gap-4 items-center">
        Waiting for implementation{" "}
        <AlertTriangle className="text-red-500 scale-150" />
      </caption>
    </div>
  );
};
