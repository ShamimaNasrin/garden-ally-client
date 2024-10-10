"use client";

import { FaMapMarkerAlt } from "react-icons/fa";
import { FaPhone } from "react-icons/fa6";
import { IoIosMail } from "react-icons/io";
import { motion } from "framer-motion";

type ContactInfoProps = {
  label: string;
  value: string;
};

const ContactMain = () => {
  return (
    <div className="contact relative min-h-screen xl:py-20 lg:py-20 py-7 xl:px-24 lg:px-24 md:px-10 px-7 flex flex-col justify-center items-center">
      <div className="content max-w-4xl text-center z-10">
        <motion.h2
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-3xl font-bold text-gray-800 text-center"
        >
          Contact Us
        </motion.h2>

        <p className="text-gray-800 mt-4">
          Please reach out to us if you have any questions or concerns, and we
          will try to get back to you as soon as possible. We respond within two
          business days.
        </p>
      </div>

      <div className="container xl:w-[80%] lg:w-[70%] flex justify-center items-center mt-8 flex-wrap z-10">
        {/* Contact Info Section */}
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="contactInfo w-full lg:w-1/2 flex flex-col items-start space-y-6 my-2"
        >
          <ContactInfo label="Address" value="null" />
          <ContactInfo label="Phone" value="865397865" />
          <ContactInfo label="Email" value="lalmatia27@gmail.com" />
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="w-full lg:w-1/2 mt-4 bg-white p-8 shadow-lg "
        >
          <form>
            <h2 className="text-2xl text-center font-semibold text-gray-800 mb-6">
              Send Message
            </h2>

            <InputField textValue="Full Name" />
            <InputField textValue="Email" />
            <InputField textValue="Type your message" />

            <div className=" w-full">
              <input
                type="submit"
                value="Send"
                className="w-full bg-gray-800 text-white py-3 cursor-pointer hover:bg-gray-600 transition-all"
              />
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

const ContactInfo = ({ label, value }: ContactInfoProps) => {
  return (
    <div className="box flex items-center">
      <div className="icon w-14 h-14 bg-gray-400 rounded-full flex justify-center items-center text-2xl">
        {label === "Address" ? (
          <FaMapMarkerAlt className="text-white" />
        ) : label === "Phone" ? (
          <FaPhone className="text-white" />
        ) : (
          <IoIosMail className="text-white" />
        )}
      </div>
      <div className="text ml-4 text-black">
        <h3 className="font-semibold text-black">{label}</h3>

        {label === "Address" ? (
          <p>
            8653 Lalmatia Road, <br />
            Dhaka
          </p>
        ) : (
          <p>{value}</p>
        )}
      </div>
    </div>
  );
};

const InputField = ({ textValue }: { textValue: string }) => {
  return (
    <div className=" relative w-full mb-6 ">
      {textValue === "Type your message" ? (
        <textarea
          className="w-full border-b-2 border-gray-300 focus:border-pink-500 outline-none py-2"
          required
        ></textarea>
      ) : (
        <input
          type="text"
          className="w-full border-b-2 border-gray-300 focus:border-pink-500 outline-none pb-2 pt-4"
          required
        />
      )}
      <span className="absolute left-0 text-gray-500 pointer-events-none text-[16px] py-[5px] px-0 my-[10px] mx-0 transition-all duration-300 ease-in-out">
        {textValue}
      </span>
    </div>
  );
};

export default ContactMain;
