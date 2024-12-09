"use client";
import Image from "next/image";
import sunlight from "@/assets/images/sunlight.jpg";
import fertilizer from "@/assets/images/fertilizer.jpg";
import watering from "@/assets/images/water.jpg";
import companion from "@/assets/images/companion.jpg";
import pestcontrol from "@/assets/images/pest-control.jpg";
import pruning from "@/assets/images/pruning.jpg";
import soiltesting from "@/assets/images/soil-testing.jpg";
import gardentool from "@/assets/images/garden-tool.jpg";
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
  {
    id: 5,
    title: "Pest Control Naturally",
    imageUrl: pestcontrol,
    description: "Use natural methods to keep your plants safe from insects.",
  },
  {
    id: 6,
    title: "Mulching Benefits",
    imageUrl: gardentool,
    description:
      "Learn how mulching can improve soil health and retain moisture.",
  },
  {
    id: 7,
    title: "Seasonal Planting Guide",
    imageUrl: soiltesting,
    description:
      "Plan your garden with a seasonal planting schedule for best results.",
  },
  {
    id: 8,
    title: "Pruning Tips",
    imageUrl: pruning,
    description: "Master the art of pruning to encourage healthy plant growth.",
  },
  {
    id: 9,
    title: "Garden Tool Care",
    imageUrl: gardentool,
    description:
      "Keep your gardening tools sharp and rust-free with these tips.",
  },
  {
    id: 10,
    title: "Soil Testing Made Easy",
    imageUrl: soiltesting,
    description:
      "Understand your soil's pH and nutrient levels for better planting.",
  },
];

const BlogPage = () => {
  return (
    <div className="min-h-screen bg-zinc-50">
      <div className=" py-16 max-w-7xl mx-auto">
        {" "}
        {/* Header */}
        <h1 className="text-center text-4xl font-extrabold text-emerald-600 mb-6">
          Garden Ally Blog
        </h1>
        <p className="text-center text-gray-600 max-w-3xl mx-auto mb-10">
          Discover expert tips and tricks to create a thriving garden. Explore
          our latest articles and practical guides to become a gardening pro.
        </p>
        {/* Blog Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tipsData.map((tip) => (
            <motion.div
              key={tip.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-lg shadow-md overflow-hidden group transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              {/* Image */}
              <div className="relative h-52">
                <Image
                  src={tip.imageUrl}
                  alt={tip.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover w-full h-full transform transition-transform duration-300 group-hover:scale-110"
                />
              </div>

              {/* Content */}
              <div className="p-4">
                <h2 className="text-xl font-bold text-emerald-600 mb-2">
                  {tip.title}
                </h2>
                <p className="text-gray-600 text-sm mb-4">{tip.description}</p>
                <button className="text-emerald-500 text-sm font-medium hover:underline">
                  Read More →
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
