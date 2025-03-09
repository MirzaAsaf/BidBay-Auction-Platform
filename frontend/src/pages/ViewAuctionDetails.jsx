import Spinner from "@/custom-components/Spinner";
import { getAuctionDetail } from "@/store/slices/auctionSlice";
import React, { useEffect } from "react";
import { FaInfoCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const ViewAuctionDetails = () => {
  const { id } = useParams();
  const { loading, auctionDetail, auctionBidders } = useSelector(
    (state) => state.auction
  );
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const navigateTo = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isAuthenticated || user.role === "Bidder") {
      navigateTo("/");
    }
    if (id) {
      dispatch(getAuctionDetail(id));
    }
  }, [isAuthenticated, id]);

  return (
    <section className="w-full min-h-screen px-8 pt-10 flex flex-col items-center bg-[#F8F1EB] text-[#333]">
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex flex-col lg:flex-row gap-10 w-full max-w-5xl bg-white p-6 rounded-3xl shadow-lg border border-gray-300 self-end">
          <div className="flex-1 flex flex-col items-center text-center">
            <div className="w-40 h-40 rounded-full border-4 border-[#ff5733] shadow-lg hover:scale-105 transition-all duration-300 ease-in-out">
              <img src={auctionDetail.image?.url} alt={auctionDetail.title} className="w-full h-full object-cover rounded-full border-2 border-white" style={{ objectFit: "cover", aspectRatio: "1/1" }} />
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

      <div className="w-full max-w-5xl mt-8 bg-white p-6 rounded-3xl shadow-lg border border-gray-300 self-end">
        <header className="bg-[#E65C4F] py-4 text-xl font-bold text-center rounded-lg text-white">BIDS</header>
        <div className="bg-[#F8F1EB] p-4 rounded-b-lg">
          {auctionBidders?.length > 0 ? (
            auctionBidders.map((bidder, index) => (
              <div key={index} className="flex justify-between items-center p-3 border-b border-gray-300">
                <div className="flex items-center gap-3">
                  <img src={bidder.profileImage} alt={bidder.userName} className="w-12 h-12 rounded-full" />
                  <p className="text-lg">{bidder.userName}</p>
                </div>
                <p className="text-lg font-semibold text-[#E65C4F]">Rs.{bidder.amount}</p>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No bids yet</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default ViewAuctionDetails;