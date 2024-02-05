import { updateKnowledgeBase } from "@/entities/file";
import { Button } from "@/shared/ui/button";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useSnackbar } from "notistack";

export const UpdateKnowledgeDatabase = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { mutate, isPending } = useMutation({
    mutationFn: updateKnowledgeBase,
    onSuccess: () =>
      enqueueSnackbar("Knowledge Database generated successfully!", {
        variant: "success",
      }),
    onError: (error: AxiosError<{ detail: string }>) => {
      enqueueSnackbar("[Error]: " + error.response?.data.detail, {
        variant: "error",
      });
    },
  });

  const update = () =>
    mutate({
      collection_name: "test_shalawm_collection",
      db_reset_required: true,
      data_path: "/shalawm/storage/data/docs/",
    });

  return (
    <Button variant="secondary" onClick={update} disabled={isPending}>
      {isPending ? "Updating..." : "Generate Knowledge Base"}
    </Button>
  );
};
