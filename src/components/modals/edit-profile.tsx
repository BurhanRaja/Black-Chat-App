"use client";

import { useState } from "react";
import Modal from "../ui/modal";

interface EditProfileModalProps {
  openModal: boolean;
  setOpenModal: (val: boolean) => void;
}

const EditProfileModal = ({
  openModal,
  setOpenModal,
}: EditProfileModalProps) => {
  return (
    <>
      <Modal
        open={openModal}
        setOpen={(val) => setOpenModal(val)}
        title="Edit Profile"
        content={<>Hello World</>}
      />
    </>
  );
};

export default EditProfileModal;
