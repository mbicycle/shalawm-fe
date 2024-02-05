import { instance } from "@/shared/api/instance";

export const uploadFiles = ({ files }: { files: File[] }) => {
  const formData = new FormData();

  for (const file of files) formData.append("files", file);

  return instance.post("/files/upload-files/", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Accept: "application/json",
    },
  });
};

export const removeExistingFiles = () =>
  instance.post("/files/remove-existing-files/");

export const updateKnowledgeBase = (body: UpdateKnowledgeBasePayload) =>
  instance.post("/data-load/load-data-to-knowledge-base", body);
