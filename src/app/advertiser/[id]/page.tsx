import { IcarAnnouncement } from "@/Components/Card";
import { ModalCustom } from "@/Components/Modal";
import AdvertiserMain from "@/Components/PagesComponents/Advertiser";
import { AnnouncementProvider } from "@/contexts/AnnouncementContext";
import { ModalProvider } from "@/contexts/ModalContext.tsx";
import { api } from "@/services/api";

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  cpf: string;
  phone: string;
  birthDate: Date;
  isAdvertiser: boolean;
  createdAt: Date;
  updatedAt: Date;
  address: {
    id: string;
    zipCode: string;
    state: string;
    city: string;
    street: string;
    number: string;
    complement: string;
  };
  description: string;
}

const getCars = async (id: string) => {
  try {
    const responseCar = await api.get<IcarAnnouncement[]>(`/cars/user/${id}`);
    return responseCar.data;
  } catch (error) {
    console.error(error);
  }
};

const getUser = async (id: string) => {
  try {
    const responseUser = await api.get<UserProfile>(`/user/profile/${id}`);
    return responseUser.data;
  } catch (error) {
    console.error(error);
  }
};

const AdvertiserPage = async ({ params }: { params: { id: string } }) => {
  const cars = await getCars(params.id);
  const user = await getUser(params.id);

  return (
    <>
      <AnnouncementProvider listCars={cars!}>
        <ModalProvider>
          <AdvertiserMain user={user!} />
          <ModalCustom />
        </ModalProvider>
      </AnnouncementProvider>
    </>
  );
};

export default AdvertiserPage;