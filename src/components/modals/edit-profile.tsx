"use client";
import { ModalContext } from "@/context/createContext";
import * as Dialog from "@radix-ui/react-dialog";
import { XCircle } from "lucide-react";
import { FormEvent, useContext, useEffect, useRef, useState } from "react";
import FileUpload from "../file-upload";
import Input from "../ui/input";
import Textarea from "../ui/textarea";
import { EditProfile } from "@/types";
import useMutationData from "@/hooks/useMutationData";
import { editProfileFunc } from "@/handlers/user";
import { useRouter } from "next/navigation";

const EditProfileForm = () => {
  const { data, onClose } = useContext(ModalContext);
  const router = useRouter();

  const [file, setFile] = useState<string>(data?.profile?.imageUrl!);
  const [bio, setBio] = useState<string>(data?.profile?.bio!);
  const usernameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  const { isSuccess, isError, mutate } = useMutationData({
    func: editProfileFunc,
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    let data: EditProfile = {
      imageUrl: file,
      username: usernameRef.current?.value as string,
      bio: bio,
      email: emailRef.current?.value as string,
    };

    mutate(data);
  };

  useEffect(() => {
    if (isSuccess && !isError) {
      router.refresh();
      onClose();
    }
  }, [isSuccess, isError]);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <FileUpload
          endpoint="userImage"
          value={file}
          onChange={(val) => setFile(val)}
        />
        <div className="mt-3">
          <Input
            label="Username"
            ref={usernameRef}
            defaultValue={data?.profile?.username}
          />
        </div>
        <div className="mt-3">
          <Input
            label="Email"
            ref={emailRef}
            defaultValue={data?.profile?.email}
          />
        </div>
        <div className="mt-3">
          <Textarea
            label="Bio"
            value={bio}
            rows={5}
            onChange={(e) => setBio(e.target.value)}
            className={`${
              bio.length > 160 ? "border border-red-500" : ""
            } p-2.5 w-[100%] rounded-md bg-[rgb(43,43,47)] outline-none "text-zinc-300 text-sm`}
          />
          <p className="text-xs mt-0.5 text-right text-gray-400">
            {bio.length}/160
          </p>
        </div>
        <div className="flex justify-end mt-10">
          <button className="p-2 w-[30%] rounded-md border border-gray-200 text-gray-200 hover:bg-gray-200 hover:text-gray-800 font-bold">
            Update
          </button>
        </div>
      </form>
    </>
  );
};

const EditProfileModal = () => {
  const { type, isOpen, onClose } = useContext(ModalContext);
  const isModal = type === "editProfile" && isOpen;

  return (
    <>
      <Dialog.Root open={isModal}>
        <Dialog.Portal>
          <Dialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0" />
          <Dialog.Content
            className={`data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[100vh] w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-black p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none`}
          >
            <Dialog.Title className={`text-white m-0 text-[17px] font-medium`}>
              Edit Profile
            </Dialog.Title>
            <Dialog.Description
              className={`text-white mt-[10px] mb-5 text-[15px] leading-normal`}
            ></Dialog.Description>
            <EditProfileForm />
            <Dialog.Close>
              <button
                onClick={() => onClose()}
                className="text-gray-600 hover:text-violet-200 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
                aria-label="Close"
              >
                <XCircle />
              </button>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
};

export default EditProfileModal;
