import cron from "node-cron";
import { Auction } from "../models/auctionSchema.js";
import { User } from "../models/userSchema.js";
import { Bid } from "../models/bidSchema.js";
import { sendEmail } from "../utils/sendEmail.js";
import { calculateCommission } from "../controllers/commissionController.js";

export const endedAuctionCron = () => {
  cron.schedule("*/1 * * * *", async () => {
    const now = new Date();
    console.log("Cron for ended auction running...");
    const endedAuctions = await Auction.find({
      endTime: { $lt: now },
      commissionCalculated: false,
    });
    console.log("Ended Auctions Found:", endedAuctions.length);
    for (const auction of endedAuctions) {
      try {
        const commissionAmount = await calculateCommission(auction._id);
        auction.commissionCalculated = true;
        console.log(`Finding highest bidder for auction ID: ${auction._id}`);
        const highestBidder = await Bid.findOne({
          auctionItem: auction._id,
          amount: auction.currentBid,
        });
        console.log(`Highest bidder found: ${highestBidder ? highestBidder.bidder.id : "None"}`);
        const auctioneer = await User.findById(auction.createdBy);
        auctioneer.unpaidCommission = commissionAmount;
        if (highestBidder) {
          auction.highestBidder = highestBidder.bidder.id;
          await auction.save();
          const bidder = await User.findById(highestBidder.bidder.id);
          await User.findByIdAndUpdate(
            bidder._id,
            {
              $inc: {
                moneySpent: highestBidder.amount,
                auctionsWon: 1,
              },
            },
            { new: true }
          );
          await User.findByIdAndUpdate(
            auctioneer._id,
            {
              $inc: {
                unpaidCommission: commissionAmount,
              },
            },
            { new: true }
          );
          const subject = `Congratulations! You've won the auction for ${auction.title}`;
          const message = `Dear ${bidder.userName}, \n\nCongratulations! You are the highest bidder and have won the auction for "${auction.title}". We appreciate your participation and hope you're excited about your new item! \n\nTo proceed, please contact your auctioneer at ${auctioneer.email} and complete your payment using one of the methods below:\n\n1. **Bank Transfer**: \n-> Account Name: ${auctioneer.paymentMethods.bankTransfer.bankAccountName} \n-> Account Number: ${auctioneer.paymentMethods.bankTransfer.bankAccountNumber} \n-> Bank: ${auctioneer.paymentMethods.bankTransfer.bankName}\n\n2. **UPI Payment**:\n- You can send payment via UPI-ID: ${auctioneer.paymentMethods.upiId.upiId}\n\n3. **Google Pay**:\n- Transfer to: ${auctioneer.paymentMethods.googlePayNumber.googlePayNumber}\n\n4. **Cash on Delivery (COD)**:\n-> If you prefer COD, you must pay 20% of the total amount upfront before delivery.\n-> To pay the 20% upfront, use any of the above methods.\n-> The remaining 80% will be paid upon delivery.\n-> If you'd like to check the condition of your item before payment, please email ${auctioneer.email} for more details.\n\nNOTE: Please ensure your payment is completed "within 24 hours" of receiving this email for smooth transaction. Once confirmed, we’ll process your shipment immediately.\n\nThank you for choosing BidBay Auctions..!! We look forward to serving you again.\n\nBest regards,\nBidBay Auction Team`;
          console.log("SENDING EMAIL TO HIGHEST BIDDER");
          sendEmail({ email: bidder.email, subject, message });
          console.log("SUCCESSFULLY EMAIL SEND TO HIGHEST BIDDER");
        } else {
          await auction.save();
        }
      } catch (error) {
        return next(console.error(error || "Some error in ended auction cron"));
      }
    }
  });
};
