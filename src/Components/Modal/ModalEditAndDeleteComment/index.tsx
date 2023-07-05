"use client";

import TextArea from "@/Components/TextArea";
import { useForm } from "react-hook-form";
import { EditComment, editCommentSchema } from "./editComment.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "@/services/api";
import { useContext, useEffect } from "react";
import { ModalContext } from "@/contexts/ModalContext.tsx";

export const ModalEditComment = () => {

  const {modalCommentId, closeModal, modalCommentContent} = useContext(ModalContext)

  const {register, handleSubmit} = useForm({
    resolver: zodResolver(editCommentSchema),
    defaultValues: {
        content: modalCommentContent
    },
  })

  const editComment = async (data: EditComment) => {
    try {
      const response = await api.patch(`/comments/${modalCommentId}`, { ...data });
      console.log(response)
      window.location.reload()
      closeModal()
    } catch (error) {
      console.log(error);
    } 
  }

  return (
    <form onSubmit={handleSubmit(editComment)}>
    <div>
        <TextArea
            register={register("content")}
        />
    </div>
    <div className="flex">
        <button type="submit">Confirmar</button>
        <button onClick={() => closeModal()}>Cancelar</button>
    </div>
    </form>
  );
};
