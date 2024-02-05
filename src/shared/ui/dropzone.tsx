import { cn } from "@/shared/lib/utils";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

type Props = {
  onFileAdd: (file: File[]) => void;
};
export const DropZone = ({ onFileAdd }: Props) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    onFileAdd(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 10,
  });

  return (
    <div
      {...getRootProps()}
      className={cn(
        "border border-dashed rounded-md p-4 w-2/3 h-48 flex items-center justify-center text-white",
        {
          "bg-sky-700/50": isDragActive,
        }
      )}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p className="text-center">
          Drag 'n' drop some files here, or click to select files
        </p>
      )}
    </div>
  );
};
