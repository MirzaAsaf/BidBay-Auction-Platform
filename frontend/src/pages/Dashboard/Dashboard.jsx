import {
  clearAllSuperAdminSliceErrors,
  getAllPaymentProofs,
  getAllUsers,
  getMonthlyRevenue,
} from "@/store/slices/superAdminSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AuctionItemDelete from "./sub-components/AuctionItemDelete";
import BiddersAuctioneersGraph from "./sub-components/BiddersAuctioneersGraph";
import PaymentGraph from "./sub-components/PaymentGraph";
import PaymentProofs from "./sub-components/PaymentProofs";
import Spinner from "@/custom-components/Spinner";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.superAdmin);

  useEffect(() => {
    dispatch(getMonthlyRevenue());
    dispatch(getAllUsers());
    dispatch(getAllPaymentProofs());
    dispatch(clearAllSuperAdminSliceErrors());
  }, []);

  const { user, isAuthenticated } = useSelector((state) => state.user);
  const navigateTo = useNavigate();

  useEffect(() => {
    if (user.role !== "Super Admin" || !isAuthenticated) {
      navigateTo("/");
    }
  }, [isAuthenticated]);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="w-full min-h-screen px-5 pt-20 lg:pl-[320px] flex flex-col gap-10 bg-gradient-to-b from-white to-gray-100">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-[#d6482b] text-4xl md:text-6xl xl:text-7xl 2xl:text-8xl text-center font-extrabold tracking-tight"
          >
            Dashboard
          </motion.h1>

          <div className="flex flex-col gap-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="bg-white shadow-lg rounded-xl p-6"
            >
              <h3 className="text-[#111] text-2xl md:text-3xl font-semibold mb-4">
              Total Payments Overview
              </h3>
              <PaymentGraph />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="bg-white shadow-lg rounded-xl p-6"
            >
              <h3 className="text-[#111] text-2xl md:text-3xl font-semibold mb-4">
                Users Overview
              </h3>
              <BiddersAuctioneersGraph />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="bg-white shadow-lg rounded-xl p-6"
            >
              <h3 className="text-[#111] text-2xl md:text-3xl font-semibold mb-4">
                Payment Proofs
              </h3>
              <PaymentProofs />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="bg-white shadow-lg rounded-xl p-6"
            >
              <h3 className="text-[#111] text-2xl md:text-3xl font-semibold mb-4">
                Manage Auctions
              </h3>
              <AuctionItemDelete />
            </motion.div>
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
