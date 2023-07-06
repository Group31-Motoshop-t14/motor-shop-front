"use client";

import { ICommentCreateProps, ICommentProps } from "@/app/announcement/[id]/page";
import { Button } from "@/Components/Button";
import { IcarAnnouncement } from "@/Components/Card";
import Comment from "@/Components/Comment";
import AnnouncerCard from "@/Components/PagesComponents/Announcements/AnnouncerCard";
import TextArea from "@/Components/TextArea";
import { AuthContext } from "@/contexts/AuthContext";
import { ModalContext } from "@/contexts/ModalContext.tsx";
import { api } from "@/services/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { Spinner } from "@material-tailwind/react";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { commentSchema } from "./schema";

interface IannouncementsMainProps {
  carsAnnouncement: IcarAnnouncement;
  carComments: Array<ICommentProps>;
}

export const AnnouncementsMain = ({ carsAnnouncement, carComments }: IannouncementsMainProps) => {
  const { openModal, setModalImageCarUrl } = useContext(ModalContext);
  const { userAuth, userProfile } = useContext(AuthContext);

  const [comments, setComments] = useState(carComments);
  const [loading, setLoading] = useState(false);

  const openModalImageCar = (url: string) => {
    openModal("imageCar", "Imagem do veículo");
    setModalImageCarUrl(url);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset
  } = useForm<ICommentCreateProps>({
    resolver: zodResolver(commentSchema)
  });

  const createComment = async (data: ICommentCreateProps) => {
    try {
      setLoading(true);
      const res = await api.post<ICommentProps>(`/comments/${carsAnnouncement.id}`, data);
      reset();
      setComments((oldList) => [...oldList, res.data]);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-Brand1 from-30% via-grey8 via-30% to-grey8 to-100% pb-[73px] pt-[40px]">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4">
        <div className="flex w-full flex-wrap justify-between gap-3.5 [@media(min-width:1000px)]:flex-nowrap">
          <div className="flex w-full max-w-full flex-col gap-8 [@media(min-width:1000px)]:max-w-3xl">
            <div className="flex flex-col gap-5">
              <div className="flex h-[355px] w-full max-w-full items-center justify-center rounded bg-grey10 object-contain xl:max-w-3xl">
                <picture className="h-[80%] w-full ">
                  <img
                    className="h-full w-full  bg-transparent object-contain"
                    src={carsAnnouncement.coverImage}
                    alt="Imagem do veículo"
                    width={312}
                    height={132}
                  />
                </picture>
              </div>
              <div className="flex flex-col gap-9 rounded bg-grey10 px-5 pb-8 pt-11">
                <h1 className="prose-heading-6-600">
                  {`${carsAnnouncement.model} ${carsAnnouncement.brand}`}
                </h1>
                <div className="flex flex-wrap items-center justify-between gap-9 gap-x-24">
                  <div className="flex gap-3">
                    <span className="prose-body-2-600  rounded bg-Brand4 px-2 py-1 text-Brand1">
                      {carsAnnouncement.mileage} KM
                    </span>
                    <span className="prose-body-2-600  rounded bg-Brand4 px-2 py-1 text-Brand1">
                      {carsAnnouncement.year}
                    </span>
                  </div>
                  <span className="prose-heading-7-500">
                    {carsAnnouncement.price.toLocaleString("pt-br", {
                      style: "currency",
                      currency: "BRL"
                    })}
                  </span>
                </div>
                {userAuth && (
                  <Button
                    variant={"gradient"}
                    color={"blue"}
                    size={"secondary"}
                    onClick={() =>
                      (window.location.href = `https://api.whatsapp.com/send?phone=+${
                        userProfile!.phone
                      }&text=Ol%C3%A1%2C%20venho%20por%20meio%20do%20seu%20portf%C3%B3lio%20na%20internet%2C%20gostaria%20de%20conhecer%20melhor%20seus%20servi%C3%A7os`)
                    }>
                    Comprar
                  </Button>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-8 rounded bg-grey10 px-5 pb-8 pt-11">
              <span className="prose-heading-6-600 text-grey1">Descrição</span>
              <p className="prose-body-1-400 text-grey2">{carsAnnouncement.description}</p>
            </div>
          </div>
          <div className="flex w-full max-w-full flex-col gap-8 [@media(min-width:1000px)]:max-w-md">
            <div className="flex flex-col gap-8 rounded bg-grey10 px-5 pb-8 pt-9">
              <span className="prose-heading-6-600 text-grey1">Fotos</span>
              <div className="grid max-h-52 grid-cols-3 gap-x-3.5 gap-y-8 overflow-y-auto">
                {carsAnnouncement.carImages.map((img) => (
                  <picture
                    key={img.id}
                    className="h-[100%] w-full bg-grey7 hover:cursor-pointer"
                    onClick={() => openModalImageCar(img.url)}>
                    <img
                      className="h-full w-full  bg-transparent object-contain"
                      src={img.url}
                      alt="Imagem do veículo"
                      width={312}
                      height={152}
                    />
                  </picture>
                ))}
              </div>
            </div>
            <AnnouncerCard
              user={{
                name: carsAnnouncement.user.name,
                description: carsAnnouncement.user.description,
                id: carsAnnouncement.userId,
                phone: carsAnnouncement.user.phone
              }}
            />
          </div>
        </div>
        <div className="flex w-full max-w-full flex-col gap-8 [@media(min-width:1000px)]:max-w-3xl">
          <div className="flex flex-col gap-6 rounded bg-grey10 px-5 py-9">
            <span className="prose-heading-6-600">Comentários</span>
            <ul className="flex flex-col gap-11">
              {comments.map((comment) => {
                return <Comment key={comment.id} comment={comment} />;
              })}
            </ul>
          </div>
          <div className="flex flex-col gap-4 rounded bg-grey10 px-5 py-9">
            {userAuth && (
              <div className="flex items-center gap-2">
                <span className="prose-body-2-600 flex h-8 w-8 items-center justify-center rounded-full bg-Brand2 text-grey10">
                  {userProfile?.name[0].toUpperCase()}
                </span>
                <span className="prose-body-2-600 text-grey2">{userProfile?.name}</span>
              </div>
            )}
            <form className="relative" onSubmit={handleSubmit(createComment)}>
              <TextArea
                disabled={!userAuth && true}
                register={register("content")}
                error={errors.content?.message}
                rows={4}
                placeholder="Carro muito confortável, foi uma ótima experiência de compra..."
              />
              <div
                className={`absolute ${
                  errors.content?.message ? "bottom-9" : "bottom-3"
                }  right-3`}>
                <Button
                  variant={"gradient"}
                  color={userAuth ? "blue" : "grey"}
                  size={"secondary"}
                  fullWidth={true}
                  type="submit"
                  disabled={(!userAuth && true) || loading}>
                  {loading ? <Spinner color="blue-gray" /> : "Comentar"}
                </Button>
              </div>
            </form>
            <ul className="flex flex-wrap gap-2">
              <li>
                <button
                  onClick={() => setValue("content", "Gostei muito!")}
                  className="prose-body-2-600 rounded-full bg-grey7 px-3 py-1 text-xs text-grey3 transition hover:bg-grey6"
                  disabled={!userAuth && true}>
                  Gostei muito!
                </button>
              </li>
              <li>
                <button
                  onClick={() => setValue("content", "Incrível!")}
                  className="prose-body-2-600 rounded-full bg-grey7 px-3 py-1 text-xs text-grey3 transition hover:bg-grey6"
                  disabled={!userAuth && true}>
                  Incrível!
                </button>
              </li>
              <li>
                <button
                  onClick={() => setValue("content", "Recomendarei para meus amigos!")}
                  className="prose-body-2-600 rounded-full bg-grey7 px-3 py-1 text-xs text-grey3 transition hover:bg-grey6"
                  disabled={!userAuth && true}>
                  Recomendarei para meus amigos!
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
};
