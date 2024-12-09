"use client";
import Image from "next/image";
import bannerimg from "@/assets/images/bannerbg.jpg";
// import Link from "next/link";

const HeroSection = () => {
  return (
    <div className=" max-w-7xl mx-auto rounded-3xl bg-zinc-50 xl:h-[90vh] lg:h-[90vh] md:h-[60vh] sm:h-[50vh] h-[50vh] relative overflow-hidden">
      {/* Background Image */}

      <Image
        src={bannerimg}
        alt="Banner background"
        fill
        className="object-cover opacity-80"
        placeholder="blur"
      />
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Overlay Content */}
      <div className="absolute inset-0 text-center flex flex-col justify-center items-center text-white px-10">
        <h1 className=" lg:max-w-3xl mx-auto text-center font-bold text-4xl md:text-5xl mb-5 leading-[50px]">
          Cultivate Your Garden Passion with Ease
        </h1>
        <p className="mt-4 text-xl mb-10 max-w-lg mx-auto text-center md:text-lg font-normal leading-7">
          Seamlessly connect with fellow gardeners and enhance your green space
          effortlessly
        </p>

        {/* <Link href="news-feed"> */}
        <button className="bg-emerald-400 text-white text-sm px-3 py-2 rounded transition-all duration-500 hover:bg-emerald-500 hover:pr-5">
          <span className="relative inline-block transition-all duration-500 after:content-['\00bb'] after:absolute after:opacity-0 after:top-0 after:right-[-10px] after:transition-all after:duration-500 hover:after:opacity-100 hover:after:right-[-10]">
            See Posts
          </span>
        </button>
        {/* </Link> */}
      </div>
    </div>
  );
};

export default HeroSection;
