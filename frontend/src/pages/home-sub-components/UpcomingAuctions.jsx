import React from "react";
import { RiAuctionFill } from "react-icons/ri";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const UpcomingAuctions = () => {
  const { allAuctions } = useSelector((state) => state.auction);
  const today = new Date().toDateString();

  const auctionsStartingToday = allAuctions.filter(
    (auction) => new Date(auction.startTime).toDateString() === today
  );

  return (
    <section className="my-12 px-5">
      <motion.h3
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl md:text-4xl font-bold text-black text-center mb-8 relative"
      >
        Auctions For Today
        <span className="block w-20 h-1 bg-gradient-to-r from-[#ff8c42] to-[#d6482b] mx-auto mt-2 rounded-full"></span>
      </motion.h3>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {auctionsStartingToday.length === 0 ? (
          <p className="text-center text-gray-400 text-lg col-span-full">
            No auctions scheduled for today.
          </p>
        ) : (
          auctionsStartingToday.slice(0, 6).map((auction, index) => (
            <motion.div
              key={auction._id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link
                to={`/auction/item/${auction._id}`}
                className="relative overflow-hidden rounded-xl bg-gradient-to-br from-[#161613] to-[#232220] shadow-lg hover:shadow-2xl transition-all duration-300 p-5 flex flex-col gap-4 hover:scale-105 hover:bg-[#2a2926]"
              >
                <div className="relative">
                  <div className="absolute top-4 right-4 bg-[#fdba88] p-3 rounded-full text-white">
                    <RiAuctionFill size={24} />
                  </div>

                  <img
                    src={auction.image?.url}
                    alt={auction.title}
                    className="w-full h-48 object-cover rounded-md"
                  />
                </div>

                <div className="flex flex-col gap-2 mt-4">
                  <h3 className="text-[#fdba88] text-lg font-semibold hover:text-[#ff8c42] transition-colors">
                    {auction.title}
                  </h3>
                  <p className="text-gray-300 text-sm">
                    <span className="font-semibold text-white">Starting Bid:</span> Rs. {auction.startingBid}
                  </p>
                  <p className="text-gray-300 text-sm">
                    <span className="font-semibold text-white">Starting Time:</span> {new Date(auction.startTime).toLocaleString()}
                  </p>
                </div>

                <button className="mt-3 w-full bg-[#fdba88] text-[#111] py-2 rounded-md font-semibold hover:bg-[#ff8c42] transition-all hover:scale-105">
                  View Auction
                </button>
              </Link>
            </motion.div>
          ))
        )}
      </motion.div>
    </section>
  );
};

export default UpcomingAuctions;
