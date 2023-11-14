"use client";

import { UploadDropzone } from "@/utils/uploadthing";
import Avatar from "./ui/avatar";
import { FileIcon, X } from "lucide-react";

interface IFileUploadProps {
  onChange: (file: string) => void;
  value: string;
  endpoint: "serverImage" | "messageFile" | "userImage";
  width?: string;
  height?: string;
}

const FileUpload = ({
  onChange,
  value,
  endpoint,
  width,
  height,
}: IFileUploadProps) => {
  const fileType = value.split(".").pop();

  if (value && fileType !== "pdf") {
    return (
      <>
        <div className="flex justify-center">
          <div className="relative w-[20%]">
            <Avatar
              image={value}
              altname="uploaded file"
              width={`${width ? width : "w-[80px]"} rounded-full`}
              height={`${height ? height : "h-[80px]"}`}
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

  if (value && fileType === "pdf") {
    return (
      <div className="relative flex items-center p-2 mt-2 rounded-md bg-background/10">
        <FileIcon className="h-10 w-10 fill-indigo-200 stroke-indigo-400" />
        <a
          href={value}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-2 text-sm text-indigo-500 dark:text-indigo-400 hover:underline"
        >
          {value}
        </a>
        <button
          onClick={() => onChange("")}
          className="bg-rose-500 text-white p-1 rounded-full absolute -top-2 -right-2 shadow-sm"
          type="button"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
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
