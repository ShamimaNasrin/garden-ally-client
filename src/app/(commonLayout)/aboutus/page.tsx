"use client";

import { motion } from "framer-motion";
import Image, { StaticImageData } from "next/image";
import team1 from "@/assets/images/team1.jpg";
import team2 from "@/assets/images/team2.jpg";
import team3 from "@/assets/images/team3.jpg";

interface TeamMemberProps {
  name: string;
  image: string | StaticImageData;
  designation: string;
  bio: string;
}

const teamMembers = [
  {
    name: "John Doe",
    image: team1,
    designation: "CEO & Founder",
    bio: "John is a full-stack developer with over 10 years of experience. He specializes in React and Node.js.",
  },
  {
    name: "Jane Smith",
    image: team3,
    designation: "CTO",
    bio: "Jane is a UX/UI designer passionate about creating intuitive and user-friendly interfaces.",
  },
  {
    name: "Michael Lee",
    image: team2,
    designation: "Project Lead",
    bio: "Michael is a project manager with expertise in leading agile teams and ensuring timely delivery of projects.",
  },
];
const About = () => {
  return (
    <div className="  min-h-screen xl:py-12 xl:px-16 lg:py-12 lg:px-16 md:p-8 sm:p-5 p-5 ">
      <motion.h2
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-3xl font-bold  text-center"
      >
        About Us
      </motion.h2>
      <div className="my-5">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Our Mission</h2>
        <p>
          Our mission is to connect gardening enthusiasts with a platform that
          enriches their gardening journey and fosters a thriving community. We
          are dedicated to providing both hobbyists and professionals with
          intuitive tools that enhance learning, collaboration, and sustainable
          practices. By integrating cutting-edge technology and focusing on our
          users love for plants, we aim to make gardening more accessible,
          enjoyable, and impactful for everyone.
        </p>
      </div>

      <div className="my-10 mx-auto">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Meet the Team</h2>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 xl:px-8 lg:px-8"
        >
          {teamMembers.map((member, index) => (
            <TeamCard
              key={index}
              name={member.name}
              image={member.image}
              designation={member.designation}
              bio={member.bio}
            />
          ))}
        </motion.div>
      </div>

      <div className="my-5">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Our Story</h2>
        <p>
          Our story began with a simple idea: to bring together people
          passionate about gardening in one vibrant space. As avid gardeners who
          recognized the challenges of finding resources and sharing tips, we
          envisioned a solution. What started as a small community has blossomed
          into a comprehensive platform supporting users worldwide. By
          empowering people to share their gardening experiences, Garden Ally
          helps everyone focus on what they love most—cultivating beauty,
          sustainability, and connection.
        </p>
      </div>
    </div>
  );
};

const TeamCard: React.FC<TeamMemberProps> = ({
  name,
  image,
  designation,
  bio,
}) => {
  return (
    <div className="max-w-sm bg-white shadow-lg rounded-lg overflow-hidden justify-self-center">
      <div className="flex justify-center mt-4">
        <Image
          className="object-cover rounded-full border-4 border-gray-300"
          src={image}
          alt={name}
          width={128}
          height={128}
        />
      </div>
      <div className="p-4 text-center">
        <h3 className="text-xl font-bold mb-2">{name}</h3>
        <h3 className=" font-semibold mb-2">{designation}</h3>
        <p className="text-gray-600">{bio}</p>
      </div>
    </div>
  );
};

export default About;
