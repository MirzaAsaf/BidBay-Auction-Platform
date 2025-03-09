import Card from "@/custom-components/Card";
import Spinner from "@/custom-components/Spinner";
import React from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Auctions = () => {
  const { allAuctions, loading } = useSelector((state) => state.auction);
  const navigate = useNavigate();

  const handleBidClick = (id) => {
    navigate(`/auction/item/${id}`);
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <motion.article
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="w-full ml-0 h-fit px-5 pt-6 lg:pl-[320px] flex flex-col items-center"
        >
          <section className="my-8 text-center w-full">
            <motion.h1
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-[#d6482b] text-4xl font-extrabold mb-3 min-[480px]:text-5xl md:text-6xl xl:text-7xl 2xl:text-8xl tracking-wide"
            >
              Exclusive Auctions
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-lg text-gray-600 max-w-2xl mx-auto"
            >
              Discover unique and premium items up for bidding. Don't miss your chance to own something special!
            </motion.p>
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8 px-4 w-full max-w-7xl mx-auto"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.2, delayChildren: 0.3 },
                },
              }}
            >
              {allAuctions.map((element, index) => (
                <motion.div
                  key={element._id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.15, duration: 0.4 }}
                  whileHover={{
                    scale: 1.07,
                    boxShadow: "0px 15px 30px rgba(0, 0, 0, 0.2)",
                    transition: { duration: 0.3 },
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="relative shadow-lg rounded-xl overflow-hidden bg-white p-4 transition-all cursor-pointer hover:shadow-2xl group"
                >
                  <Card
                    title={element.title}
                    startTime={element.startTime}
                    endTime={element.endTime}
                    imgSrc={element.image?.url}
                    startingBid={`Rs. ${element.startingBid}`}
                    id={element._id}
                  />
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 0 }}
                    whileHover={{ opacity: 1, y: 0 }}
                    className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
                  >
                    <button
                      onClick={() => handleBidClick(element._id)}
                      className="bg-[#d6482b] text-white px-4 py-2 rounded-lg font-semibold text-lg shadow-lg hover:bg-[#b73724] transition-all"
                    >
                      Place a Bid
                    </button>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </section>
        </motion.article>
      )}
    </>
  );
};

export default Auctions;
