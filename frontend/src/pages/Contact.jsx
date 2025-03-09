import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigateTo = useNavigate();

  const handleContactForm = (e) => {
    e.preventDefault();
    setLoading(true);

    const templateParams = {
      name,
      email,
      phone,
      subject,
      message,
      timestamp: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })
    };

    emailjs
      .send(
        "service_afwwhfk",
        "template_k1o6vpv",
        templateParams,
        "2ckvRrCURXmAsuePW"
      )
      .then(() => {
        toast.success("Thank You! Your message has been sent successfully.");
        setLoading(false);
        navigateTo("/");
      })
      .catch(() => {
        toast.error("Failed to send message.");
        setLoading(false);
      });
  };

  return (
    <section className="min-h-screen grid place-items-center pr-41 bg-gradient-to-r from-[#f3f4f6] to-[#e5e7eb] dark:from-[#1f2937] dark:to-[#4b5563] transition-all duration-300">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-xl bg-white/30 dark:bg-white/10 backdrop-blur-lg shadow-lg rounded-2xl p-8"
      >
        <h1 className="text-3xl font-extrabold text-center text-[#d6482b] drop-shadow-lg">
          Contact Us
        </h1>

        <form onSubmit={handleContactForm} className="mt-6 flex flex-col gap-4">
          <InputField label="Your Name" value={name} setValue={setName} />
          <InputField label="Your Email" value={email} setValue={setEmail} type="email" />
          <InputField label="Phone Number" value={phone} setValue={setPhone} type="number" />
          <InputField label="Subject" value={subject} setValue={setSubject} />
          <div className="flex flex-col">
            <label className="text-sm font-medium text-stone-600 dark:text-stone-300">Message</label>
            <textarea
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="py-2 px-4 rounded-lg bg-white/20 dark:bg-stone-700 border border-transparent focus:border-[#d6482b] focus:ring-2 focus:ring-[#d6482b] focus:outline-none transition-all"
              required
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={loading}
            className={`w-full py-3 rounded-lg text-white font-semibold ${
              loading ? "bg-gray-400 cursor-not-allowed" : "bg-[#d6482b] hover:bg-[#b8381e]"
            } transition-all duration-300`}
          >
            {loading ? "Sending..." : "Send Message"}
          </motion.button>
        </form>
      </motion.div>
    </section>
  );
};

const InputField = ({ label, value, setValue, type = "text" }) => (
  <div className="flex flex-col">
    <label className="text-sm font-medium text-stone-600 dark:text-stone-300">{label}</label>
    <input
      type={type}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className="py-2 px-4 rounded-lg bg-white/20 dark:bg-stone-700 border border-transparent focus:border-[#d6482b] focus:ring-2 focus:ring-[#d6482b] focus:outline-none transition-all"
      required
    />
  </div>
);

export default Contact;
