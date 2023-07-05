"use client";

import TextArea from "@/Components/TextArea";
import { useForm } from "react-hook-form";
import { EditComment, editCommentSchema } from "./editComment.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "@/services/api";
import { useContext } from "react";
import { ModalContext } from "@/contexts/ModalContext.tsx";
import { Button } from "@/Components/Button";

export const ModalEditComment = () => {
  const { modalCommentId, closeModal, modalCommentContent } = useContext(ModalContext);

  const { register, handleSubmit } = useForm({
    resolver: zodResolver(editCommentSchema),
    defaultValues: {
      content: modalCommentContent
    }
  });

  const editComment = async (data: EditComment) => {
    try {
      await api.patch(`/comments/${modalCommentId}`, { ...data });
      window.location.reload();
      closeModal();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(editComment)} className="flex flex-col gap-8">
      <div>
        <TextArea register={register("content")} />
      </div>
      <div className="flex gap-4 self-end">
        <Button variant="gradient" color="blue" type="submit" size="secondary">
          Confirmar
        </Button>
        <Button variant="gradient" color="grey" size="secondary" onClick={() => closeModal()}>
          Cancelar
        </Button>
      </div>
    </form>
  );
};
