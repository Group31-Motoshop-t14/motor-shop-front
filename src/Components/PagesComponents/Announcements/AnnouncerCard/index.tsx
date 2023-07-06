"user client";

import { useRouter } from "next/navigation";
import { Button } from "../../../Button";
import { FaWhatsapp } from "react-icons/fa";
import { useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";

interface AnnouncerCardProps {
  user: {
    name: string;
    description: string;
    id: string;
    phone: string;
  };
}

const AnnouncerCard = ({ user }: AnnouncerCardProps) => {
  const router = useRouter();
  const { userAuth } = useContext(AuthContext);
  console.log(user);
  return (
    <div className="flex h-full max-h-[426px] w-full flex-col items-center justify-between gap-3 rounded bg-grey10 px-5 py-9">
      <span className="prose-heading-2-600 flex aspect-square min-h-[90px] min-w-[90px] items-center justify-center rounded-full bg-Brand1 text-white">
        {user.name[0].toUpperCase()}
      </span>
      <span className="prose-heading-6-600 text-grey1">{user.name}</span>
      <div className="space-y-4">
        <p className="prose-body-1-400 overflow-y-auto text-center text-grey2">
          {user.description}
        </p>
        {userAuth && (
          <div className="flex items-center gap-2">
            <FaWhatsapp color="#349974" size={24} />
            <a
              target="_blank"
              href={`https://api.whatsapp.com/send?phone=+${user.phone}&text=Ol%C3%A1%2C%20venho%20por%20meio%20do%20seu%20portf%C3%B3lio%20na%20internet%2C%20gostaria%20de%20conhecer%20melhor%20seus%20servi%C3%A7os`}
              className="prose-body-2-500 text-grey1 hover:text-Brand2">
              {user.phone}
            </a>
          </div>
        )}
      </div>
      <Button
        variant={"gradient"}
        color={"black"}
        size={"primary"}
        fullWidth={true}
        onClick={() => router.push(`/advertiser/${user.id}`)}>
        Ver todos anuncios
      </Button>
    </div>
  );
};

export default AnnouncerCard;
