"use client";
import Image from "next/image";
import sunlight from "@/assets/images/sunlight.jpg";
import fertilizer from "@/assets/images/fertilizer.jpg";
import watering from "@/assets/images/water.jpg";
import companion from "@/assets/images/companion.jpg";
import { motion } from "framer-motion";

const tipsData = [
  {
    id: 1,
    title: "Maximize Sunlight Exposure",
    imageUrl: sunlight,
    description: "Learn how to position your plants to get the best sunlight.",
  },
  {
    id: 2,
    title: "DIY Organic Fertilizers",
    imageUrl: fertilizer,
    description:
      "Create natural fertilizers from household waste for nutrient-rich soil.",
  },
  {
    id: 3,
    title: "Watering Strategies",
    imageUrl: watering,
    description:
      "Efficient watering techniques to keep plants hydrated and happy.",
  },
  {
    id: 4,
    title: "Companion Planting",
    imageUrl: companion,
    description: "Discover plant pairings that enhance growth and deter pests.",
  },
];

const TipsSection = () => {
  return (
    <div className="bg-zinc-50 py-16 max-w-7xl mx-auto px-4">
      <h2 className="text-center text-3xl font-bold text-emerald-500 mb-4">
        Essential Tips for Thriving Gardens
      </h2>
      <p className="text-center text-gray-600 max-w-2xl mx-auto mb-8">
        Discover simple tricks and practical advice to keep your garden lush and
        healthy. From plant care to soil health, we’re here to help your garden
        flourish.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {tipsData.map((tip) => (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            key={tip.id}
            className="bg-white rounded-lg shadow-lg overflow-hidden group transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
          >
            <div className="relative h-52 overflow-hidden">
              <Image
                src={tip.imageUrl}
                alt={tip.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover w-full h-full transform transition-transform duration-300 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>
            </div>

            <div className="p-6 relative">
              <h3 className="text-lg font-semibold text-emerald-500 mb-2">
                {tip.title}
              </h3>
              <p className="text-gray-700 text-sm mb-4">{tip.description}</p>
              <button className="text-base text-emerald-500 font-medium hover:underline">
                Read More →
              </button>
              <div className="absolute -top-5 -left-5 w-10 h-10 bg-emerald-200 rounded-full opacity-50 group-hover:scale-125 transform transition-all duration-300"></div>
              <div className="absolute -bottom-5 -right-5 w-12 h-12 bg-emerald-300 rounded-full opacity-50 group-hover:scale-125 transform transition-all duration-300"></div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TipsSection;
