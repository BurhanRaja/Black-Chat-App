"use client";

import { UploadDropzone } from "@/utils/uploadthing";
import Avatar from "./ui/avatar";
import { X } from "lucide-react";

interface IFileUploadProps {
  onChange: (file: string) => void;
  value: string;
  endpoint: "serverImage" | "messageFile" | "userImage";
}

const FileUpload = ({ onChange, value, endpoint }: IFileUploadProps) => {
  const fileType = value.split(".").pop();

  console.log(fileType);
  console.log(value);

  if (value && fileType !== "pdf" && endpoint === "serverImage") {
    return (
      <>
        <div className="flex justify-center">
          <div className="relative w-[20%]">
            <Avatar
              image={value}
              altname="uploaded file"
              width="w-[80px] rounded-full"
              height="h-[80px]"
            />
            <button
              className="absolute bg-gray-200 hover:bg-gray-100 rounded-full p-1 right-1"
              onClick={() => onChange("")}
            >
              <X size={15} className="text-red-500 font-extrabold" />
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <UploadDropzone
        endpoint={endpoint}
        onClientUploadComplete={(res) => {
          onChange(res?.[0].url!);
        }}
        onUploadError={(err) => {
          console.log(err);
        }}
        className="border border-purple-200 text-gray-300 bg-neutral-900 ut-button:bg-gray-700 ut-button:hover:bg-gray-800"
      />
    </>
  );
};

export default FileUpload;
