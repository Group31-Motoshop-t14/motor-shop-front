import { AnnouncementContext } from "@/contexts/AnnouncementContext";
import { ModalContext } from "@/contexts/ModalContext.tsx";
import { api } from "@/services/api";
import { Spinner } from "@material-tailwind/react";
import { useContext, useState } from "react";
import { toast } from "react-hot-toast";

export const ModalConfirmDeleteAnnoucement = () => {
  const [loading, setLoading] = useState(false);
  const { closeModal } = useContext(ModalContext);
  const { editAnnoucementModal, setCars } = useContext(AnnouncementContext);

  const deleteAnnoucement = async () => {
    const toaster = toast.loading("Deletando anúncio, aguarde!");
    setLoading(true);
    try {
      await api.delete(`/cars/${editAnnoucementModal?.id}`);
      setCars((oldList) => oldList.filter((item) => item.id !== editAnnoucementModal?.id));
      toast.dismiss(toaster);
      toast.success("Anúncio deletado com sucesso!");
      closeModal();
    } catch (error) {
      console.log(error);
      toast.dismiss(toaster);
      toast.error("Erro ao deletar anáncio!");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex h-fit w-full flex-col gap-5">
      <h3 className="prose-heading-7-500 text-grey1">
        Tem certeza que deseja remover este anúncio?
      </h3>
      <p className="prose-body-1-400 text-grey2">
        Essa ação não pode ser desfeita. Isso excluirá permanentemente seu anúncio e removerá os
        dados de nossos servidores.
      </p>
      <div className="mt-4 flex flex-col gap-4">
        <button
          className="w-auto rounded border-grey6 bg-grey6 px-5 py-3 text-base font-semibold text-grey2 hover:bg-grey5"
          type="button"
          onClick={closeModal}>
          Cancelar
        </button>
        <button
          disabled={loading}
          className="flex w-auto items-center justify-center rounded border-Alert2 bg-Alert2 px-5 py-3 text-base  font-semibold text-Alert1 hover:bg-Alert3"
          onClick={deleteAnnoucement}>
          {loading ? <Spinner color="blue-gray" /> : "Sim, excluir anúncio"}
        </button>
      </div>
    </div>
  );
};
