import { TFavouritePost } from "@/types";
import Image from "next/image";

type TFavPostProps = {
  post: TFavouritePost;
};

const FavoritePostSection = ({ post }: TFavPostProps) => {
  return (
    <div className="flex xl:flex-row lg:flex-row sm:flex-row md:flex-col flex-col mb-4 items-start space-x-3 bg-gray-50 p-3 rounded-lg shadow-md overflow-hidden">
      <div className="xl:w-[30%] lg:w-[30%] sm:w-[30%] md:w-full w-full h-[160px]">
        <Image
          src={
            post?.images
              ? post.images
              : "https://i.ibb.co.com/sJ6MZDH/default-image.jpg"
          }
          alt={post?.title}
          width={300}
          height={300}
          className="w-full h-full object-cover rounded-md"
        />
      </div>
      <div className="xl:w-[70%] lg:w-[70%] sm:w-[70%] md:w-full w-full text-start">
        <h3 className="text-base md:text-lg font-semibold my-1 line-clamp-1">
          {post?.title}
        </h3>
        <p
          className="text-sm md:text-base text-gray-500 mb-2 line-clamp-3"
          dangerouslySetInnerHTML={{
            __html: post?.description,
          }}
        ></p>
        <p className="text-xs md:text-sm text-gray-600">
          Category: {post?.category}
        </p>
      </div>
    </div>
  );
};

export default FavoritePostSection;
