import {
  deletePaymentProof,
  getSinglePaymentProofDetail,
  updatePaymentProof,
} from "@/store/slices/superAdminSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const PaymentProofs = () => {
  const { paymentProofs, singlePaymentProof, loading } = useSelector(
    (state) => state.superAdmin
  );
  const [openDrawer, setOpenDrawer] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setOpenDrawer(singlePaymentProof && Object.keys(singlePaymentProof).length > 0);
  }, [singlePaymentProof]);

  return (
    <>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white mt-5">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="w-1/3 py-2">User ID</th>
              <th className="w-1/3 py-2">Status</th>
              <th className="w-1/3 py-2">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {paymentProofs.length > 0 ? (
              paymentProofs.map(({ _id, userId, status }) => (
                <tr key={_id}>
                  <td className="py-2 px-4 text-center">{userId}</td>
                  <td className="py-2 px-4 text-center">{status}</td>
                  <td className="flex items-center py-4 justify-center gap-3">
                    <button
                      className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-700 transition-all duration-300"
                      onClick={() => dispatch(getSinglePaymentProofDetail(_id))}
                    >
                      Update
                    </button>
                    <button
                      className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-700 transition-all duration-300"
                      onClick={() => dispatch(deletePaymentProof(_id))}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center text-xl text-red-600 py-3">
                  No payment proofs found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <Drawer openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} />
    </>
  );
};

export default PaymentProofs;

const Drawer = ({ openDrawer, setOpenDrawer }) => {
  const { singlePaymentProof, loading } = useSelector((state) => state.superAdmin);
  const dispatch = useDispatch();

  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (singlePaymentProof) {
      setAmount(singlePaymentProof.amount || "");
      setStatus(singlePaymentProof.status || "");
    }
  }, [singlePaymentProof]);

  const handlePaymentProofUpdate = () => {
    if (!amount || !status) return alert("Please fill in both amount and status.");
    dispatch(updatePaymentProof(singlePaymentProof._id, status, amount));
  };

  return (
    <section
      className={`fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center transition-all duration-300 ${openDrawer ? "visible opacity-100" : "invisible opacity-0"
        }`}
    >
      <div className="bg-white w-full sm:max-w-[640px] p-6 rounded-lg shadow-lg max-h-[90vh] overflow-y-auto transition-all duration-300">
        <h3 className="text-[#D6482B] text-3xl font-semibold text-center mb-2">
          Update Payment Proof
        </h3>
        <p className="text-gray-600 text-center mb-4">
          Modify payment status and amount.
        </p>

        <form className="flex flex-col gap-4">
          <InputField label="User ID" value={singlePaymentProof.userId} disabled />
          <InputField label="Amount" type="number" value={amount} onChange={setAmount} disabled={loading} />
          <SelectField label="Status" value={status} onChange={setStatus} disabled={loading} />
          <TextareaField label="Comment" value={singlePaymentProof.comment} disabled />

          <div>
            <Link
              to={singlePaymentProof.proof?.url || "#"}
              target="_blank"
              className="bg-[#D6482B] flex justify-center w-full py-2 rounded-md text-white font-semibold text-xl transition-all duration-300 hover:bg-[#b8381e]"
            >
              View Payment Proof
            </Link>
          </div>

          <div className="flex gap-4">
            <button
              type="button"
              className="bg-blue-500 w-full py-2 rounded-md text-white font-semibold text-xl transition-all duration-300 hover:bg-blue-700"
              onClick={handlePaymentProofUpdate}
              disabled={loading}
            >
              {loading ? "Updating..." : "Update Payment Proof"}
            </button>
            <button
              type="button"
              className="bg-yellow-500 w-full py-2 rounded-md text-white font-semibold text-xl transition-all duration-300 hover:bg-yellow-700"
              onClick={() => setOpenDrawer(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </section>

  );
};

const InputField = ({ label, type = "text", value, onChange, disabled }) => (
  <div className="flex flex-col gap-2">
    <label className="text-[16px] text-stone-600">{label}</label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange && onChange(e.target.value)}
      disabled={disabled}
      className="text-xl px-2 py-2 bg-transparent border border-stone-600 rounded-md focus:outline-none text-stone-600"
    />
  </div>
);

const SelectField = ({ label, value, onChange, disabled }) => (
  <div className="flex flex-col gap-2">
    <label className="text-[16px] text-stone-600">{label}</label>
    <select
      value={value}
      onChange={(e) => onChange && onChange(e.target.value)}
      disabled={disabled}
      className="text-xl px-2 py-2 bg-transparent border border-stone-600 rounded-md focus:outline-none"
    >
      <option value="Pending">Pending</option>
      <option value="Approved">Approved</option>
      <option value="Rejected">Rejected</option>
      <option value="Settled">Settled</option>
    </select>
  </div>
);

const TextareaField = ({ label, value, disabled }) => (
  <div className="flex flex-col gap-2">
    <label className="text-[16px] text-stone-600">{label}</label>
    <textarea
      rows={4}
      value={value}
      disabled={disabled}
      className="text-xl px-2 py-2 bg-transparent border border-stone-600 rounded-md focus:outline-none text-stone-600"
    />
  </div>
);
