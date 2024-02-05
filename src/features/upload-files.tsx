import { DropZone } from "@/shared/ui/dropzone";
import { useState } from "react";
import { match } from "ts-pattern";

import { X } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { useMutation } from "@tanstack/react-query";
import { uploadFiles } from "@/entities/file";
import { useSnackbar } from "notistack";
export const UploadFiles = () => {
  const { enqueueSnackbar } = useSnackbar();

  const { mutate, isPending } = useMutation({
    mutationFn: uploadFiles,
    onSuccess: () => {
      enqueueSnackbar(
        "Files uploaded successfully! Now you can generate knowledge base!",
        { variant: "success" }
      );
    },
    onError: () =>
      enqueueSnackbar("Failed to upload files", { variant: "error" }),
  });

  const [files, setFiles] = useState<File[]>([]);

  const noFiles = files.length === 0;

  const addFile = (file: File[]) => setFiles((p) => [...p, ...file]);
  const removeFile = (fileName: string) =>
    setFiles((p) => p.filter((file) => file.name !== fileName));

  const upload = () => mutate({ files });

  return (
    <>
      <DropZone onFileAdd={addFile} />
      {match(noFiles)
        .with(true, () => <p>No files</p>)
        .with(false, () => (
          <table className="w-full ">
            <tbody>
              {files.map((file, index) => (
                <tr key={file.size} className="border-b border-white/20 ">
                  <td className="p-2">{index + 1}</td>
                  <td className="p-2">{file.name}</td>
                  <td className="flex items-center justify-end p-2">
                    <button
                      className="hover:text-red-500 transition-colors"
                      onClick={() => removeFile(file.name)}
                    >
                      <X />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ))
        .exhaustive()}
      <Button disabled={noFiles} onClick={upload}>
        {isPending ? "Uploading..." : "Upload Files"}
      </Button>
    </>
  );
};
