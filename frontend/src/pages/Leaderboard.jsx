import Spinner from "@/custom-components/Spinner";
import React from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

const Leaderboard = () => {
  const { loading, leaderboard } = useSelector((state) => state.user);
  return (
    <section className="w-full min-h-screen px-5 pt-20 lg:pl-[320px] flex flex-col items-center bg-[#FDF5F1] text-[#333]">
      {loading ? (
        <Spinner />
      ) : (
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.6 }}
          className="w-full max-w-6xl"
        >
          <h1 className="text-[#D6482B] text-center text-3xl md:text-5xl font-bold mb-8 drop-shadow-lg">
            Bidders Leaderboard
          </h1>
          <p className="text-center text-lg text-gray-700 mb-6">
            Check out the top bidders and their achievements in the auction world!
          </p>
          <div className="overflow-x-auto w-full">
            <table className="min-w-full bg-white border border-gray-300 rounded-xl shadow-lg overflow-hidden">
              <thead>
                <tr className="bg-[#D6482B]  text-white">
                  <th className="py-3 px-10 text-left">Profile Pic</th>
                  <th className="py-3 px-7 text-left">Username</th>
                  <th className="py-3 px-7 text-left">Bid Expenditure</th>
                  <th className="py-3 px-7 text-left">Auctions Won</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                {leaderboard.slice(0, 100).map((element, index) => (
                  <motion.tr 
                    key={element._id} 
                    className={`border-b border-gray-300 transition-all duration-300 ${
                      index < 3 ? "bg-[#FAE7DE]" : "bg-white"
                    } hover:bg-gray-100`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                  >
                    <td className="flex gap-3 items-center py-3 px-4">
                      <span className={`text-lg font-bold w-7 hidden sm:block ${
                        index === 0
                          ? "text-yellow-500"
                          : index === 1
                          ? "text-gray-400"
                          : index === 2
                          ? "text-orange-500"
                          : "text-stone-400"
                      }`}>
                        {index + 1}
                      </span>
                      <img
                        src={element.profileImage?.url}
                        alt={element.userName}
                        className="h-12 w-12 object-cover rounded-full border-2 border-gray-300"
                      />
                    </td>
                    <td className="py-3 px-11 font-semibold">{element.userName}</td>
                    <td className="py-3 px-12 text-green-600 font-medium">Rs. {element.moneySpent}</td>
                    <td className="py-3 px-20 text-blue-600 font-medium">{element.auctionsWon}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}
    </section>
  );
};

export default Leaderboard;
