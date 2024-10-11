"use client";

import Image from "next/image";

import { motion } from "framer-motion";

interface GalleryItem {
  id: number;
  title: string;
  imageUrl: string;
}

const galleryData: GalleryItem[] = [
  {
    id: 1,
    title: "Beautiful Succulent Garden",
    imageUrl: "https://i.ibb.co.com/4SvRP8R/garden1.jpg",
  },
  {
    id: 2,
    title: "Blooming Roses",
    imageUrl: "https://i.ibb.co.com/dc3ckhY/garden3.jpg",
  },
  {
    id: 3,
    title: "Lush Indoor Plants",
    imageUrl: "https://i.ibb.co.com/YDnvjCd/garden2.jpg",
  },
  {
    id: 4,
    title: "Urban Balcony Garden",
    imageUrl: "https://i.ibb.co.com/gWv0h5C/garden4.jpg",
  },
  {
    id: 5,
    title: "Outdoor Landscape Design",
    imageUrl: "https://i.ibb.co.com/pdDpR45/garden6.jpg",
  },
  {
    id: 6,
    title: "Exotic Orchid Collection",
    imageUrl: "https://i.ibb.co.com/hfLd06w/garden5.jpg",
  },
];

const ImageGallery = () => {
  return (
    <section className="py-12 px-5 xl:px-16 lg:px-12 bg-zinc-50">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-emerald-500">
          Our Latest Works Image Gallery
        </h2>
        <p className="mt-4 text-gray-600 max-w-xl mx-auto">
          Explore the latest beautiful and creative works from our gardening
          community. Get inspired and start cultivating your own green space!
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 2 }}
        className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 auto-rows-auto"
      >
        {galleryData.map((item) => (
          <div
            key={item.id}
            className="relative group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <Image
              src={item.imageUrl}
              alt={item.title}
              width={300}
              height={300}
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-40 transition-opacity duration-300"></div>
            <div className="absolute inset-0 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <h3 className="text-lg font-semibold">{item.title}</h3>
            </div>
          </div>
        ))}
      </motion.div>
    </section>
  );
};

export default ImageGallery;
