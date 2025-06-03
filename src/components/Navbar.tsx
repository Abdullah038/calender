import Link from "next/link";
import Menu from "./Menu";
import Image from "next/image";
import SearchBar from "./SearchBar";
import NavIcons from "./NavIcons";
import TopBar from "./TopBar";

const Navbar = () => {
  return (
    <>
      <div className="h-20 pt-2 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative">
        {/* MOBILE */}
        <div className="h-full flex item-center justify-between items-center md:hidden">
          <Link href="text-2xl tracking-wide" className="flex items-center gap-2">
            {" "}
            <Image
              src="/logo.jpg"
              alt=""
              width={70}
              height={70}
              className="rounded-full"
            />{" "}
            Bark and Beaches
          </Link>
          <Menu />
        </div>

        {/* DESKTOP */}
        <div className="hidden md:flex items-center justify-between gap-8 h-full bg-primaryColor80 px-10 rounded-full ">
          {/* LEFT */}
          <div className="">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/logo.jpg"
                alt=""
                width={70}
                height={70}
                className="rounded-full"
              />
            </Link>
          </div>

          {/* RIGHT */}
          <div className="flex items-center justify-between gap-8">
            <div className="flex items-center justify-between gap-8 text-white lg:text-xl">
              <Link href="/">Home</Link>
              {/* <Link href="/">Shop</Link> */}
              <Link href="/Booking">Booking</Link>
              <Link href="/waiver">Waiver</Link>
              <Link href="/aboutUs">About Us</Link>
            </div>
            {/* <NavIcons /> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
