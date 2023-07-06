import { Dispatch, ReactNode, SetStateAction } from "react";

export interface ImodalContext {
  modalIsOpen: boolean;
  modalType: TmodalTypes;
  openModal: (type: TmodalTypes, modalTitle: string, commentId?: string, content?: string) => void;
  closeModal: () => void;
  modalTitle: string;
  setModalImageCarUrl: Dispatch<SetStateAction<string>>;
  modalImageCarUrl: string;
  modalCommentId: string;
  modalCommentContent: string;
}

export interface ImodalProviderProps {
  children: ReactNode;
}

export type TmodalTypes =
  | "filterHomePage"
  | "imageCar"
  | "createCar"
  | "sucessCreateCar"
  | "editUser"
  | "editAddress"
  | "sucessRegisterUser"
  | "recoverPassword"
  | "deleteUser"
  | "editAnnoucement"
  | "deleteAnnoucement"
  | "editComment"
  | "deleteComment";
