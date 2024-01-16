import { useState } from "react";
import { DropZone } from "./dropzone";
import { Button } from "@/shared/ui/button";
import { X } from "lucide-react";

export const AdminPage = () => {
  const [files, setFiles] = useState<File[]>([]);

  const addFile = (file: File[]) => setFiles((p) => [...p, ...file]);
  const removeFile = (fileName: string) =>
    setFiles((p) => p.filter((file) => file.name !== fileName));

  return (
    <div className="w-full h-full flex flex-col items-center gap-6 py-8 max-w-3xl mx-auto">
      <DropZone onFileAdd={addFile} />
      <ul className="w-full">
        {files.length === 0 && <li>No files</li>}
        {files.map((file) => (
          <li key={file.size} className="flex items-center gap-4">
            {file.name}
            <button
              className="hover:text-red-500 transition-colors"
              onClick={() => removeFile(file.name)}
            >
              <X />
            </button>
          </li>
        ))}
      </ul>

      <Button disabled>Upload</Button>
    </div>
  );
};
