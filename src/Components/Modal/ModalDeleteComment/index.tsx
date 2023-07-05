import { Button } from "@/Components/Button";
import { ModalContext } from "@/contexts/ModalContext.tsx";
import { api } from "@/services/api";
import { useContext } from "react";

export const ModalDeleteComment = () => {
  const { modalCommentId, closeModal } = useContext(ModalContext);

  const deleteComment = async () => {
    try {
      const response = await api.delete(`/comments/${modalCommentId}`);
      console.log(response);
      window.location.reload();
      closeModal();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <p className="prose-body-1-400 text-grey2">
        Confirmando essa ação, seu comentário será apagado permanentemente. Deseja prosseguir?
      </p>
      <div className="flex gap-4 self-end">
        <Button
          variant="gradient"
          color="blue"
          type="submit"
          size="secondary"
          onClick={() => deleteComment()}>
          Confirmar
        </Button>
        <Button variant="gradient" color="grey" size="secondary" onClick={() => closeModal()}>
          Cancelar
        </Button>
      </div>
    </div>
  );
};
