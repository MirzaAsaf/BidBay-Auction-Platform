import { createAuction } from "@/store/slices/auctionSlice";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "react-datepicker/dist/react-datepicker.css";

const CreateAuction = () => {
  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [condition, setCondition] = useState("");
  const [startingBid, setStartingBid] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const auctionCategories = [
    "Electronics",
    "Furniture",
    "Art & Antiques",
    "Jewelry & Watches",
    "Automobiles",
    "Real Estate",
    "Collectibles",
    "Fashion & Accessories",
    "Sports Memorabilia",
    "Books & Manuscripts",
  ];

  const imageHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImage(file);
      setImagePreview(reader.result);
    };
  };

  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auction);

  const handleCreateAuction = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("condition", condition);
    formData.append("startingBid", startingBid);
    formData.append("startTime", startTime);
    formData.append("endTime", endTime);
    dispatch(createAuction(formData));
  };

  const { isAuthenticated, user } = useSelector((state) => state.user);
  const navigateTo = useNavigate();
  useEffect(() => {
    if (!isAuthenticated || user.role !== "Auctioneer") {
      navigateTo("/");
    }
  }, [isAuthenticated]);

  return (
    <motion.article 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.5 }}
      className="w-full ml-0 m-0 h-fit px-5 pt-12 lg:pl-[320px] flex flex-col"
    >
      <h1 className="text-[#d6482b] text-4xl font-extrabold mb-6 text-center">Create Auction</h1>
      <div className="bg-white shadow-xl mx-auto w-full max-w-3xl p-6 flex flex-col gap-6 rounded-xl">
        <form className="flex flex-col gap-5" onSubmit={handleCreateAuction}>
          <motion.div className="flex flex-col gap-4" whileHover={{ scale: 1.02 }}>
            <label className="text-lg font-medium text-gray-700">Title</label>
            <input
              placeholder="Enter Item Name"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="py-2 px-3 bg-gray-50 border rounded-lg focus:ring-2 focus:ring-[#d6482b]"
            />
          </motion.div>

          <motion.div className="flex flex-col gap-4" whileHover={{ scale: 1.02 }}>
            <label className="text-lg font-medium text-gray-700">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="py-2 px-3 bg-gray-50 border rounded-lg focus:ring-2 focus:ring-[#d6482b]"
            >
              <option value="">Select Category</option>
              {auctionCategories.map((element) => (
                <option key={element} value={element}>{element}</option>
              ))}
            </select>
          </motion.div>

          <motion.div className="flex flex-col gap-4" whileHover={{ scale: 1.02 }}>
            <label className="text-lg font-medium text-gray-700">Description</label>
            <textarea 
              placeholder="Enter the Details of the Product..."
              value={description} 
              onChange={(e) => setDescription(e.target.value)} 
              className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-[#D6482B]"
            />
          </motion.div>

          <motion.div className="flex flex-col gap-4" whileHover={{ scale: 1.02 }}>
            <label className="text-lg font-medium text-gray-700">Starting Bid</label>
            <input
              placeholder="Enter the Base Price"
              type="number"
              value={startingBid}
              onChange={(e) => setStartingBid(e.target.value)}
              className="py-2 px-3 bg-gray-50 border rounded-lg focus:ring-2 focus:ring-[#d6482b]"
            />
          </motion.div>

          <motion.div className="flex flex-col gap-4" whileHover={{ scale: 1.02 }}>
            <label className="text-lg font-medium text-gray-700">Condition</label>
            <select
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
              className="py-2 px-3 bg-gray-50 border rounded-lg focus:ring-2 focus:ring-[#d6482b]"
            >
              <option value="">Select Condition</option>
              <option value="New">New</option>
              <option value="Used">Used</option>
            </select>
          </motion.div>

          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="flex flex-col sm:flex-1">
              <label className="text-lg font-medium text-gray-700">Start Time</label>
              <DatePicker 
                placeholderText="Enter Start Time"
                selected={startTime} 
                onChange={(date) => setStartTime(date)} 
                showTimeSelect 
                dateFormat="Pp" 
                className="border p-2 rounded-lg w-full" 
              />
            </div>
            <div className="flex flex-col sm:flex-1">
              <label className="text-lg font-medium text-gray-700">End Time</label>
              <DatePicker 
                placeholderText="Enter End Time"
                selected={endTime} 
                onChange={(date) => setEndTime(date)} 
                showTimeSelect 
                dateFormat="Pp" 
                className="border p-2 rounded-lg w-full" 
              />
            </div>
          </div>

          <motion.div className="flex flex-col gap-4" whileHover={{ scale: 1.02 }}>
            <label className="text-lg font-medium text-gray-700">Upload Image</label>
            <label
              htmlFor="upload-image"
              className="flex flex-col items-center justify-center w-full border-2 border-dashed rounded-lg p-6 cursor-pointer hover:bg-gray-100"
            >
              {imagePreview ? (
                <img src={imagePreview} alt="Preview" className="w-32 h-auto" />
              ) : (
                <span className="text-gray-500">Click to Upload</span>
              )}
              <input
                id="upload-image"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={imageHandler}
              />
            </label>
          </motion.div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            className="bg-[#D6482B] text-white font-bold text-lg py-3 px-6 rounded-lg transition-all duration-300"
          >
            {loading ? "Creating Auction..." : "Create Auction"}
          </motion.button>
        </form>
      </div>
    </motion.article>
  );
};

export default CreateAuction;