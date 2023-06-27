import Input from "@/Components/Input";
import TextArea from "@/Components/TextArea";
import { AuthContext } from "@/contexts/AuthContext";
import { UserProfile } from "@/contexts/AuthContext/types";
import { ModalContext } from "@/contexts/ModalContext.tsx";
import { useMasks } from "@/hooks/useMasks";
import { api } from "@/services/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { TupdateUser, updateSchema } from "./schema";
import { toast } from "react-hot-toast";
import { Spinner } from "@material-tailwind/react";
import { Button } from "@/Components/Button";

export const ModalEditUser = () => {
  const [loading, setLoading] = useState(false);
  const { CPFMask, phoneMask } = useMasks();
  const { userProfile, setUserProfile } = useContext(AuthContext);
  const { closeModal, openModal } = useContext(ModalContext);
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<TupdateUser>({
    criteriaMode: "all",
    mode: "all",
    resolver: zodResolver(updateSchema),
    defaultValues: {
      name: userProfile?.name,
      email: userProfile?.email,
      cpf: CPFMask(userProfile!.cpf),
      phone: phoneMask(userProfile!.phone.slice(2)),
      birthDate: String(userProfile?.birthDate).split("T")[0],
      description: userProfile?.description
    }
  });

  const handleNumberPhone: React.KeyboardEventHandler<HTMLInputElement> = (event) => {
    const input = event.target as HTMLInputElement;
    input.value = phoneMask(input.value);
  };

  const handleCPF: React.KeyboardEventHandler<HTMLInputElement> = (event) => {
    const input = event.target as HTMLInputElement;
    input.value = CPFMask(input.value);
  };

  const formSubmit = async (data: TupdateUser) => {
    const toaster = toast.loading("Editando perfil, aguarde!");
    try {
      setLoading(true);
      const response = await api.patch<UserProfile>("/user", data);
      setUserProfile(response.data);
      toast.dismiss(toaster);
      closeModal();
      toast.success("Usuário atualizado com sucesso!");
    } catch (error) {
      console.log(error);
      toast.dismiss(toaster);
      toast.error("Erro ao atualizar usuário!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-fit max-h-[80vh] w-full flex-col gap-6 overflow-auto">
      <h5 className="prose-body-2-500">Informações pessoais</h5>

      <form onSubmit={handleSubmit(formSubmit)} noValidate={true} className="flex flex-col gap-2">
        <Input
          label="Nome"
          type="text"
          placeholder="Ex: João da Silva"
          register={register("name")}
          error={errors.name?.message}
          disabled={loading}
        />
        <Input
          label="Email"
          type="email"
          placeholder="Ex: joao@mail.com"
          register={register("email")}
          error={errors.email?.message}
          disabled={loading}
        />
        <Input
          label="CPF"
          type="text"
          placeholder="000.000.000-00"
          register={register("cpf")}
          error={errors.cpf?.message}
          maxLength={14}
          onKeyUp={handleCPF}
          disabled={loading}
        />
        <Input
          label="Celular"
          type="tel"
          placeholder="(DDD) 00000-0000"
          register={register("phone")}
          error={errors.phone?.message}
          maxLength={15}
          onKeyUp={handleNumberPhone}
          disabled={loading}
        />
        <Input
          label="Data de nascimento"
          type="date"
          register={register("birthDate")}
          error={errors.birthDate?.message}
          disabled={loading}
        />
        <TextArea
          label="Descrição"
          placeholder="Ex: Sobre mim"
          register={register("description")}
          error={errors.description?.message}
          disabled={loading}
        />
        <div className="mt-4 flex flex-col gap-4">
          <Button
            onClick={closeModal}
            variant="gradient"
            size="primary"
            fullWidth
            color="grey"
            type="button">
            Cancelar
          </Button>
          <Button
            onClick={() => {
              closeModal();
              openModal("deleteUser", "Excluir usuário");
            }}
            type="button"
            variant="text"
            color="red"
            size="primary"
            fullWidth
            disabled={loading}>
            Excluir Perfil
          </Button>

          <Button
            variant="gradient"
            color="blue"
            size="primary"
            fullWidth
            type="submit"
            disabled={loading}>
            {loading ? <Spinner color="blue-gray" /> : " Salvar alterações"}
          </Button>
        </div>
      </form>
    </div>
  );
};
