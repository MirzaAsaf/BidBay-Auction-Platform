import { register } from "@/store/slices/userSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const SignUp = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [bankAccountName, setBankAccountName] = useState("");
  const [bankAccountNumber, setBankAccountNumber] = useState("");
  const [bankName, setBankName] = useState("");
  const [upiId, setUpiId] = useState("");
  const [googlePayNumber, setGooglePayNumber] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [profileImagePreview, setProfileImagePreview] = useState("");

  const { loading, isAuthenticated } = useSelector((state) => state.user);
  const navigateTo = useNavigate();
  const dispatch = useDispatch();

  const handleRegister = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("userName", userName);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("password", password);
    formData.append("address", address);
    formData.append("role", role);
    formData.append("profileImage", profileImage);

    if (role === "Auctioneer") {
      formData.append("bankAccountName", bankAccountName);
      formData.append("bankAccountNumber", bankAccountNumber);
      formData.append("bankName", bankName);
      formData.append("upiId", upiId);
      formData.append("googlePayNumber", googlePayNumber);

    }

    dispatch(register(formData));
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigateTo("/");
    }
  }, [dispatch, loading, isAuthenticated]);

  const imageHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setProfileImagePreview(reader.result);
      setProfileImage(file);
    };
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#f3f4f6] to-[#e5e7eb] dark:from-[#1f2937] dark:to-[#4b5563] transition-all duration-300">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl bg-white/30 dark:bg-white/10 backdrop-blur-lg shadow-lg rounded-2xl p-10 ml-60" // Added ml-10 for margin
      >
        <h1 className="text-4xl font-extrabold text-center text-[#d6482b] drop-shadow-lg">
          Create an Account
        </h1>

        <form onSubmit={handleRegister} className="mt-8 flex flex-col gap-6">
          <div className="flex flex-col md:flex-row gap-4">
            <InputField
              label="Full Name"
              placeholder="Enter your full name"
              value={userName}
              setValue={setUserName}
            />
            <InputField
              label="Email"
              type="email"
              placeholder="Enter your email"
              value={email}
              setValue={setEmail}
            />
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <InputField
              label="Phone"
              type="number"
              placeholder="Enter your phone number"
              value={phone}
              setValue={setPhone}
            />
            <InputField
              label="Address"
              placeholder="Enter your address"
              value={address}
              setValue={setAddress}
            />
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <SelectField label="Role" value={role} setValue={setRole} />
            <InputField
              label="Password"
              type="password"
              placeholder="Enter your password"
              value={password}
              setValue={setPassword}
            />
          </div>

          <div className="flex flex-col gap-2 items-center">
            <motion.img
              src={profileImagePreview || "/imageHolder.jpg"}
              alt="Profile Preview"
              className="w-24 h-24 rounded-full object-cover border-2 border-[#d6482b] shadow-lg"
              whileHover={{ scale: 1.1 }}
            />
            <label
              htmlFor="file-upload"
              className="cursor-pointer px-4 py-2 bg-[#d6482b] text-white rounded-lg shadow hover:bg-[#b8381e] transition-all"
            >
              Upload Profile Image
            </label>
            <input
              id="file-upload"
              type="file"
              onChange={imageHandler}
              className="hidden"
            />
            {profileImage && (
              <span className="text-sm text-stone-500 dark:text-stone-300 mt-1">
                {profileImage.name}
              </span>
            )}
          </div>

          {role === "Auctioneer" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="space-y-4">
              <h3 className="text-lg font-bold text-stone-700 dark:text-stone-300">Payment Information</h3>

              <div className="flex flex-col md:flex-row gap-4">
                <SelectField
                  label="Bank Name"
                  value={bankName}
                  setValue={setBankName}
                  options={["State Bank Of India", "Kotak Mahindra Bank", "Canara Bank", "Karur Vysya Bank"]}
                />
                <InputField
                  label="Bank Account Number"
                  placeholder="Enter bank account number"
                  value={bankAccountNumber}
                  setValue={setBankAccountNumber}
                />
                <InputField
                  label="Account Holder Name"
                  placeholder="Enter account holder's name"
                  value={bankAccountName}
                  setValue={setBankAccountName}
                />
              </div>

              <div className="flex flex-col md:flex-row gap-4">
                <InputField
                  label="UPI ID"
                  placeholder="Enter UPI ID"
                  value={upiId}
                  setValue={setUpiId}
                />
                <InputField
                  label="Google Pay Number"
                  type="number"
                  placeholder="Enter Google Pay number"
                  value={googlePayNumber}
                  setValue={setGooglePayNumber}
                />

              </div>
            </motion.div>
          )}

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={loading}
            className={`w-full py-3 rounded-lg text-white font-semibold ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-[#d6482b] hover:bg-[#b8381e]"
              } transition-all duration-300`}
          >
            {loading ? "Registering..." : "Register"}
          </motion.button>
        </form>
      </motion.div>
    </section>
  );
};


const InputField = ({ label, value, setValue, placeholder, type = "text" }) => (
  <div className="flex flex-col flex-1">
    <label className="text-sm font-medium text-stone-600 dark:text-stone-300">{label}</label>
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className="py-2 px-4 rounded-lg bg-white/20 dark:bg-stone-700 border border-transparent focus:border-[#d6482b] focus:ring-2 focus:ring-[#d6482b] focus:outline-none transition-all"
    />
  </div>
);

const SelectField = ({ label, value, setValue, options = ["Auctioneer", "Bidder","Super Admin"] }) => (
  <div className="flex flex-col flex-1">
    <label className="text-sm font-medium text-stone-600 dark:text-stone-300">{label}</label>
    <select
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className="py-2 px-4 rounded-lg bg-white/20 dark:bg-stone-700 border focus:border-[#d6482b] focus:ring-2 focus:ring-[#d6482b] focus:outline-none transition-all"
    >
      <option value="">Select {label}</option>
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  </div>
);

export default SignUp;
