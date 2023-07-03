"use client";

import { Button } from "@/Components/Button";
import Card from "@/Components/Card";
import { AnnouncementContext } from "@/contexts/AnnouncementContext";
import { AuthContext } from "@/contexts/AuthContext";
import { UserProfile } from "@/contexts/AuthContext/types";
import { ModalContext } from "@/contexts/ModalContext.tsx";
import { useRouter } from "next/navigation";
import { useContext } from "react";

interface AdvertiserMainProps {
  user: UserProfile;
}

const AdvertiserMain = ({ user }: AdvertiserMainProps) => {
  const { userAuth, userProfile } = useContext(AuthContext);
  const { openModal } = useContext(ModalContext);

  const { cars, setEditAnnoucementModal } = useContext(AnnouncementContext);

  const router = useRouter();

  return (
    <main className="min-h-screen bg-gradient-to-b from-Brand1 from-[357px] via-grey8 via-[357px] to-grey8 to-100% pb-[73px] pt-[40px]">
      <div className="mx-auto flex w-full max-w-[1600px] flex-col items-center gap-16 px-4">
        <div className="flex w-full max-w-7xl flex-col gap-5 rounded bg-grey10 px-10 py-11">
          <span className="prose-heading-2-600 flex aspect-square h-[104px] w-[104px] items-center justify-center rounded-full bg-Brand1 text-white">
            {userProfile && user.id === userProfile?.id
              ? userProfile.name[0].toUpperCase()
              : user.name[0].toUpperCase()}
          </span>
          <div className="flex flex-wrap gap-2">
            <span className="prose-heading-6-600 text-grey1">
              {user.id === userProfile?.id ? userProfile.name : user.name}
            </span>
            {user.isAdvertiser && (
              <span className="prose-body-2-600 rounded bg-Brand4 px-2 py-1 text-Brand1">
                Anunciante
              </span>
            )}
          </div>
          <p className="prose-body-1-400 text-grey2">
            {user.id === userProfile?.id ? userProfile.description : user.description}
          </p>
          {userAuth && userAuth.id === user.id && (
            <div className="max-w-[170px]">
              <Button
                onClick={() => openModal("createCar", "Criar anuncio")}
                color="blue"
                size="secondary"
                variant="outlined"
                type="button"
                fullWidth>
                Criar anúncio
              </Button>
            </div>
          )}
        </div>

        <span className="prose-heading-5-600 self-start text-grey0">Anúncios</span>

        <div className="w-full">
          {cars.length > 0 ? (
            <ul className="flex gap-x-12 gap-y-20 overflow-x-scroll md:flex-wrap md:justify-around md:overflow-clip lg:grid lg:grid-cols-3 xl:grid-cols-4">
              {userAuth && userAuth.id === user.id
                ? cars.map((car) => (
                    <li key={car.id} className="gap- flex flex-col">
                      <Card car={car} />
                      <div className="flex gap-4">
                        <Button
                          color="black"
                          size="secondary"
                          variant="outlined"
                          type="button"
                          onClick={() => {
                            openModal("editAnnoucement", "Editar anúncio");
                            setEditAnnoucementModal(car);
                          }}>
                          Editar
                        </Button>
                        <div className="max-w-[160px]">
                          <Button
                            onClick={() => router.push(`/announcement/${car.id}`)}
                            color="black"
                            size="secondary"
                            variant="outlined"
                            type="button"
                            fullWidth>
                            Ver detalhes
                          </Button>
                        </div>
                      </div>
                    </li>
                  ))
                : cars
                    .filter((item) => item.isPublished == true)
                    .map((car) => (
                      <li key={car.id} className="gap- flex flex-col">
                        <Card car={car} />
                      </li>
                    ))}
            </ul>
          ) : (
            <h1>Anunciante sem anúncios.</h1>
          )}
        </div>
      </div>
    </main>
  );
};

export default AdvertiserMain;
