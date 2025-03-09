import Spinner from "@/custom-components/Spinner";
import { getMyAuctionItems, republishAuction, deleteAuction } from "@/store/slices/auctionSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ViewMyAuctions = () => {
  const { myAuctions, loading } = useSelector((state) => state.auction);
  const { user, isAuthenticated } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [selectedAuction, setSelectedAuction] = useState(null);
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());

  useEffect(() => {
    if (!isAuthenticated || user.role !== "Auctioneer") {
      navigateTo("/");
    }
    dispatch(getMyAuctionItems());
  }, [dispatch, isAuthenticated]);

  const handleRepublishClick = (auction) => {
    setSelectedAuction(auction._id);
    setStartTime(null);
    setEndTime(null);
    setShowModal(true);
  };

  const handleRepublish = () => {
    if (endTime <= startTime) {
      alert("End time must be after start time!");
      return;
    }

    dispatch(republishAuction(selectedAuction, { republish: true, startTime, endTime }));
    setShowModal(false);
  };

  return (
    <div className="w-full min-h-screen bg-[#f5ebe0] px-4 pt-10 lg:pl-[280px] flex flex-col items-center overflow-hidden">
      <h1 className="text-[#d6482b] text-4xl font-extrabold mb-6 tracking-wide">
        My Auctions
      </h1>

      {loading ? (
        <Spinner />
      ) : (
        <div className="flex flex-col space-y-6 w-full max-w-5xl">
          {myAuctions.length > 0 ? (
            myAuctions.map((element, index) => {
              return (
                <motion.div
                  key={element._id}
                  className="relative w-full"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.15, duration: 0.4 }}
                >
                  <motion.div
                    whileHover={{ scale: 1.02, boxShadow: "0px 4px 15px rgba(0,0,0,0.2)" }}
                    whileTap={{ scale: 0.95 }}
                    className="shadow-md rounded-xl bg-white flex items-center p-4 border border-gray-300 w-full"
                  >
                    <img
                      src={element.image?.url || "/placeholder-image.jpg"}
                      alt={element.title}
                      className="w-40 h-40 object-cover rounded-lg mr-6"
                    />
                    <div className="flex flex-col justify-between w-full">
                      <h2 className="text-2xl text-red-600 font-semibold">{element.title}</h2>
                      <p className="text-red-600 font-semibold">
                        <span className="text-black font-semibold">Starting Bid:</span> {`Rs. ${element.startingBid}`}
                      </p>
                      <p className="text-gray-600">
                        <span className="font-semibold text-black">Starts At:</span> {new Date(element.startTime).toLocaleString()}
                      </p>
                      <p className="text-gray-600">
                        <span className="font-semibold text-black">Ends At:</span> {new Date(element.endTime).toLocaleString()}
                      </p>

                      <div className="flex space-x-4 mt-4">
                        <button
                          className="bg-gray-800 text-white px-4 py-2 rounded"
                          onClick={() => navigateTo(`/auction/details/${element._id}`)}
                        >
                          View Auction
                        </button>
                        <button
                          className="bg-red-500 text-white px-4 py-2 rounded"
                          onClick={() => dispatch(deleteAuction(element._id))}
                        >
                          Delete Auction
                        </button>

                        <button
                          className="bg-blue-500 text-white px-4 py-2 rounded"
                          onClick={() => handleRepublishClick(element)}
                        >
                          Republish Auction
                        </button>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })
          ) : (
            <div className="text-center flex flex-col items-center w-full">
              <h3 className="text-gray-600 text-xl font-semibold mb-2">
                You have not posted any auctions yet.
              </h3>
              <button
                onClick={() => navigateTo("/create-auction")}
                className="bg-[#d6482b] text-white px-6 py-3 rounded-md font-semibold text-lg shadow-md hover:bg-[#b03a23] transition-all"
              >
                Create Auction
              </button>
            </div>
          )}
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl text-red-600 text-center font-bold mb-4">Republish Auction</h2>

            <label className="block font-semibold">Start Time:</label>
            <DatePicker
              selected={startTime}
              onChange={(date) => setStartTime(date)}
              showTimeSelect
              dateFormat="Pp"
              className="border p-2 w-full rounded mb-3"
              placeholderText="Select Start Time"
            />

            <label className="block font-semibold">End Time:</label>
            <DatePicker
              selected={endTime}
              onChange={(date) => setEndTime(date)}
              showTimeSelect
              dateFormat="Pp"
              className="border p-2 w-full rounded mb-3"
              placeholderText="Select End Time"
            />

            <div className="flex justify-end space-x-2">
              <button className="bg-gray-500 text-white px-4 py-2 rounded" onClick={() => setShowModal(false)}>
                Cancel
              </button>
              <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={handleRepublish}>
                Republish
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewMyAuctions;
