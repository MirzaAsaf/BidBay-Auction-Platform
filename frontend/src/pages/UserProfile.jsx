import Spinner from "@/custom-components/Spinner";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const UserProfile = () => {
  const { user, isAuthenticated, loading } = useSelector((state) => state.user);
  const navigateTo = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigateTo("/");
    }
  }, [isAuthenticated]);

  return (
    <section className="w-full ml-0 m-0 h-fit px-5 pt-8 lg:pl-[320px] flex flex-col min-h-screen py-4 justify-start bg-gradient-to-br from-[#fde2d2] to-[#fceee4]">
      {loading ? (
        <Spinner />
      ) : (
        <motion.div 
          initial={{ opacity: 0, y: 50 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="bg-white/80 mx-auto w-full h-auto px-6 flex flex-col gap-6 items-center py-10 justify-center rounded-2xl shadow-xl backdrop-blur-md border border-white/50"
        >
          <motion.img
            src={user.profileImage?.url}
            alt="/imageHolder.jpg"
            className="w-40 h-40 rounded-full border-4 border-[#ff5733] shadow-lg hover:scale-105 transition-all duration-300 ease-in-out"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />

          <div className="mb-6 w-full px-8">
            <h3 className="text-3xl font-bold mb-6 text-[#ff5733] tracking-wide text-center drop-shadow-md">
              Personal Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { label: "Username", value: user.userName },
                { label: "Email", value: user.email },
                { label: "Phone", value: user.phone },
                { label: "Address", value: user.address },
                { label: "Role", value: user.role },
                { label: "Joined On", value: user.createdAt?.substring(0, 10) }
              ].map((item, index) => (
                <motion.div 
                  key={index} 
                  className="p-5 bg-[#fff3ec] rounded-xl shadow-md border-l-4 border-[#ff5733] hover:shadow-lg transition-shadow duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <label className="block text-sm font-medium text-gray-700">{item.label}</label>
                  <input
                    type="text"
                    defaultValue={item.value}
                    className="w-full mt-2 p-3 border-gray-300 rounded-md focus:outline-none bg-white shadow-inner text-lg text-gray-900 font-medium tracking-wide"
                    disabled
                  />
                </motion.div>
              ))}
            </div>
          </div>

          {user.role === "Auctioneer" && (
            <div className="mb-6 w-full px-8">
              <h3 className="text-2xl font-semibold mb-6 text-[#ff5733] text-center">Payment Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  { label: "Bank Name", value: user.paymentMethods.bankTransfer.bankName },
                  { label: "Bank Account (IFSC)", value: user.paymentMethods.bankTransfer.bankAccountNumber },
                  { label: "User Name On Bank Account", value: user.paymentMethods.bankTransfer.bankAccountName },
                  { label: "UPI ID", value: user.paymentMethods.upiId.upiId },
                  { label: "Google Pay Number", value: user.paymentMethods.googlePayNumber.googlePayNumber }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="p-5 bg-[#fff3ec] rounded-xl shadow-md border-l-4 border-[#ff5733] hover:shadow-lg transition-shadow duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <label className="block text-sm font-medium text-gray-700">{item.label}</label>
                    <input
                      type="text"
                      defaultValue={item.value}
                      className="w-full mt-2 p-3 border-gray-300 rounded-md focus:outline-none bg-white shadow-inner text-lg text-gray-900 font-medium tracking-wide"
                      disabled
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          <div className="mb-6 w-full px-8">
            <h3 className="text-2xl font-semibold mb-6 text-[#ff5733] text-center">Other User Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {user.role === "Auctioneer" && (
                <motion.div
                  className="p-5 bg-[#fff3ec] rounded-xl shadow-md border-l-4 border-[#ff5733] hover:shadow-lg transition-shadow duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <label className="block text-sm font-medium text-gray-700">Unpaid Commissions</label>
                  <input
                    type="text"
                    defaultValue={user.unpaidCommission}
                    className="w-full mt-2 p-3 border-gray-300 rounded-md focus:outline-none bg-white shadow-inner text-lg text-gray-900 font-medium tracking-wide"
                    disabled
                  />
                </motion.div>
              )}

              {user.role === "Bidder" && (
                <>
                  <motion.div
                    className="p-5 bg-[#fff3ec] rounded-xl shadow-md border-l-4 border-[#ff5733] hover:shadow-lg transition-shadow duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <label className="block text-sm font-medium text-gray-700">Auctions Won</label>
                    <input
                      type="text"
                      defaultValue={user.auctionsWon}
                      className="w-full mt-2 p-3 border-gray-300 rounded-md focus:outline-none bg-white shadow-inner text-lg text-gray-900 font-medium tracking-wide"
                      disabled
                    />
                  </motion.div>

                  <motion.div
                    className="p-5 bg-[#fff3ec] rounded-xl shadow-md border-l-4 border-[#ff5733] hover:shadow-lg transition-shadow duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <label className="block text-sm font-medium text-gray-700">Money Spent</label>
                    <input
                      type="text"
                      defaultValue={`Rs. ${user.moneySpent}`}
                      className="w-full mt-2 p-3 border-gray-300 rounded-md focus:outline-none bg-white shadow-inner text-lg text-gray-900 font-medium tracking-wide"
                      disabled
                    />
                  </motion.div>
                </>
              )}
            </div>
          </div>

        </motion.div>
      )}
    </section>
  );
};

export default UserProfile;
