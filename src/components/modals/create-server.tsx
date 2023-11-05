"use client";
import { useState } from "react";
import FileUpload from "../file-upload";
import Modal from "../ui/modal";
import Input from "../ui/input";

interface CreateServerModalProps {
  openModal: boolean;
  setOpenModal: (val: boolean) => void;
}

const CreateServerForm = () => {
  const [file, setFile] = useState<string>("");
  const [name, setName] = useState<string>("");

  return (
    <>
      <form>
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
          labelTextColor="text-gray-400 mt-2"
          inputTextColor="text-gray-200"
        />
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
        content={<CreateServerForm />}
        mainBackgroundColor="bg-black"
        titleTextColor="text-white"
        width="w-[500px]"
      />
    </>
  );
};

export default CreateServerModal;
