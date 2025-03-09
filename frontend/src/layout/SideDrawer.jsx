import React, { useState } from "react";
import { RiAuctionFill } from "react-icons/ri";
import { MdLeaderboard, MdDashboard } from "react-icons/md";
import { SiGooglesearchconsole } from "react-icons/si";
import { BsFillInfoSquareFill } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdCloseCircleOutline, IoIosCreate } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import { FaFileInvoiceDollar } from "react-icons/fa6";
import { FaEye } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/store/slices/userSlice";
import { Link, useLocation } from "react-router-dom";

const SideDrawer = () => {
  const [show, setShow] = useState(false);
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const location = useLocation();

  const handleLogout = () => {
    dispatch(logout());
  };

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <div
        onClick={() => setShow(!show)}
        className="fixed right-5 top-5 bg-[#D6482B] text-white text-3xl p-2 rounded-md hover:bg-[#b8381e] lg:hidden"
      >
        <GiHamburgerMenu />
      </div>

      <div
        className={`w-[100%] sm:w-[280px] bg-[#1A1F36] text-white h-full fixed top-0 ${show ? "left-0" : "left-[-100%]"
          } transition-all duration-300 ease-in-out p-4 flex flex-col justify-between lg:left-0 border-r-[1px] border-r-gray-600`}
      >
        <div className="relative">
          <Link to={"/"}>
            <h4 className="text-2xl font-bold mb-4">
              Bid<span className="text-[#FD8264]">Bay</span>
            </h4>
          </Link>

          <ul className="flex flex-col gap-3">
            <li>
              <Link
                to={"/auctions"}
                className={`flex text-lg font-medium gap-2 items-center ${isActive("/auctions")
                    ? "text-[#FD8264] bg-[#2E2E2E] px-2 py-1 rounded-md"
                    : "hover:text-[#FD8264]"
                  } transition-all duration-150`}
              >
                <RiAuctionFill /> Auctions
              </Link>
            </li>

            <li>
              <Link
                to={"/leaderboard"}
                className={`flex text-lg font-medium gap-2 items-center ${isActive("/leaderboard")
                    ? "text-[#FD8264] bg-[#2E2E2E] px-2 py-1 rounded-md"
                    : "hover:text-[#FD8264]"
                  } transition-all duration-150`}
              >
                <MdLeaderboard /> Leaderboard
              </Link>
            </li>

            {isAuthenticated && user && user.role === "Auctioneer" && (
              <>
                <li>
                  <Link
                    to={"/submit-commission"}
                    className={`flex text-lg font-medium gap-2 items-center ${isActive("/submit-commission")
                      ? "text-[#FD8264] bg-[#2E2E2E] px-2 py-1 rounded-md"
                      : "hover:text-[#FD8264]"
                    } transition-all duration-150`}
                  >
                    <FaFileInvoiceDollar /> Submit Commission
                  </Link>
                </li>

                <li>
                  <Link
                    to={"/create-auction"}
                    className={`flex text-lg font-medium gap-2 items-center ${isActive("/create-auction")
                      ? "text-[#FD8264] bg-[#2E2E2E] px-2 py-1 rounded-md"
                      : "hover:text-[#FD8264]"
                    } transition-all duration-150`}
                  >
                    <IoIosCreate /> Create Auction
                  </Link>
                </li>

                <li>
                  <Link
                    to={"/view-my-auctions"}
                    className={`flex text-lg font-medium gap-2 items-center ${isActive("/view-my-auctions")
                      ? "text-[#FD8264] bg-[#2E2E2E] px-2 py-1 rounded-md"
                      : "hover:text-[#FD8264]"
                    } transition-all duration-150`}
                  >
                    <FaEye /> View My Auctions
                  </Link>
                </li>
              </>
            )}

            {isAuthenticated && user && user.role === "Super Admin" && (
              <li>
                <Link
                  to={"/dashboard"}
                  className={`flex text-lg font-medium gap-2 items-center ${isActive("/dashboard")
                      ? "text-[#FD8264] bg-[#2E2E2E] px-2 py-1 rounded-md"
                      : "hover:text-[#FD8264]"
                    } transition-all duration-150`}
                >
                  <MdDashboard /> Dashboard
                </Link>
              </li>
            )}
          </ul>

          {!isAuthenticated ? (
            <div className="my-4 flex gap-2">
              <Link
                to={"/sign-up"}
                className="bg-[#D6482B] hover:bg-[#b8381e] text-lg py-2 px-4 rounded-md text-white font-semibold"
              >
                Sign Up
              </Link>

              <Link
                to={"/login"}
                className="border-2 border-[#DECCBE] text-lg font-semibold py-2 px-4 rounded-md hover:bg-[#DECCBE] hover:text-[#1A1F36] transition-all"
              >
                Login
              </Link>
            </div>
          ) : (
            <div className="my-4 flex gap-4 w-fit" onClick={handleLogout}>
              <button className="bg-[#D6482B] hover:bg-[#b8381e] text-lg py-2 px-4 rounded-md text-white font-semibold">
                Logout
              </button>
            </div>
          )}

          <hr className="mb-4 border-t-[#FD8264]" />

          <ul className="flex flex-col gap-3">
            {isAuthenticated && (
              <li>
                <Link
                  to={"/me"}
                  className={`flex text-lg font-medium gap-2 items-center ${isActive("/me")
                      ? "text-[#FD8264] bg-[#2E2E2E] px-2 py-1 rounded-md"
                      : "hover:text-[#FD8264]"
                    } transition-all duration-150`}
                >
                  <FaUserCircle /> Profile
                </Link>
              </li>
            )}
            <li>
              <Link
                to={"/how-it-works-info"}
                className={`flex text-lg font-medium gap-2 items-center ${isActive("/how-it-works-info")
                    ? "text-[#FD8264] bg-[#2E2E2E] px-2 py-1 rounded-md"
                    : "hover:text-[#FD8264]"
                  } transition-all duration-150`}
              >
                <SiGooglesearchconsole /> How we work
              </Link>
            </li>
            <li>
              <Link
                to={"/about"}
                className={`flex text-lg font-medium gap-2 items-center ${isActive("/about")
                    ? "text-[#FD8264] bg-[#2E2E2E] px-2 py-1 rounded-md"
                    : "hover:text-[#FD8264]"
                  } transition-all duration-150`}
              >
                <BsFillInfoSquareFill /> About Us
              </Link>
            </li>
          </ul>


          <IoMdCloseCircleOutline
            onClick={() => setShow(false)}
            className="absolute top-0 right-4 text-[28px] sm:hidden transition-transform duration-300 hover:rotate-90"
          />
        </div>

        <div>
          <div className="flex gap-2 items-center mb-2">
            <Link
              to="/"
              className="bg-white text-gray-600 p-2 text-xl rounded-full hover:text-blue-500 transition-all"
            >
              <FaFacebook />
            </Link>

            <Link
              to="/"
              className="bg-white text-gray-600 p-2 text-xl rounded-full hover:text-pink-500 transition-all"
            >
              <RiInstagramFill />
            </Link>
          </div>

          <Link
            to={"/contact"}
            className="text-gray-400 font-semibold hover:text-[#FD8264] transition-all duration-150"
          >
            Contact Us
          </Link>

          <p className="text-gray-500">&copy; 2025 BidBay</p>
          <p className="text-gray-500">
            Designed By{" "}
            <Link
              to={"/"}
              className="font-semibold hover:text-[#FD8264] transition-all duration-150"
            >
              Mirza Asaf
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default SideDrawer;
