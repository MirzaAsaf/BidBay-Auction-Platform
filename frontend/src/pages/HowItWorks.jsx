import React from "react";
import { motion } from "framer-motion";
import {
  FaUser,
  FaGavel,
  FaEnvelope,
  FaDollarSign,
  FaFileInvoice,
  FaRedo,
} from "react-icons/fa";

const HowItWorks = () => {
  const steps = [
    {
      icon: <FaUser size={30} />,
      title: "User Registration",
      description:
        "Register or log in to unlock full access. Only registered users can post auctions, place bids, and manage their dashboard.",
    },
    {
      icon: <FaGavel size={30} />,
      title: "Role Selection",
      description:
        'Choose to be a "Bidder" or an "Auctioneer." Bidders can join live auctions, while Auctioneers can post their own items for bidding.',
    },
    {
      icon: <FaEnvelope size={30} />,
      title: "Winning Bid Notification",
      description:
        "The highest bidder gets notified via email with payment method details including PayPal, bank transfer, or Easypaisa.",
    },
    {
      icon: <FaDollarSign size={30} />,
      title: "Commission Payment",
      description:
        "Auctioneers owe a 5% commission on successful bids. Non-payment restricts future posts and could lead to legal action.",
    },
    {
      icon: <FaFileInvoice size={30} />,
      title: "Proof of Payment",
      description:
        "Upload payment proof (screenshot & total amount). Admin approval will update commission statuses automatically.",
    },
    {
      icon: <FaRedo size={30} />,
      title: "Reposting Items",
      description:
        "If the highest bidder fails to pay, the Auctioneer can repost the item for free, giving others a second chance to win.",
    },
  ];

  return (
    <>
      <section className="w-full ml-0 h-fit px-5 pt-20 lg:pl-[320px] flex flex-col min-h-screen py-4 justify-center">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-[#d6482b] text-center font-poppins text-4xl font-bold mb-8 md:text-6xl xl:text-7xl"
        >
          Discover How BidBay Works
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-lg shadow-lg p-6 flex flex-col gap-3 items-start group hover:bg-[#d6482b] transition-all duration-300"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
            >
              <div className="flex items-center justify-center bg-[#d6482b] text-white w-10 h-10 rounded-full font-bold group-hover:bg-white group-hover:text-[#d6482b] transition-all duration-300">
                {index + 1}
              </div>

              <div className="text-[#d6482b] bg-black p-3 rounded-full group-hover:bg-white group-hover:text-[#d6482b] transition-all duration-300">
                {step.icon}
              </div>

              <h3 className="text-2xl font-semibold font-poppins text-black group-hover:text-white transition-all duration-300">
                {step.title}
              </h3>

              <p className="font-lato text-lg text-stone-600 group-hover:text-white transition-all duration-300">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
};

export default HowItWorks;
