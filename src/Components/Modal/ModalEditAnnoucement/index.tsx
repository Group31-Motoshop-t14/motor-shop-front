import { IcarAnnouncement } from "@/Components/Card";
import Input from "@/Components/Input";
import TextArea from "@/Components/TextArea";
import { AnnouncementContext } from "@/contexts/AnnouncementContext";
import { ModalContext } from "@/contexts/ModalContext.tsx";
import { api } from "@/services/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { editCarSchema, ICarsEdit, IimagesCar } from "./schema";
import { Spinner } from "@material-tailwind/react";

export const ModalEditAnnoucement = () => {
  const [loading, setLoading] = useState(false);
  const { editAnnoucementModal, setCars } = useContext(AnnouncementContext);
  const { closeModal, openModal } = useContext(ModalContext);
  const [listDeleteImageCar, setListDeleteImageCar] = useState<IimagesCar[]>([]);
  const [statusIsPublished, setStatusIsPublished] = useState(editAnnoucementModal?.isPublished);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors }
  } = useForm<ICarsEdit>({
    criteriaMode: "all",
    mode: "all",
    resolver: zodResolver(editCarSchema),
    defaultValues: {
      brand: editAnnoucementModal?.brand,
      model: editAnnoucementModal?.model,
      year: editAnnoucementModal?.year,
      fuelType: editAnnoucementModal?.fuelType,
      mileage: editAnnoucementModal?.mileage,
      color: editAnnoucementModal?.color,
      fipePrice: editAnnoucementModal?.fipePrice,
      price: editAnnoucementModal?.price,
      description: editAnnoucementModal?.description,
      coverImage: editAnnoucementModal?.coverImage,
      isPublished: editAnnoucementModal?.isPublished.toString()
    }
  });

  const { fields, append, remove, prepend } = useFieldArray({
    control,
    name: "links"
  });

  // Adiciona um novo input de url de imagem do carro
  const addNewUrlLinks = () => {
    append({
      url: "",
      carId: null,
      idImage: null
    });
  };
  // Remove um input especifico de imagem do carro, porém obriga que sempre exista ao menos 1 input ativo.
  const removeUrlLinks = (index: number) => {
    if (fields.length > 1) remove(index);
  };

  const handleRadioChange = (value: string) => {
    setStatusIsPublished(value === "true");
    setValue("isPublished", value); // Atualiza o valor de isPublished no formulário
  };

  // Adiciona os inputs de url de imagem do carro já cadastrados
  useEffect(() => {
    editAnnoucementModal?.carImages.map(({ carId, id, url }) => {
      prepend({
        url,
        carId,
        idImage: id
      });
    });
  }, []);

  const formSubmit = async (data: ICarsEdit) => {
    const { links, isPublished: isPublishedString, ...formEditUser } = data;
    const isPublished = isPublishedString == "true"; // transforma o valor do input radio em boolean
    const listLinksToCreate = links.filter((link) => !link.idImage);
    const listLinksToUpdate = links.filter((link) => link.idImage);

    try {
      setLoading(true);
      await api.patch(`/cars/${editAnnoucementModal?.id}`, { ...formEditUser, isPublished });

      if (listLinksToCreate) {
        await Promise.all(
          listLinksToCreate.map(async (link) => {
            await api.post(`/cars/${editAnnoucementModal?.id}/image`, { url: link.url });
          })
        );
      }

      if (listLinksToUpdate) {
        await Promise.all(
          listLinksToUpdate.map(async (link) => {
            await api.patch(`/cars/${editAnnoucementModal?.id}/image/${link.idImage}`, {
              url: link.url
            });
          })
        );
      }

      if (listDeleteImageCar.length > 0) {
        await Promise.all(
          listDeleteImageCar.map(async (link) => {
            await api.delete(`/cars/${editAnnoucementModal?.id}/image/${link.idImage}`);
          })
        );
      }

      const responseEditAnnoucement = await api.get<IcarAnnouncement>(
        `/cars/${editAnnoucementModal?.id}`
      );
      setCars((oldList) => {
        return oldList.map((car) => {
          if (car.id === responseEditAnnoucement.data.id) {
            return responseEditAnnoucement.data;
          } else {
            return car;
          }
        });
      });
      closeModal();
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className="flex h-fit max-h-[80vh] w-full flex-col gap-6 overflow-auto">
      <h5 className="prose-body-2-500">Informações do veículo</h5>

      <form onSubmit={handleSubmit(formSubmit)} noValidate={true} className="flex flex-col gap-2">
        <Input
          label="Marca"
          type="text"
          placeholder="Escolha a marca"
          register={register("brand")}
          error={errors.brand?.message}
          disabled={true}
        />

        <Input
          label="Modelo"
          type="text"
          placeholder="Escolha o modelo"
          register={register("model")}
          error={errors.model?.message}
          disabled={true}
        />

        <div className="flex flex-col gap-2 ">
          <div className="flex gap-5">
            <Input
              label="Ano"
              type="text"
              placeholder="Escolha o ano"
              register={register("year")}
              error={errors.year?.message}
              disabled={true}
            />
            <Input
              label="Combustível"
              type="text"
              placeholder="Escolha o combustível"
              register={register("fuelType")}
              error={errors.fuelType?.message}
              disabled={true}
            />
          </div>
          <div className="flex gap-5">
            <Input
              label="Quilometragem"
              type="number"
              placeholder="KM 0.0"
              register={register("mileage")}
              error={errors.mileage?.message}
              disabled={loading}
            />
            <Input
              label="Cor"
              type="text"
              placeholder="Digite uma cor"
              register={register("color")}
              error={errors.color?.message}
              disabled={loading}
            />
          </div>
          <div className="flex gap-5">
            <Input
              label="Preço tabela FIPE"
              type="text"
              placeholder="R$ 0.00"
              register={register("fipePrice")}
              error={errors.fipePrice?.message}
              disabled={true}
            />
            <Input
              label="Preço"
              type="number"
              placeholder="R$ 0.00"
              register={register("price")}
              error={errors.price?.message}
              disabled={loading}
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <h5 className="prose-body-2-500">Publicado</h5>
          <div className="flex w-full flex-col items-center justify-around gap-4 xs:flex-row">
            <label
              className={`inline-flex h-12 w-[152px] items-center justify-center rounded-md border-[2px] px-4 py-2 hover:cursor-pointer hover:border-Brand1 hover:bg-Brand1 hover:text-grey10 ${
                statusIsPublished
                  ? "border-Brand1 bg-Brand1 text-grey10"
                  : "border-grey5 bg-grey10 text-grey0"
              }`}>
              <input
                type="radio"
                value="true"
                id="isPublished-radio-true"
                {...register("isPublished")}
                onChange={(e) => handleRadioChange(e.target.value)}
                className="sr-only"
                disabled={loading}
              />
              <span className="select-none">Sim</span>
            </label>
            <label
              className={`inline-flex h-12 w-[152px] items-center justify-center rounded-md border-[2px] px-4 py-2 hover:cursor-pointer hover:border-Brand1 hover:bg-Brand1 hover:text-grey10 ${
                !statusIsPublished
                  ? "border-Brand1 bg-Brand1 text-grey10"
                  : "border-grey5 bg-grey10 text-grey0"
              }`}>
              <input
                type="radio"
                value="false"
                id="isPublished-radio-false"
                {...register("isPublished")}
                onChange={(e) => handleRadioChange(e.target.value)}
                className="sr-only"
                disabled={loading}
              />
              <span className="select-none">Não</span>
            </label>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <TextArea
            label="Descrição"
            register={register("description")}
            error={errors.description?.message}
            placeholder="Digite sua descrição..."
            disabled={loading}
          />
          <Input
            label="Imagem da capa"
            type="text"
            register={register("coverImage")}
            error={errors.coverImage?.message}
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
                      error={errors.links?.[index]?.url?.message}
                      placeholder="https://..."
                      formNoValidate
                      disabled={loading}
                    />
                  </div>
                  <div className="absolute right-0 top-1">
                    <button
                      type="button"
                      className="h-7 w-7 rounded  text-lg font-bold text-red-700"
                      disabled={loading}
                      onClick={() => {
                        removeUrlLinks(index);
                        const carImagem: IimagesCar = field as IimagesCar;
                        if (carImagem.carId) {
                          setListDeleteImageCar((old) => [...old, carImagem]);
                        }
                      }}>
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
            disabled={loading}
            className="w-full max-w-[315px]  rounded border-Brand4 bg-Brand4 px-3 py-3 text-sm font-semibold text-Brand1">
            Adicionar campo para imagem da galeria
          </button>
        </div>

        <div className="mt-4 flex flex-col gap-4">
          <button
            className="w-auto rounded border-grey6 bg-grey6 px-5 py-3 text-base font-semibold text-grey2 hover:bg-grey5"
            type="button"
            disabled={loading}
            onClick={closeModal}>
            Cancelar
          </button>
          <button
            onClick={() => {
              closeModal();
              openModal("deleteAnnoucement", "Excluir anúncio");
            }}
            type="button"
            disabled={loading}
            className="w-auto rounded border-Alert2 bg-Alert2 px-5 py-3 text-base  font-semibold text-Alert1 hover:bg-Alert3">
            Excluir anúncio
          </button>

          <button
            type="submit"
            className="flex w-auto items-center justify-center rounded border-Brand1 bg-Brand1  px-5 py-3 text-center text-base font-semibold text-grey10 hover:bg-Brand2"
            disabled={loading}>
            {loading ? <Spinner color="blue-gray" /> : "Salvar alterações"}
          </button>
        </div>
      </form>
    </div>
  );
};
