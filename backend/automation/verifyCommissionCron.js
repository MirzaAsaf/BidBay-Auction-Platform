import { User } from "../models/userSchema.js";
import { PaymentProof } from "../models/commissionProofSchema.js";
import { Commission } from "../models/commissionSchema.js";
import cron from "node-cron";
import { sendEmail } from "../utils/sendEmail.js";

export const verifyCommissionCron = () => {
  cron.schedule("*/1 * * * *", async () => {
    console.log("Running Verify Commission Cron...");
    const approvedProofs = await PaymentProof.find({ status: "Approved" });
    for (const proof of approvedProofs) {
      try {
        const user = await User.findById(proof.userId);
        let updatedUserData = {};
        if (user) {
          if (user.unpaidCommission >= proof.amount) {
            updatedUserData = await User.findByIdAndUpdate(
              user._id,
              {
                $inc: {
                  unpaidCommission: -proof.amount,
                },
              },
              { new: true }
            );
            await PaymentProof.findByIdAndUpdate(proof._id, {
              status: "Settled",
            });
          } else {
            updatedUserData = await User.findByIdAndUpdate(
              user._id,
              {
                unpaidCommission: 0,
              },
              { new: true }
            );
            await PaymentProof.findByIdAndUpdate(proof._id, {
              status: "Settled",
            });
          }
          await Commission.create({
            amount: proof.amount,
            user: user._id,
          });
          const settlementDate = new Date(Date.now())
            .toString()
            .substring(0, 15);

            const subject = `🎉 Your Payment Has Been Successfully Verified & Settled!`;

            const message = `
Dear ${user.userName},

  We are pleased to inform you that your recent commission payment has been successfully verified and settled. We sincerely appreciate your prompt payment and cooperation in ensuring a smooth transaction process. Your account has been updated accordingly, and you can now continue your activities on our platform without any restrictions.
            
  *Payment Details*
      -> Amount Settled:** ${proof.amount}  
      -> Remaining Unpaid Commission:** ${updatedUserData.unpaidCommission}  
      -> Date of Settlement:** ${settlementDate}  
            
  Your continued support is invaluable to us, and we are committed to providing you with the best experience possible. If you have any questions or need further assistance, feel free to reach out to our support team.
            
  Thank you for being a valued member of **BidBay Auctions!**

  Best regards,  
  BidBay Auction Team`;            
          sendEmail({ email: user.email, subject, message });
        }
        console.log(`User ${proof.userId} paid commission of ${proof.amount}`);
      } catch (error) {
        console.error(
          `Error processing commission proof for user ${proof.userId}: ${error.message}`
        );
      }
    }
  });
};
