import CarsFilterComponent from "@/Components/CarsFilter";
import { ModalCustom } from "@/Components/Modal";
import { HomeProvider } from "@/contexts/HomeContext";
import { IListAnnoucementsFilter } from "@/contexts/HomeContext/types";
import { ModalProvider } from "@/contexts/ModalContext.tsx";
import { api } from "@/services/api";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const getLisAnnouncements = async () => {
  try {
    const { data } = await api.get<IListAnnoucementsFilter>(`/filters`);
    return data;
  } catch (error) {
    throw new Error("API sendo iniciada");
  }
};

// const WithCustomLoading = dynamic(() => import("@/Components/Modal"), {
//   ssr: false,
//   loading: () => <p>Loading...</p>
// });

const Home = async () => {
  const listAnnoucements = await getLisAnnouncements();

  return (
    <HomeProvider listAnnoucementsServer={listAnnoucements}>
      <ModalProvider>
        <>
          <main className="mx-auto max-w-[1600px]">
            <section className="flex max-h-[537px] min-h-[537px] w-full items-center justify-center bg-[url('/car.png')] bg-center bg-no-repeat">
              <div className="flex max-h-[537px] min-h-[537px] w-full items-center justify-center bg-gradient-to-b from-[rgba(0,0,0,0.19940476190476186)] to-grey0">
                <div className="px-8 text-center">
                  <h1 className="prose-heading-3-500 mb-6 text-grey10 md:prose-heading-1-700">
                    Motors Shop
                  </h1>
                  <h2 className="prose-heading-5-500 text-grey10 md:prose-heading-2-600">
                    A melhor plataforma de anúncios de carros do país
                  </h2>
                </div>
              </div>
            </section>
            <div className="">
              <CarsFilterComponent />
            </div>
          </main>
          <Suspense fallback={<div>Loading...</div>}>
            <ModalCustom />
          </Suspense>
        </>
      </ModalProvider>
    </HomeProvider>
  );
};

export default Home;
