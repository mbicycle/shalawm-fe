import { cn } from "@/shared/lib/utils";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

type Props = {
  onFileAdd: (file: File[]) => void;
  batch?: boolean;
};
export const DropZone = ({ onFileAdd, batch }: Props) => {
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
      <input
        {...getInputProps()}
        multiple={!batch}
        accept={batch ? ".txt" : ".pdf"}
      />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p className="text-center">
          {batch
            ? `Drag 'n' drop .txt file here, or click to select file`
            : `Drag 'n' drop some file(s) here, or click to select file(s)`}
        </p>
      )}
    </div>
  );
};
