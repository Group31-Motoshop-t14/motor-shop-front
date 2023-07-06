"use client";

import { createContext, useState } from "react";
import { ImodalContext, ImodalProviderProps, TmodalTypes } from "./types";

export const ModalContext = createContext({} as ImodalContext);
export const ModalProvider = ({ children }: ImodalProviderProps) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalType, setModalType] = useState<TmodalTypes>("filterHomePage");
  const [modalTitle, setModalTitle] = useState("Modal Title");
  const [modalImageCarUrl, setModalImageCarUrl] = useState("");
  const [modalCommentId, setModalCommentId] = useState("");
  const [modalCommentContent, setModalCommentContent] = useState("");

  const openModal = (
    type: TmodalTypes,
    modalTitle: string,
    commentId?: string,
    content?: string
  ) => {
    setModalType(type);
    setModalTitle(modalTitle);
    setIsOpen(true);
    if (commentId) {
      setModalCommentId(commentId);
    }
    if (content) {
      setModalCommentContent(content);
    }
  };

  const closeModal = () => {
    setModalCommentId("");
    setIsOpen(false);
  };

  return (
    <ModalContext.Provider
      value={{
        modalIsOpen,
        modalType,
        openModal,
        closeModal,
        modalTitle,
        modalImageCarUrl,
        setModalImageCarUrl,
        modalCommentId,
        modalCommentContent
      }}>
      {children}
    </ModalContext.Provider>
  );
};
