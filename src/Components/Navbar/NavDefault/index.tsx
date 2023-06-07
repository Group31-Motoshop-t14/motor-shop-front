import Link from "next/link";

interface InavDefaultProps {
  style: string;
}

export const NavDefault = ({ style }: InavDefaultProps) => {
  return (
    <nav className={style}>
      <Link
        href={"/"}
        className="flex h-12  w-auto  items-center justify-center  rounded  px-7 py-3 text-base font-semibold text-grey0 hover:bg-grey8"
        id="link-login-page">
        Fazer Login
      </Link>
      <Link
        href={"/"}
        className="flex h-12 w-auto items-center justify-center  rounded border-[1.5px] border-grey4 px-7 py-3 text-base font-semibold text-grey0 hover:border-grey1 hover:bg-grey1 hover:text-grey10"
        id="link-register-page">
        Cadastrar
      </Link>
    </nav>
  );
};
