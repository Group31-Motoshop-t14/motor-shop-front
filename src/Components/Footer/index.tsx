import Image from "next/image";
import Link from "next/link";

export const Footer = () => {
  const backToTop = () => {
    window.scrollTo(0, 0);
  };
  return (
    <footer className=" h-72 w-full bg-grey0 sm:h-32">
      <div className="mx-auto my-0 flex h-full w-full max-w-7xl flex-col items-center justify-between gap-2 px-4 py-10 sm:flex-row md:px-16">
        <Link href={"/"}>
          <Image
            src={"/motors-shop-white.svg"}
            alt="logo motors-shop"
            width={153}
            height={26}
            className="h-auto w-auto"
            priority
          />
        </Link>
        <p className="text-center text-sm font-normal leading-6 text-grey10">
          © 2023 - Todos os direitos reservados.
        </p>

        <button
          className="flex h-12 w-12 items-center justify-center rounded bg-grey1 text-grey10 hover:bg-grey2"
          id="back-to-top"
          onClick={backToTop}>
          <Image
            src={"/angle-up-icon.svg"}
            alt="logo motors-shop"
            width={10}
            height={18}
            className="h-auto w-auto"
            priority
          />
        </button>
      </div>
    </footer>
  );
};
