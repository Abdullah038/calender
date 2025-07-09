import Image from "next/image";
import Link from "next/link";

export default function SeaPawsRescue() {
  return (
    <>
      <div className=" min-h-screen flex flex-col items-center justify-center p-6">
        <div className="bg-[#42788C] rounded-2xl max-w-[95vw] w-full p-8 space-y-6 lg:space-y-0 lg:space-x-10">
      <div className=" flex justify-center mb-4">
        <Image
          src="/images/homepage/charity.png"
          alt="Sea Paws Rescue Logo"
          width={500}
          height={100}
        />
      </div>
        <div className=" flex flex-col lg:flex-row items-center justify-between text-white ">
          <div className="flex-1">
            <div className="flex items-center  space-x-3 mb-4">
              <a href="#">
                <Image
                  src="/facebook.png"
                  alt="Facebook"
                  width={24}
                  height={24}
                />
              </a>
              <a href="#">
                <Image
                  src="/instagram.png"
                  alt="Instagram"
                  width={24}
                  height={24}
                />
              </a>
              <a href="#">
                <Image
                  src="/linkedin.svg"
                  alt="LinkedIn"
                  width={24}
                  height={24}
                />
              </a>
              <Link href="https://www.seapawsrescue.org" target="_blank">
                <span className="text-white text-sm ml-2 underline">
                  www.seapawsrescue.org
                </span>
              </Link>
            </div>
            <h2 className="text-2xl font-semibold mb-2">
              A voice for the voiceless
            </h2>
            <p className="mb-6 text-sm lg:text-base">
              At Sea Paws Rescue, we're on a mission to save the lives of
              neglected and stray animals. Founded with a passion for animal
              welfare, our dedicated team works tirelessly to rescue,
              rehabilitate, and re-home animals in need.
            </p>
            <ul className="space-y-3 text-sm lg:text-base text-left inline-block">
              <li className="flex items-center space-x-2">
                <span className="text-yellow-300 text-xl">❤️</span>
                <span>vet care for rescued dogs</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-yellow-300 text-xl">🚌</span>
                <span>Transportation to foster homes</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-yellow-300 text-xl">🏠</span>
                <span>Nutritious food and comfy home</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-yellow-300 text-xl">💉</span>
                <span>Spay/neuter and vaccinations</span>
              </li>
            </ul>
            <div className="mt-6">
              <Link href="https://www.seapawsrescue.org/donate" target="_blank">
                <button className="bg-[#E1CFC6] text-[#42788C] font-bold py-2 px-6 rounded-full hover:bg-white transition-all">
                  DONATE NOW
                </button>
              </Link>
            </div>
          </div>
          <div className="flex-1">
            <div className="rounded-[20px] overflow-hidden shadow-lg">
              <Image
                src="/images/homepage/pawsRescueDogs.png"
                alt="Rescue Dogs"
                width={500}
                height={400}
                className="object-cover "
              />
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  );
}
