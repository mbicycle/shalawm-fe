import { RemoveFiles } from "@/features/remove-files";
import { UpdateKnowledgeDatabase } from "@/features/update-knowledge-database";
import { UploadFiles } from "@/features/upload-files";

export const AdminPage = () => {
  return (
    <div className="w-full h-full flex flex-col items-center gap-6 p-8 max-w-3xl mx-auto text-white justify-center">
      <UploadFiles />
      <div className="flex items-center gap-4 ">
        <UpdateKnowledgeDatabase />
        <RemoveFiles />
      </div>
    </div>
  );
};
