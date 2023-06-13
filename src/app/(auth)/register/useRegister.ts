"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { TRegisterData, registerSchema } from "./schema";
import { api } from "@/services/api";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

type TAddressProps = {
  bairro: string;
  complemento: string;
  uf: string;
  logradouro: string;
  localidade: string;
};

export const useRegister = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors }
  } = useForm<TRegisterData>({
    criteriaMode: "all",
    mode: "all",
    resolver: zodResolver(registerSchema)
  });

  const cep = watch("zipCode");

  const handleSetData = useCallback((data: TAddressProps) => {
    setValue("city", data.localidade);
    setValue("street", data.logradouro);
    setValue("state", data.uf);
    setValue("complement", data.complemento);
  }, []);

  const handleFetchAddress = useCallback(
    async (cep: string) => {
      try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();
        console.log(data);
        handleSetData(data);
      } catch (error) {
        console.error(error);
      }
    },
    [handleSetData, cep]
  );

  const formSubmit: SubmitHandler<TRegisterData> = async (data) => {
    console.log(data);
    const toaster = toast.loading("Realizando cadastro, aguarde!");
    setLoading(true);
    try {
      await api.post<TRegisterData>("/register", data);
      toast.dismiss(toaster);
      toast.success("Cadastro realizado!");
      router.push("/login");
    } catch (error: any) {
      console.log(error);
      toast.dismiss(toaster);
      toast.error("Opps! algo deu errado, tente novamente");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setValue("zipCode", cep);

    if (cep && cep.length !== 9) {
      return;
    }
    handleFetchAddress(cep);
  }, [handleFetchAddress]);

  return {
    loading,
    errors,
    register,
    handleSubmit,
    formSubmit
  };
};