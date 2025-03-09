import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const FeaturedAuctions = () => {
  const { allAuctions, loading } = useSelector((state) => state.auction);
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState({});

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const newTimeLeft = {};

      allAuctions.forEach((auction) => {
        const startTime = new Date(auction.startTime);
        const endTime = new Date(auction.endTime);

        if (now < startTime) {
          newTimeLeft[auction._id] = `Starts in: ${formatTime(startTime - now)}`;
        } else if (now >= startTime && now < endTime) {
          newTimeLeft[auction._id] = `Ends in: ${formatTime(endTime - now)}`;
        } else {
          newTimeLeft[auction._id] = "Auction Ended";
        }
      });

      setTimeLeft(newTimeLeft);
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [allAuctions]);

  const formatTime = (ms) => {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours}h ${minutes}m ${seconds}s`;
  };

  const handleBidClick = (id) => {
    navigate(`/auction/item/${id}`);
  };

  return (
    <section className="my-12 px-5 text-center">
      <motion.h3
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl md:text-4xl font-bold text-black relative mb-8"
      >
        Featured Auctions
        <span className="block w-12 h-1 bg-gradient-to-r from-[#ff8c42] to-[#d6482b] mx-auto mt-2 rounded-full"></span>
      </motion.h3>

      <div className="flex justify-center items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mx-auto"
        >
          {loading ? (
            <p className="text-center text-gray-400 text-lg col-span-full">
              Loading auctions...
            </p>
          ) : allAuctions.length === 0 ? (
            <p className="text-center text-gray-400 text-lg col-span-full">
              No featured auctions available.
            </p>
          ) : (
            allAuctions.slice(0, 8).map((auction, index) => (
              <motion.div
                key={auction._id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
              >
                <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-[#161613] to-[#232220] shadow-lg hover:shadow-2xl transition-all duration-300 p-9 flex flex-col gap-4 hover:scale-105 hover:bg-[#2a2926]">
                  <div className="relative">
                    <img
                      src={auction.image?.url || "/placeholder.jpg"}
                      alt={auction.title}
                      className="w-full h-36 object-cover rounded-md hover:opacity-90 transition-opacity"
                    />
                    <div className="h-[2px] w-12 bg-gray-400 mx-auto mt-2 rounded-full"></div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <h3 className="text-[#fdba88] text-lg font-semibold hover:text-[#ff8c42] transition-colors">
                      {auction.title}
                    </h3>
                    <p className="text-gray-300 text-sm">
                      <span className="font-semibold text-white">Starting Bid:</span> Rs. {auction.startingBid}
                    </p>
                    <p className={`text-sm font-medium ${timeLeft[auction._id] === "Auction Ended" ? "text-red-500" : "text-gray-300"}`}>
                      {timeLeft[auction._id] || "Loading..."}
                    </p>
                  </div>

                  <button
                    onClick={() => handleBidClick(auction._id)}
                    className={`mt-3 w-full py-2 rounded-md font-semibold transition-all hover:scale-105 ${
                      timeLeft[auction._id] === "Auction Ended"
                        ? "bg-gray-500 text-gray-300 cursor-not-allowed"
                        : "bg-[#fdba88] text-[#111] hover:bg-[#ff8c42]"
                    }`}
                    disabled={timeLeft[auction._id] === "Auction Ended"}
                  >
                    {timeLeft[auction._id] === "Auction Ended" ? "Auction Ended" : "Place your Bid"}
                  </button>
                </div>
              </motion.div>
            ))
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedAuctions;
