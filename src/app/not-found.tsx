import Image from "next/image";
import Link from "next/link";
import errorImg from "@/assets/images/error.png";

const NotFound = () => {
  return (
    <div className="relative h-screen flex flex-col items-center justify-center">
      <div className="relative w-[60%] h-80">
        <Image
          className="object-contain"
          src={errorImg}
          alt="error"
          layout="fill"
        />
      </div>

      <Link href="/">
        <button className="font-medium px-5 py-3 mt-6 rounded border-none bg-green-400 text-white hover:bg-green-500">
          Back to home
        </button>
      </Link>
    </div>
  );
};

export default NotFound;
