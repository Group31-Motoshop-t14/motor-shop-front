"use client";

import { IcarAnnouncement } from "@/Components/Card";
import Input from "@/Components/Input";
import Select from "@/Components/Select";
import TextArea from "@/Components/TextArea";
import { AnnouncementContext } from "@/contexts/AnnouncementContext";
import { ModalContext } from "@/contexts/ModalContext.tsx";
import { api } from "@/services/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { parseCookies } from "nookies";
import { useContext, useEffect, useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { createCarSchema, ICarsCreate } from "./createCar.schema";
import { Spinner } from "@material-tailwind/react";
import { toast } from "react-hot-toast";

interface EnumValuesType {
  [index: number]: string;
}

export const ModalCreateCar = () => {
  const [brandApi, setBrandApi] = useState<string[]>([]);
  const [selectBrand, setSelectBrand] = useState("");
  const [modelApi, setModelApi] = useState<
    { name: string; year: string; fuel: number; value: number | string; price: number }[]
  >([]);
  const [selectModelDisabled, setSelectModelDisabled] = useState(true);
  const [selectModelValue, setSelectModelValue] = useState("");
  const [valuesModel, setValuesModel] = useState<
    { name: string; year: string; fuel: number; value: number | string }[]
  >([]);

  const { closeModal, openModal } = useContext(ModalContext);
  const { setCars } = useContext(AnnouncementContext);
  const [loading, setLoading] = useState(false);

  const {
    register,
    trigger,
    setValue,
    control,
    handleSubmit,
    formState: { errors, isValid },
    formState
  } = useForm<ICarsCreate>({
    resolver: zodResolver(createCarSchema)
  });

  const { isSubmitted } = formState;

  const carSubmit = async (data: ICarsCreate) => {
    const { links, ...restData } = data;
    const url = links.map((item) => item.url);
    const toaster = toast.loading("Registrando seu carro, aguarde!");
    setLoading(true);
    try {
      const cookies = parseCookies();
      const token = cookies["@motors-shop:token"];
      api.defaults.headers.common.authorization = `Bearer ${token}`;
      const response = await api.post<IcarAnnouncement>("/cars", { ...restData, url });
      setCars((oldAnnoucements) => [response.data, ...oldAnnoucements]);
      closeModal();
      toast.dismiss(toaster);
      openModal("sucessCreateCar", "Sucesso!");
    } catch (error) {
      console.log(error);
      toast.dismiss(toaster);
      toast.error("Erro ao registrar seu carro!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const getBrand = async () => {
      const response = await fetch("https://kenzie-kars.herokuapp.com/cars");
      const data = await response.json();
      setBrandApi(Object.keys(data));
    };
    getBrand();
  }, []);

  useEffect(() => {
    const getModel = async () => {
      const response = await fetch(`https://kenzie-kars.herokuapp.com/cars?brand=${selectBrand}`);
      const data = await response.json();
      setModelApi(Object.values(data));
    };
    getModel();
  }, [selectBrand]);

  const handleBrandChange = (event: any) => {
    setSelectBrand(event.target.value);
    setValuesModel([{ fuel: 0, value: "", year: "", name: "" }]);
    setSelectModelValue("");
    if (event.target.value === "") {
      setSelectModelDisabled(true);
      setSelectModelValue("");
      setValuesModel([{ fuel: 0, value: "", year: "", name: "" }]);
    } else {
      setSelectModelDisabled(false);
    }
  };

  const handleModelChange = (event: any) => {
    setSelectModelValue(event.target.value);
    const selectedModel = modelApi.find((model) => model.name === event.target.value);
    setValuesModel([{ fuel: 0, value: "", year: "", name: "" }]);
    if (selectedModel) {
      setValuesModel([selectedModel]);
    }
  };

  const handleModelChangeWrapper = (event: any) => {
    handleModelChange(event);
    setSelectModelValue(event.target.value);
  };

  const EnumValues: EnumValuesType = {
    0: selectModelValue != "" ? "ETANOL" : "",
    1: "FLEX",
    2: "HIBRIDO",
    3: "ELETRICO"
  };

  const { fields, append, remove, prepend } = useFieldArray({
    control,
    name: "links"
  });

  // Adiciona um novo input de url de imagem do carro
  const addNewUrlLinks = () => {
    append({
      url: ""
    });
  };
  // Remove um input especifico de imagem do carro, porém obriga que sempre exista ao menos 1 input ativo.
  const removeUrlLinks = (index: number) => {
    if (fields.length > 1) remove(index);
  };

  useEffect(() => {
    setValue("year", valuesModel[0]?.year);
    trigger("year");
  }, [valuesModel[0]?.year, setValue]);

  useEffect(() => {
    setValue(
      "fipePrice",
      valuesModel[0]?.value === "" || valuesModel[0]?.value == undefined
        ? ""
        : Number(valuesModel[0]?.value)
    );
    trigger("fipePrice");
  }, [valuesModel[0]?.value, setValue]);

  useEffect(() => {
    setValue("fuelType", EnumValues[valuesModel[0]?.fuel]);
    trigger("fuelType");
  }, [valuesModel[0]?.fuel, setValue]);

  // Adiciona o primeiro input de url de imagem do carro
  useEffect(() => {
    prepend({
      url: ""
    });
  }, [prepend]);

  return (
    <div className=" h-fit max-h-[80vh] w-full overflow-auto ">
      <p className="prose-body-2-500 mb-5">Informações do veículo</p>
      <form onSubmit={handleSubmit(carSubmit)} className="mb-5 flex flex-col gap-2">
        <Controller
          name="brand"
          control={control}
          render={({ field }) => (
            <Select
              disabled={loading}
              label="Marca"
              error={
                isSubmitted === true
                  ? errors.brand?.message === "Required" || selectBrand === ""
                    ? "Campo obrigatório"
                    : undefined
                  : undefined
              }
              {...field}
              onChange={(e) => {
                handleBrandChange(e);
                field.onChange(e);
              }}>
              {brandApi.map((brand, index) => {
                return <option key={index}>{brand}</option>;
              })}
            </Select>
          )}
        />
        <Controller
          name="model"
          control={control}
          render={({ field }) => (
            <Select
              label="Modelo"
              error={
                isSubmitted === true
                  ? errors.model?.message === "Required" || selectModelValue == ""
                    ? "Campo obrigatório"
                    : undefined
                  : undefined
              }
              disabled={selectModelDisabled || loading}
              {...field}
              onChange={(e) => {
                handleModelChangeWrapper(e);
                field.onChange(e);
              }}>
              {modelApi.length > 0 &&
                modelApi.map((model, index) => {
                  return <option key={index}>{model.name}</option>;
                })}
            </Select>
          )}
        />
        <div className="flex flex-col gap-2 ">
          <div className="flex gap-5">
            <Input
              label="Ano"
              type="text"
              disabled={true}
              value={valuesModel[0]?.year || ""}
              register={register("year")}
              error={
                isSubmitted === true
                  ? errors.year?.message === "Required" ||
                    selectBrand === "" ||
                    selectModelValue === ""
                    ? "Campo obrigatório"
                    : undefined
                  : undefined
              }
              placeholder="Ex: 2018"
            />
            <Input
              label="Combustível"
              type="text"
              disabled={true}
              value={EnumValues[valuesModel[0]?.fuel] || ""}
              register={register("fuelType")}
              placeholder="Ex: Gasolina"
              error={
                isSubmitted === true
                  ? errors.fuelType?.message === "Required" ||
                    selectBrand === "" ||
                    selectModelValue === ""
                    ? "Campo obrigatório"
                    : undefined
                  : undefined
              }
            />
          </div>
          <div className="flex gap-5">
            <Input
              label="Quilometragem"
              type="number"
              register={register("mileage")}
              error={isSubmitted ? errors.mileage?.message : undefined}
              placeholder="KM 0.0"
              disabled={loading}
            />
            <Input
              label="Cor"
              type="text"
              register={register("color")}
              error={isSubmitted ? errors.color?.message : undefined}
              onChange={(event) => setValue("color", event.target.value)}
              placeholder="Digite uma cor"
              disabled={loading}
            />
          </div>

          <div className="flex gap-5">
            <Input
              label="Preço tabela FIPE"
              type="text"
              disabled={true}
              value={valuesModel[0]?.value || ""}
              register={register("fipePrice")}
              error={
                isSubmitted === true
                  ? errors.fuelType?.message === "Required" ||
                    selectBrand === "" ||
                    selectModelValue === ""
                    ? "Campo obrigatório"
                    : undefined
                  : undefined
              }
              placeholder="R$ 0.00"
            />
            <Input
              label="Preço"
              type="number"
              register={register("price")}
              error={isSubmitted ? errors.price?.message : undefined}
              placeholder="R$ 0.00"
              disabled={loading}
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <TextArea
            label="Descrição"
            onChange={(event) => setValue("description", event.target.value)}
            register={register("description")}
            error={isSubmitted ? errors.description?.message : undefined}
            placeholder="Digite sua descrição..."
            disabled={loading}
          />
          <Input
            label="Imagem da capa"
            type="text"
            register={register("coverImage")}
            onChange={(event) => setValue("coverImage", event.target.value)}
            error={isSubmitted ? errors.coverImage?.message : undefined}
            placeholder="https://..."
            disabled={loading}
          />
        </div>

        <div className="flex flex-col gap-2">
          {fields.map((field, index) => {
            return (
              <div key={field.id}>
                <div className="relative flex h-fit w-full  ">
                  <div className=" w-full ">
                    <Input
                      label={`${index + 1}° Imagem da galeria`}
                      type="text"
                      register={register(`links.${index}.url`)}
                      error={isSubmitted ? errors.links?.[index]?.url?.message : undefined}
                      placeholder="https://..."
                      formNoValidate
                      disabled={loading}
                    />
                  </div>
                  <div className="absolute right-0 top-1">
                    <button
                      type="button"
                      className="h-7 w-7 rounded  text-lg font-bold text-red-700"
                      onClick={() => removeUrlLinks(index)}>
                      X
                    </button>
                  </div>
                </div>
              </div>
            );
          })}

          <button
            type="button"
            onClick={addNewUrlLinks}
            className="w-full max-w-[315px]  rounded border-Brand4 bg-Brand4 px-3 py-3 text-sm font-semibold text-Brand1"
            disabled={loading}>
            Adicionar campo para imagem da galeria
          </button>
        </div>

        <div className="mt-9 flex justify-end gap-3">
          <button
            className="w-auto rounded border-grey6 bg-grey6 px-5 py-3 text-base font-semibold text-grey2"
            type="button"
            onClick={closeModal}>
            Cancelar
          </button>
          <button
            className={`${
              !isValid || loading ? "border-Brand3 bg-Brand3" : "border-Brand1 bg-Brand1"
            } flex w-auto items-center justify-center rounded px-5 py-3 text-base font-semibold text-Brand4`}
            type="submit"
            disabled={!isValid || loading}>
            {loading ? <Spinner color="blue-gray" /> : "Criar anúncio"}
          </button>
        </div>
      </form>
    </div>
  );
};
