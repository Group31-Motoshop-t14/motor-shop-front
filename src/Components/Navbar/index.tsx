import { Sling } from "hamburger-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useOutClick } from "../../hooks/useOutClick";
import { NavAuth } from "./NavAuth";
import { NavDefault } from "./NavDefault";

export const Navbar = () => {
  const [menuBurgerIsOpen, setMenuBurgerIsOpen] = useState(false);
  const [menuAuthIsOpen, setMenuAuthIsOpen] = useState(false);

  const isAuth = false;
  const isAdvertiser = false;

  const closeMenuBurguer = () => {
    setMenuBurgerIsOpen(false);
  };
  const resizeWindowMenuBurhuer = () => {
    closeMenuBurguer();
  };

  const closeMenuAuth = () => {
    setMenuAuthIsOpen(false);
  };

  const toogleMenuAuth = () => {
    setMenuAuthIsOpen((oldValue) => !oldValue);
  };
  const resizeWindowMenuAuth = () => {
    closeMenuAuth();
  };

  const menuRef = useOutClick(() => {
    resizeWindowMenuBurhuer();
    resizeWindowMenuAuth();
  });

  useEffect(() => {
    window.addEventListener("resize", () => {
      resizeWindowMenuBurhuer();
      resizeWindowMenuAuth();
    });

    return () => {
      window.removeEventListener("resize", () => {
        resizeWindowMenuBurhuer();
        resizeWindowMenuAuth();
      });
    };
  }, []);
  return (
    <header className="w-full border-b-2 border-grey6 " ref={menuRef}>
      <div className="relative mx-auto my-0 flex h-20 w-full max-w-7xl items-center justify-between  bg-grey10 px-4 md:px-16 ">
        <Link href={"/"}>
          <Image
            src={"/motors-shop.svg"}
            alt="logo motors-shop"
            width={153}
            height={26}
            className="h-auto w-auto"
            priority
          />
        </Link>
        <div className="md:hidden">
          <Sling
            label="Show menu"
            hideOutline={false}
            rounded
            color="#2C2C2C"
            toggled={menuBurgerIsOpen}
            toggle={setMenuBurgerIsOpen}
          />
        </div>

        <div className="hidden h-full md:flex">
          <span className="mr-3 h-full w-[2px] bg-grey6"></span>
          {isAuth ? (
            <NavAuth
              isAdvertiser={isAdvertiser}
              menuAuthIsOpen={menuAuthIsOpen}
              toogleMenuAuth={toogleMenuAuth}
              name="Samuel Leão"
            />
          ) : (
            <NavDefault style="flex items-center gap-10" />
          )}
        </div>

        {menuBurgerIsOpen && (
          <>
            {isAuth ? (
              <nav
                className={`absolute left-0 top-[76px]  flex h-fit w-full items-center justify-center bg-grey10  px-3 py-3 pr-5`}>
                <NavAuth
                  isAdvertiser={isAdvertiser}
                  menuAuthIsOpen={menuAuthIsOpen}
                  toogleMenuAuth={toogleMenuAuth}
                  name="Samuel Leão"
                />
              </nav>
            ) : (
              <NavDefault style="absolute left-0 top-[76px]  flex h-44 w-full flex-col justify-between bg-grey10  px-3 py-8 pr-5" />
            )}
          </>
        )}
      </div>
    </header>
  );
};
