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

export const processBatch = ({ file }: { file: File }) => {
  const formData = new FormData();
  formData.append("file_with_user_prompts", file);
  return instance
    .post("/chat/process-user-prompts/", formData, {
      responseType: "blob",
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
      },
    })
    .then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${file.name.slice(0, -4)}_response.xlsx`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
};

export const removeExistingFiles = () =>
  instance.post("/files/remove-existing-files/");

export const updateKnowledgeBase = (body: UpdateKnowledgeBasePayload) =>
  instance.post("/data-load/load-data-to-knowledge-base", body);
