import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const medals = ["🥇", "🥈", "🥉"];

const Leaderboard = () => {
  const { leaderboard } = useSelector((state) => state.user);

  return (
    <section className="my-12 px-5">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col sm:flex-row gap-2 text-center sm:text-left"
      >
        <h3 className="text-[#111] text-2xl md:text-3xl font-bold">Top 10</h3>
        <h3 className="text-[#D6482B] text-2xl md:text-3xl font-bold">
          Bidders Leaderboard
        </h3>
      </motion.div>

      <div className="overflow-x-auto">
        <motion.table
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="min-w-full bg-white shadow-md rounded-lg overflow-hidden my-6"
        >
          <thead>
            <tr className="bg-gradient-to-r from-[#d6482b] to-[#ff8c42] text-white">
              <th className="py-3 px-4 text-left">#</th>
              <th className="py-3 px-4 text-left">Profile</th>
              <th className="py-3 px-4 text-left">Username</th>
              <th className="py-3 px-4 text-left">Bid Expenditure</th>
              <th className="py-3 px-4 text-left">Auctions Won</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {leaderboard.slice(0, 10).map((element, index) => (
              <motion.tr
                key={element._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="border-b border-gray-300 hover:bg-gray-100 transition-all duration-300"
              >
                <td className="py-3 px-4 font-semibold text-lg">
                  {index < 3 ? medals[index] : index + 1}
                </td>
                <td className="py-3 px-4">
                  <img
                    src={element.profileImage?.url}
                    alt={element.userName}
                    className="h-12 w-12 object-cover rounded-full shadow-md border-2 border-gray-300"
                  />
                </td>
                <td className="py-3 px-7 font-medium">{element.userName}</td>
                <td className="py-3 px-9 font-semibold text-[#D6482B]">
                  Rs. {element.moneySpent}
                </td>
                <td className="py-3 px-16 font-semibold">{element.auctionsWon}</td>
              </motion.tr>
            ))}
          </tbody>
        </motion.table>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Link
          to={"/leaderboard"}
          className="border-2 border-gray-300 font-bold text-lg w-full py-3 flex justify-center rounded-lg hover:bg-gray-200 transition-all duration-300"
        >
          View Full Leaderboard
        </Link>
      </motion.div>
    </section>
  );
};

export default Leaderboard;
