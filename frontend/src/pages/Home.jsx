import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import FeaturedAuctions from "./home-sub-components/FeaturedAuctions";
import UpcomingAuctions from "./home-sub-components/UpcomingAuctions";
import Leaderboard from "./home-sub-components/Leaderboard";
import SideDrawer from "../layout/SideDrawer";
import { motion } from "framer-motion";
import Confetti from "react-confetti";

const Home = () => {
  const howItWorks = [
    { title: "List Your Treasure", description: "Auctioneer showcase rare and unique items." },
    { title: "Compete to Win", description: "Participants place bids in real-time." },
    { title: "Victory Announced", description: "Highest bidder claims the prize instantly." },
    { title: "Complete Your Deal", description: "Payment processed securely, with minimal fees." },
  ];

  const { isAuthenticated } = useSelector((state) => state.user);

  return (
    <div className="flex">
      <SideDrawer />
      <section className="flex-1 px-5 pt-20 lg:pl-[320px] min-h-screen py-4 bg-gradient-to-br from-[#f7f0e7] to-[#fdece4]">
        {!isAuthenticated && <Confetti numberOfPieces={200} recycle={false} />}
        
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-[#DECCBE] font-bold text-xl mb-6 tracking-wider">
            Discover, Bid, Conquer
          </p>
          <h1 className="text-[#111] text-3xl font-extrabold mb-2 min-[480px]:text-5xl md:text-7xl xl:text-8xl">
            Elite Auctions
          </h1>
          <h1 className="text-[#d6482b] text-3xl font-extrabold mb-6 min-[480px]:text-5xl md:text-7xl xl:text-7xl">
            Your Gateway to Exclusive Deals
          </h1>

          {!isAuthenticated && (
            <div className="flex gap-4 my-8">
              <Link
                to="/sign-up"
                className="bg-gradient-to-r from-[#d6482b] to-[#b8381e] font-semibold hover:scale-105 rounded-xl px-8 py-3 text-white shadow-lg transition-transform duration-300"
              >
                Join Now
              </Link>
              <Link
                to="/login"
                className="text-[#DECCBE] border-2 border-[#DECCBE] hover:bg-[#fff3fd] hover:text-[#d6482b] font-bold text-lg rounded-xl px-8 py-3 shadow-lg"
              >
                Login
              </Link>
            </div>
          )}
        </motion.div>

        <div className="flex flex-col gap-10 mt-10">
          <h3 className="text-[#111] text-2xl font-semibold">
            How the Auction Works
          </h3>
          <div className="flex flex-col gap-6 md:flex-row md:flex-wrap">
            {howItWorks.map((element, index) => (
              <motion.div
                key={element.title}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.2 }}
                className="bg-white backdrop-blur-lg bg-opacity-70 shadow-lg p-4 rounded-2xl h-[120px] flex flex-col justify-center md:w-[48%] lg:w-[30%] hover:shadow-2xl hover:scale-105 transition-transform duration-300"
              >
                <h5 className="font-bold text-[#d6482b] text-lg">{element.title}</h5>
                <p className="text-[#444] text-sm">{element.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <FeaturedAuctions />
        <UpcomingAuctions />
        <Leaderboard />
      </section>
    </div>
  );
};

export default Home;
