"use client";
import { FormEvent, useEffect, useState } from "react";
import FileUpload from "../file-upload";
import Modal from "../ui/modal";
import Input from "../ui/input";
import useMutationData from "@/hooks/useMutationData";
import { createServer } from "@/handlers/server";
import { useRouter } from "next/navigation";

interface CreateServerModalProps {
  openModal: boolean;
  setOpenModal: (val: boolean) => void;
}

interface CreateServerFormProps {
  setOpenModal: (val: boolean) => void;
}

const CreateServerForm = ({ setOpenModal }: CreateServerFormProps) => {
  const [file, setFile] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [error, setError] = useState<string>("");

  const { isSuccess, isError, mutate } = useMutationData({
    func: createServer,
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (name.length === 0) {
      setError("The above field is empty.");
      return;
    }
    let data = {
      imageUrl: file,
      name,
    };
    mutate(data);
  };

  useEffect(() => {
    if (isSuccess && !isError) {
      setOpenModal(false);
    }
  }, [isSuccess, isError]);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <p className="text-sm text-gray-500">Server Image</p>
        <FileUpload
          value={file}
          onChange={(val) => setFile(val)}
          endpoint="serverImage"
        />
        <Input
          value={name}
          setVal={(val) => setName(val)}
          setFocus={() => {}}
          setBlur={() => {}}
          name="name"
          type="text"
          label="Name"
          inputBackgroundColor="bg-neutral-900 border"
          labelTextColor="text-gray-500 mt-2"
          inputTextColor="text-gray-200"
        />
        {name.length === 0 && error && (
          <p className="text-red-500 text-xs mt-1">{error}</p>
        )}
        <div className="flex justify-end mt-10">
          <button className="p-2 w-[30%] rounded-md border border-gray-200 text-gray-200 hover:bg-gray-200 hover:text-gray-800 font-bold">
            Create
          </button>
        </div>
      </form>
    </>
  );
};

const CreateServerModal = ({
  openModal,
  setOpenModal,
}: CreateServerModalProps) => {
  return (
    <>
      <Modal
        open={openModal}
        setOpen={(val) => setOpenModal(val)}
        title="Create Server"
        content={<CreateServerForm setOpenModal={(val) => setOpenModal(val)} />}
        mainBackgroundColor="bg-black"
        titleTextColor="text-white"
        width="w-[500px]"
      />
    </>
  );
};

export default CreateServerModal;
