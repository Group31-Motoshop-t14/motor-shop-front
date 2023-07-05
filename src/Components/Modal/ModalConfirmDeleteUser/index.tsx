import { Button } from "@/Components/Button";
import { AuthContext } from "@/contexts/AuthContext";
import { ModalContext } from "@/contexts/ModalContext.tsx";
import { api } from "@/services/api";
import { Spinner } from "@material-tailwind/react";
import { useRouter } from "next/navigation";
import { destroyCookie } from "nookies";
import { useContext, useState } from "react";
import { toast } from "react-hot-toast";

export const ModalConfirmDeleteUser = () => {
  const [loading, setLoading] = useState(false);
  const { closeModal } = useContext(ModalContext);
  const { setUserAuth, setUserProfile } = useContext(AuthContext);
  const router = useRouter();

  const deleteUser = async () => {
    const toaster = toast.loading("Deletando sua conta, aguarde!");
    try {
      setLoading(true);
      await api.delete("/user");

      api.defaults.headers.common.authorization = `Bearer`;
      destroyCookie(null, "@motors-shop:token");
      setUserAuth(undefined);
      setUserProfile(undefined);
      toast.dismiss(toaster);
      toast.success("Sua conta foi deletada com sucesso!");
      closeModal();
      router.push("/");
    } catch (error) {
      console.log(error);
      toast.dismiss(toaster);
      toast.error("Não foi possível deletar sua conta!");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex h-fit w-full flex-col gap-5">
      <h3 className="prose-heading-7-500 text-grey1">Tem certeza que deseja apagar sua conta?</h3>
      <p className="prose-body-1-400 text-grey2">
        Essa ação não pode ser desfeita. Isso excluirá permanentemente sua conta e removerá seus
        dados de nossos servidores.
      </p>
      <div className="mt-4 flex flex-col gap-4">
        <button
          className="w-auto rounded border-grey6 bg-grey6 px-5 py-3 text-base font-semibold text-grey2 hover:bg-grey5"
          type="button"
          onClick={closeModal}>
          Cancelar
        </button>
        <Button
          variant="text"
          color="red"
          size="primary"
          fullWidth
          type="submit"
          onClick={deleteUser}
          disabled={loading}>
          {loading ? <Spinner color="blue-gray" /> : "Sim, excluir conta"}
        </Button>
      </div>
    </div>
  );
};
