import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <div className="mt-5 mx-5">
      <div className="bg-primaryColor80 max-w-primaryMaxWidth rounded-3xl mx-auto p-10 flex flex-col md:flex-row justify-between text-center items-center gap-6">
        {/* Beach ball image (left on desktop, top on mobile) */}
        <div className="hidden justify-center items-center md:flex">
          <Image
            src="/images/booking/beach-ball.png" // update this to your actual path
            alt="Beach Ball"
            width={100}
            height={100}
            className="object-contain"
          />
        </div>

        {/* Text content */}
        <div className="flex flex-col text-center space-y-2">
          <h1 className="text-xl xs:text-2xl sm:text-4xl font-extrabold text-black">
            BOOK YOUR PUP’S VISIT
          </h1>
          <p className="text-sm xs:text-md sm:text-2xl font-semibold text-white drop-shadow-sm">
            “Where Every Tail Finds Its Wag.”
          </p>

          <div className="pt-2">
            <Link href="/#meet-greet-form" scroll={false}>
              <button className="text-sm xs:text-md sm:text-lg bg-[#b9e6f7] text-black px-5 py-2 rounded-full font-medium hover:opacity-90 transition">
                New Client ? Click Here
              </button>
            </Link>
          </div>
        </div>

        {/* Dog image (right on desktop, bottom on mobile) */}
        <div className="hidden justify-center items-center md:flex">
          <Image
            src="/images/booking/dog-walking-and-carrying-leash.png" // update this to your actual path
            alt="Dog"
            width={130}
            height={130}
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
