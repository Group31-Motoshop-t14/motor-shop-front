interface InavAuthProps {
  toogleMenuAuth: () => void;
  menuAuthIsOpen: boolean;
  isAdvertiser: boolean;
  name: string;
}

export const NavAuth = ({ toogleMenuAuth, menuAuthIsOpen, isAdvertiser, name }: InavAuthProps) => {
  return (
    <div className="relative  flex h-20 items-center">
      <button
        className="h-12 w-auto rounded px-7 py-3  "
        onClick={toogleMenuAuth}
        id="button-more-options">
        <div className="flex h-full items-center gap-2">
          <span className=" flex h-8 w-8 items-center justify-center rounded-full bg-Brand2 text-sm font-bold leading-none text-grey10">
            SL
          </span>
          <p className=" text-base font-normal leading-7 text-grey2">{name}</p>
        </div>
      </button>
      {menuAuthIsOpen && (
        <nav className="absolute left-2 top-16 flex h-fit w-52 flex-col items-start justify-start gap-4 rounded bg-grey9 p-5 shadow-[0px_4px_40px_-10px_rgba(0,0,0,0.25)]">
          <button
            className="text-base font-normal leading-7 text-grey2 hover:text-grey1 hover:underline"
            id="button-edit-profile">
            Editar Perfil
          </button>
          <button
            className="text-base font-normal leading-7 text-grey2 hover:text-grey1 hover:underline"
            id="button-edit-address">
            Editar endereço
          </button>
          {isAdvertiser && (
            <button
              className="text-base font-normal leading-7 text-grey2 hover:text-grey1 hover:underline"
              id="button-my-ads">
              Meus Anúncios
            </button>
          )}
          <button
            className="text-base font-normal leading-7 text-grey2 hover:text-grey1 hover:underline"
            id="button-logout">
            Sair
          </button>
        </nav>
      )}
    </div>
  );
};
