import Spinner from "@/custom-components/Spinner";
import { getAuctionDetail } from "@/store/slices/auctionSlice";
import { placeBid } from "@/store/slices/bidSlice";
import React, { useEffect, useState } from "react";
import { FaInfoCircle } from "react-icons/fa";
import { RiAuctionFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AuctionItem = () => {
  const { id } = useParams();
  const { loading, auctionDetail, auctionBidders } = useSelector(
    (state) => state.auction
  );
  const { isAuthenticated } = useSelector((state) => state.user);
  const navigateTo = useNavigate();
  const dispatch = useDispatch();

  const [amount, setAmount] = useState("");
  const [currentTime, setCurrentTime] = useState(new Date().getTime());

  useEffect(() => {
    if (!isAuthenticated) {
      navigateTo("/");
    }
    if (id) {
      dispatch(getAuctionDetail(id));
    }

    const timer = setInterval(() => {
      setCurrentTime(new Date().getTime());
    }, 1000);

    return () => clearInterval(timer);
  }, [isAuthenticated, id]);

  const handleBid = async () => {
    if (!amount || amount <= highestBid) {
      toast.error("Bid amount must be greater than the highest bid!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }

    const formData = new FormData();
    formData.append("amount", amount);
    await dispatch(placeBid(id, formData));
    dispatch(getAuctionDetail(id));
  };

  const getTimeRemaining = () => {
    const startTime = new Date(auctionDetail.startTime).getTime();
    const endTime = new Date(auctionDetail.endTime).getTime();
    if (currentTime < startTime) {
      return { text: `Auction Starts In: ${new Date(startTime - currentTime).toISOString().substr(11, 8)}`, status: "starting" };
    } else if (currentTime < endTime) {
      return { text: `Auction Ends In: ${new Date(endTime - currentTime).toISOString().substr(11, 8)}`, status: "ongoing" };
    } else {
      return { text: "Auction Ended", status: "ended" };
    }
  };

  const { text, status } = getTimeRemaining();
  const highestBid = auctionBidders?.length > 0 ? Math.max(...auctionBidders.map(bid => bid.amount)) : auctionDetail.startingBid;

  return (
    <section className="w-full min-h-screen px-8 pt-3 flex flex-col items-center bg-[#F8F1EB] text-[#333]">
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex flex-col lg:flex-row gap-10 w-full max-w-5xl bg-white p-6 rounded-3xl shadow-lg border border-gray-300 self-end">
          <div className="flex-1 flex flex-col items-center text-center">
            <div className="w-40 h-40 rounded-full border-4 border-[#ff5733] shadow-lg hover:scale-105 transition-all duration-300 ease-in-out">
              <img src={auctionDetail.image?.url} alt={auctionDetail.title} className="w-full h-full object-cover rounded-full border-2 border-white" />
            </div>
            <h3 className="text-3xl font-extrabold mt-4 text-[#E65C4F]">{auctionDetail.title}</h3>
            <p className="text-xl mt-2">Condition: <span className="font-semibold text-[#E65C4F]">{auctionDetail.condition}</span></p>
            <p className="text-xl">Starting Bid: <span className="font-semibold text-[#E65C4F]">Rs.{auctionDetail.startingBid}</span></p>
          </div>
          <div className="flex-1 bg-[#F8F1EB] p-6 rounded-2xl shadow-md border border-gray-300">
            <header className="bg-[#E65C4F] py-4 text-xl font-bold text-center rounded-lg text-white flex items-center justify-center gap-2">
              <FaInfoCircle /> Auction Details
            </header>
            <div className="mt-4 text-lg text-gray-700">
              <p className="font-bold">Description:</p>
              <hr className="my-2 border-t-2 border-[#E65C4F]" />
              <ul className="list-disc pl-6">
                {auctionDetail.description?.split(". ").map((desc, index) => (
                  <li key={index}>{desc}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      <div className="w-full max-w-5xl mt-4 bg-white p-6 rounded-3xl shadow-lg border border-gray-300 self-end">
        <header className="bg-[#E65C4F] py-4 text-xl font-bold text-center rounded-lg text-white">
          BIDS
        </header>
        {auctionBidders && auctionBidders.length > 0 ? (
          <ul className="mt-4 text-lg text-gray-700">
            {auctionBidders.map((bid, index) => (
              <li key={bid._id} className="flex items-center justify-between py-2 border-b">
                <div className="flex items-center gap-2 ml-6">
                  <img src={bid.profileImage} alt={bid.userName} className="w-12 h-12 rounded-full" />
                  <p className="text-lg">{bid.userName}</p>
                </div>
                <span className="text-[#E65C4F] font-semibold">Rs.{bid.amount}</span>
                <span className="text-gray-500 pr-24">{index + 1}{index === 0 ? "st" : index === 1 ? "nd" : index === 2 ? "rd" : "th"}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-500 mt-4">No bids placed yet.</p>
        )}
      </div>

      <div className="w-full max-w-5xl mt-4 bg-white p-6 rounded-3xl shadow-lg border border-gray-300 self-end">
        {status === "starting" ? (
          <div className="text-center text-xl font-bold text-[#E65C4F] py-4 bg-gray-200 rounded-lg">{text}</div>
        ) : status === "ended" ? (
          <div className="text-center text-xl font-bold text-red-600 py-4 bg-gray-200 rounded-lg">Auction Ended</div>
        ) : (
          <div className="flex items-center justify-between border p-3 rounded-lg bg-gray-100">
            <span className="text-lg font-bold text-[#E65C4F]">{text}</span>
            <span className="text-lg font-bold text-[#E65C4F]">Highest Bid: Rs.{highestBid}</span>
            <input
              type="number"
              className="w-21 text-black p-2 text-sm rounded-md focus:outline-none text-center mx-2"
              value={amount}
              placeholder="Enter more than Highest Bid.."
              onChange={(e) => setAmount(Number(e.target.value))}
              min={auctionDetail.startingBid}
            />

            <button className="p-2 bg-[#E65C4F] text-white rounded-full hover:bg-[#c94b40] transition-all" onClick={handleBid}>
              <RiAuctionFill className="text-lg" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default AuctionItem;
