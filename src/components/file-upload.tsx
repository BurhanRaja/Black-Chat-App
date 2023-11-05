"use client";

import { UploadDropzone } from "@/utils/uploadthing";

interface IFileUploadProps {
  onChange: (file: string) => void;
  value: string;
  endpoint: "serverImage" | "messageFile" | "userImage";
}

const FileUpload = ({ onChange, value, endpoint }: IFileUploadProps) => {
  return (
    <>
      <UploadDropzone
        endpoint={endpoint}
        onClientUploadComplete={(res) => {
          console.log(res);
        }}
        onUploadError={(err) => {
          console.log(err);
        }}
        className="border border-purple-200 text-gray-300 bg-neutral-900"
      />
    </>
  );
};

export default FileUpload;
