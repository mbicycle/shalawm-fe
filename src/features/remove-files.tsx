import { removeExistingFiles } from "@/entities/file";
import { Button } from "@/shared/ui/button";
import { useMutation } from "@tanstack/react-query";
import { useSnackbar } from "notistack";

export const RemoveFiles = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { mutate, isPending } = useMutation({
    mutationFn: removeExistingFiles,
    onSuccess: () =>
      enqueueSnackbar("Files has been removed!", { variant: "success" }),
    onError: () =>
      enqueueSnackbar("Failed to remove existing files", { variant: "error" }),
  });

  const removeFile = () => mutate();

  return (
    <Button variant="destructive" onClick={removeFile} disabled={isPending}>
      {isPending ? "Removing..." : "  Remove Existing Files"}
    </Button>
  );
};
