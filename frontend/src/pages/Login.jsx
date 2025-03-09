import { login } from "@/store/slices/userSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { loading, isAuthenticated } = useSelector((state) => state.user);

  const navigateTo = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    dispatch(login(formData));
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigateTo("/");
    }
  }, [dispatch, isAuthenticated, loading]);

  return (
    <>
      <section className="w-full ml-0 m-0 h-fit px-5 pt-20 lg:pl-[320px] flex flex-col min-h-screen py-4 justify-center bg-gradient-to-br from-[#f9f9f9] to-[#eaeaea] dark:from-[#1a1a1a] dark:to-[#333] transition-all duration-300">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="backdrop-blur-xl bg-white/30 dark:bg-white/10 shadow-2xl rounded-xl p-8 mx-auto w-full max-w-md flex flex-col gap-6 items-center"
        >
          <h1 className="text-[#d6482b] text-4xl font-extrabold tracking-wide drop-shadow-lg">
            Welcome Back
          </h1>
          <p className="text-stone-600 dark:text-stone-300 text-center">
            Log in to continue your auction journey!
          </p>

          <form onSubmit={handleLogin} className="flex flex-col gap-5 w-full">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col gap-2"
            >
              <label className="text-[16px] text-stone-700 dark:text-stone-300">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="text-[16px] py-2 px-4 rounded-lg bg-white/20 dark:bg-stone-700 border border-transparent focus:border-[#d6482b] focus:outline-none focus:ring-2 focus:ring-[#d6482b] transition-all duration-300"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col gap-2"
            >
              <label className="text-[16px] text-stone-700 dark:text-stone-300">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="text-[16px] py-2 px-4 rounded-lg bg-white/20 dark:bg-stone-700 border border-transparent focus:border-[#d6482b] focus:outline-none focus:ring-2 focus:ring-[#d6482b] transition-all duration-300"
              />
            </motion.div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#d6482b] hover:bg-[#b8381e] text-white font-semibold text-lg py-2 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#d6482b] mx-auto w-full"
              type="submit"
            >
              {loading ? "Logging In..." : "Login"}
            </motion.button>
          </form>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-stone-500 dark:text-stone-400 mt-4 text-sm hover:text-[#d6482b] transition-colors cursor-pointer"
          >
            Forgot your password?
          </motion.div>
        </motion.div>
      </section>
    </>
  );
};

export default Login;
