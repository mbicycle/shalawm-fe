import { DropZone } from "@/shared/ui/dropzone";
import { useState } from "react";
import { Button } from "@/shared/ui/button";
import { match } from "ts-pattern";
import { X } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { processBatch } from "@/entities/file";
import { useSnackbar } from "notistack";

export const BatchPage = () => {
  const [files, setFiles] = useState<File[]>([]);
  const { enqueueSnackbar } = useSnackbar();

  const noFiles = files.length === 0;
  const removeFile = (fileName: string) =>
    setFiles((p) => p.filter((file) => file.name !== fileName));

  const { mutate, isPending } = useMutation({
    mutationFn: processBatch,
    onSuccess: (response) => {
      console.log(response);
      const fileURL = window.URL.createObjectURL(new Blob([response.data]));
      const fileLink = document.createElement("a");
      fileLink.href = fileURL;
      fileLink.setAttribute(
        "download",
        `${files[0].name.slice(0, -4) + "_response"}.xlsx`
      );
      document.body.appendChild(fileLink);
      fileLink.click();
      document.body.removeChild(fileLink);
      enqueueSnackbar("File has been proccessed successfully!", {
        variant: "success",
      });
    },
    onError: () =>
      enqueueSnackbar("Failed to process file", { variant: "error" }),
  });

  const process = () => mutate({ file: files[0] });

  return (
    <div className="w-full h-full flex flex-col  gap-4 items-center justify-center text-white">
      <div className="flex flex-col items-center gap-4 w-full max-w-[40rem]">
        <DropZone onFileAdd={(files) => setFiles(files)} batch />
        {match(noFiles)
          .with(true, () => <p>No files</p>)
          .with(false, () => (
            <table className="w-full">
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

        <Button onClick={process} disabled={noFiles || isPending}>
          {isPending ? "Processing..." : "Get Answer!"}
        </Button>
      </div>
    </div>
  );
};
