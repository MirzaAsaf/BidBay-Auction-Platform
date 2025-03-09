import { postCommissionProof } from "@/store/slices/commissionSlice";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";

const SubmitCommission = () => {
  const [proof, setProof] = useState("");
  const [amount, setAmount] = useState("");
  const [comment, setComment] = useState("");

  const proofHandler = (e) => {
    const file = e.target.files[0];
    setProof(file);
  };

  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.commission);

  const handlePaymentProof = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("proof", proof);
    formData.append("amount", amount);
    formData.append("comment", comment);
    dispatch(postCommissionProof(formData));
  };

  return (
    <section className="w-full min-h-screen px-5 pt-8 lg:pl-[320px] flex flex-col items-center bg-[#FDF5F1] text-[#333]">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white w-full max-w-3xl shadow-lg rounded-2xl px-6 py-8 backdrop-blur-md bg-opacity-90"
      >
        <motion.h3
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-[#D6482B] text-3xl font-bold text-center mb-6"
        >
          Upload Payment Proof
        </motion.h3>

        <form onSubmit={handlePaymentProof} className="flex flex-col gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col"
          >
            <label className="text-gray-600 text-lg font-medium">Amount</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="py-2 px-3 bg-white border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-[#D6482B] focus:outline-none text-lg"
              placeholder="Enter amount"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col"
          >
            <label className="text-gray-600 text-lg font-medium">
              Payment Proof (Screenshot)
            </label>
            <input
              type="file"
              onChange={proofHandler}
              className="py-2 px-3 bg-white border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-[#D6482B] focus:outline-none text-lg"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-col"
          >
            <label className="text-gray-600 text-lg font-medium">Comment</label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={5}
              className="py-2 px-3 bg-white border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-[#D6482B] focus:outline-none text-lg"
              placeholder="Write a comment..."
            />
          </motion.div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-[#D6482B] hover:bg-[#B8381E] transition-all duration-300 py-3 px-6 rounded-lg text-white font-semibold text-lg shadow-md mx-auto mt-4"
            type="submit"
          >
            {loading ? "Uploading..." : "Upload Payment Proof"}
          </motion.button>
        </form>
      </motion.div>
    </section>
  );
};

export default SubmitCommission;
