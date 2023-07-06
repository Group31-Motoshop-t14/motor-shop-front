"use client";
import { AuthContext } from "@/contexts/AuthContext";
import { usePathname, useRouter } from "next/navigation";
import { useContext } from "react";

export interface IcarAnnouncement {
  id: string;
  brand: string;
  model: string;
  year: string;
  fuelType: string;
  mileage: number;
  color: string;
  fipePrice: number;
  price: number;
  description: string;
  created_at: string;
  isPublished: boolean;
  coverImage: string;
  userId: string;
  user: {
    name: string;
    email: string;
    description: string;
    phone: string;
  };
  carImages: {
    id: string;
    url: string;
    carId: string;
  }[];
}

interface CardProps {
  car: IcarAnnouncement;
}

const Card = ({ car }: CardProps) => {
  const { userAuth } = useContext(AuthContext);

  const router = useRouter();
  const pathName = usePathname();

  if (car.coverImage === "") {
    car.coverImage = "/assets/carExample.png";
  }
  let isAdvertiserOwner = false;
  if (car.userId === userAuth?.id) {
    isAdvertiserOwner = true;
  }

  return (
    <div
      className="group m-2 flex h-[342px] w-full min-w-[280px] max-w-xs flex-col justify-between hover:cursor-pointer"
      onClick={() => router.push(`/announcement/${car.id}`)}>
      <div className="relative flex h-36 max-h-36 w-full justify-center border-2 border-grey7 bg-grey7 object-cover transition  group-hover:border-Brand1">
        <picture className="h-[140px] w-full">
          <img
            className="h-full w-full  bg-transparent object-contain"
            src={car.coverImage}
            alt="Imagem do veículo"
            width={312}
            height={132}
          />
        </picture>
        {isAdvertiserOwner && pathName !== "/" && (
          <span
            className={`prose-body-2-600 absolute left-4 top-[11px] bg-Brand1 px-2 text-grey10 ${
              car.isPublished ? "bg-Bran1" : "bg-grey4"
            }`}>
            {car.isPublished ? "Ativo" : "Inativo"}
          </span>
        )}
        {(car.price <= car.fipePrice || (5 / 100) * car.fipePrice >= car.price - car.fipePrice) && (
          <span className="prose-body-2-600 absolute right-0 top-0 bg-Green1 px-1 py-1 text-grey10">
            $
          </span>
        )}
      </div>
      <div className="flex h-[182px] flex-col justify-between text-grey1">
        <p className="prose-heading-7-600 truncate">{car.model}</p>
        <p className="prose-body-2-400 text-grey2 line-clamp-2 ">{car.description}</p>
        <div className="flex items-center gap-2">
          <span className="prose-body-2-600 flex h-8 w-8 items-center justify-center rounded-full bg-Brand2 text-grey10">
            {car.user.name[0].toUpperCase()}
          </span>
          <span className="prose-body-2-600 text-grey2">{car.user.name}</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex gap-3">
            <span className="prose-body-2-600  rounded bg-Brand4 px-2 py-1 text-Brand1">
              {car.mileage} KM
            </span>
            <span className="prose-body-2-600  rounded bg-Brand4 px-2 py-1 text-Brand1">
              {car.year}
            </span>
          </div>
          <span className="prose-heading-7-500">
            {car.price.toLocaleString("pt-br", { style: "currency", currency: "BRL" })}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Card;
