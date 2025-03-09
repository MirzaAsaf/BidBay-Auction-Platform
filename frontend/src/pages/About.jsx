import React from "react";
import { motion } from "framer-motion";
import { FaHandshake, FaLightbulb, FaUsers, FaHeadset } from "react-icons/fa";

const About = () => {
  const values = [
    {
      id: 1,
      title: "Integrity",
      icon: <FaHandshake size={40} />,
      description:
        "We prioritize honesty and transparency in all our dealings, ensuring every auction is fair and ethical.",
    },
    {
      id: 2,
      title: "Innovation",
      icon: <FaLightbulb size={40} />,
      description:
        "We continuously push boundaries, enhancing our platform with cutting-edge technology for a seamless auction experience.",
    },
    {
      id: 3,
      title: "Community",
      icon: <FaUsers size={40} />,
      description:
        "A vibrant community of buyers and sellers united by a shared passion for discovering unique treasures.",
    },
    {
      id: 4,
      title: "Customer Focus",
      icon: <FaHeadset size={40} />,
      description:
        "Our dedicated support team ensures you have a smooth, hassle-free experience throughout your auction journey.",
    },
  ];

  return (
    <>
      <section className="w-full ml-0 m-0 h-fit px-5 pt-8 lg:pl-[320px] gap-7 flex flex-col min-h-screen py-4 justify-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-[#d6482b] text-center font-poppins font-bold mb-4 text-4xl md:text-6xl xl:text-7xl 2xl:text-8xl">
            About Us
          </h1>
          <p className="font-lato text-lg text-stone-600">
            Welcome to <strong>BidBay</strong>, the ultimate destination for thrilling online auctions. Our platform bridges buyers and sellers worldwide, offering a safe, secure, and exciting marketplace for everyone.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h3 className="text-[#111] font-poppins text-2xl font-semibold mb-4 md:text-3xl">
            Our Mission
          </h3>
          <p className="font-lato text-lg text-stone-600">
            Our mission is to redefine the online auction experience by fostering a trustworthy and engaging platform. We empower individuals and businesses to discover rare products, bid competitively, and win with confidence.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className="text-[#111] font-poppins text-2xl font-semibold mb-4 md:text-3xl">
            Our Core Values
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.id}
                className="p-6 bg-white rounded-lg shadow-lg hover:shadow-2xl transition duration-300 ease-in-out transform hover:-translate-y-2"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.2 }}
              >
                <div className="flex flex-col items-center justify-center">
                  <div className="text-[#d6482b] mb-4">{value.icon}</div>
                  <h4 className="font-poppins text-lg font-bold text-black mb-2">
                    {value.title}
                  </h4>
                  <p className="font-lato text-center text-stone-600">
                    {value.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h3 className="text-[#111] font-poppins text-2xl font-semibold mb-4 md:text-3xl">
            Our Story
          </h3>
          <p className="font-lato text-lg text-stone-600">
            Founded by <strong>Mirza Asaf</strong> in 2025, BidBay emerged from a passion for connecting people through exciting auction experiences. Today, we proudly host a global community of buyers and sellers dedicated to finding and offering exceptional items.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <h3 className="text-[#111] font-poppins text-2xl font-semibold mb-4 md:text-3xl">
            Join Our Community
          </h3>
          <p className="font-lato text-lg text-stone-600">
            Become a part of the <strong>BidBay</strong> family and discover a world of opportunities. Whether you're here to buy, sell, or explore, every auction promises something extraordinary.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <p className="text-[#d6482b] font-poppins text-xl font-bold mt-4">
            Thank you for choosing BidBay. Let the bidding adventures begin!
          </p>
        </motion.div>
      </section>
    </>
  );
};

export default About;
