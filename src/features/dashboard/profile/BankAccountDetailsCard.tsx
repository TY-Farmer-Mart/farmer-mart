import { useState, useEffect } from "react";
import { BsBank2 } from "react-icons/bs";
import { VscCodeOss } from "react-icons/vsc";
import { MdEdit, MdOutlineAccountBox, MdSwitchAccount } from "react-icons/md";
import Modal from "@/components/common/modal/Modal";
import { Button } from "@/components/common/ui/Button";
import { Input } from "@/components/common/ui/Input";
import { PROFILE_PAGE_TXT } from "@constants/textConstants";
import { getBank, editBank } from "@/services/auth"; // ✅ import both

export const BankAccountDetailsCard: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    bankName: "",
    accountNumber: "",
    ifscCode: "",
    accountHolderName: "",
  });

  const fallback = (value: string | undefined) => value || "-";

  // ✅ Fetch bank details
  const fetchBankDetails = async () => {
    try {
      setLoading(true);

      const loginStr = localStorage.getItem("user");
      if (!loginStr) throw new Error("Login response not found in localStorage");

      const loginObj = JSON.parse(loginStr);
      const userId = loginObj.user?.id;
      if (!userId) throw new Error("User ID not found");

      const payload = { id: userId };
      const response = await getBank(payload);
      const bank = response.bank;

      setFormData({
        bankName: fallback(bank?.bankName),
        accountNumber: fallback(bank?.accountNumber),
        ifscCode: fallback(bank?.ifscCode),
        accountHolderName: fallback(bank?.accountHolderName),
      });
      setError(null);
    } catch (err: any) {
      console.error("Error fetching bank details:", err);
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBankDetails();
  }, []);

  // ✅ Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Handle update
  const handleUpdate = async () => {
    try {
      setLoading(true);
      const loginStr = localStorage.getItem("user");
      if (!loginStr) throw new Error("Login response not found in localStorage");

      const loginObj = JSON.parse(loginStr);
      const userId = loginObj.user?.id;
      if (!userId) throw new Error("User ID not found");

      const payload = {
        id: userId,
        bankName: formData.bankName,
        accountNumber: formData.accountNumber,
        ifscCode: formData.ifscCode,
        accountHolderName: formData.accountHolderName,
      };

      await editBank(payload);

      alert("✅ Bank details updated successfully!");
      setIsOpen(false);
      await fetchBankDetails(); // refresh data
    } catch (err: any) {
      console.error("Error updating bank info:", err);
      alert(err.message || "Failed to update bank info");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Render loading or error
  if (loading)
    return (
      <div className="p-6 bg-white rounded-lg shadow-md mt-4">
        <p className="text-gray-500">Loading bank details...</p>
      </div>
    );

  if (error)
    return (
      <div className="p-6 bg-white rounded-lg shadow-md mt-4">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );

  return (
    <div className="relative bg-white rounded-lg shadow-md px-3 py-4 mt-4">
      {/* HEADER */}
      <div className="flex justify-between items-center border-b pb-3 mb-4">
        <h2 className="text-lg font-semibold text-black p-2">
          {PROFILE_PAGE_TXT.BANK_ACC}
        </h2>
        <div
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm font-medium cursor-pointer"
        >
          <MdEdit /> {PROFILE_PAGE_TXT.EDIT_BTN}
        </div>
      </div>

      {/* BANK DETAILS */}
      <div className="flex flex-col sm:flex-row flex-wrap justify-start gap-8 sm:gap-16 lg:gap-64">
        <div className="flex flex-col items-start space-y-10 p-5">
          <div className="flex items-start gap-3">
            <div className="w-8 flex justify-start">
              <VscCodeOss className="w-8 h-8 text-green-400 rounded-md p-1" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-black text-left">
                {PROFILE_PAGE_TXT.IFSC}
              </span>
              <span className="text-sm text-black text-left">
                {formData.ifscCode}
              </span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-8 flex justify-start">
              <BsBank2 className="w-8 h-8 text-blue-500 rounded-md p-1" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-black text-left">
                {PROFILE_PAGE_TXT.BANK_NAME}
              </span>
              <span className="text-sm text-black text-left">
                {formData.bankName}
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-start space-y-10 p-5">
          <div className="flex items-start gap-3">
            <div className="w-8 flex justify-start">
              <MdOutlineAccountBox className="w-8 h-8 text-blue-500 rounded-md p-1" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-black text-left">
                {PROFILE_PAGE_TXT.ACC_NUM}
              </span>
              <span className="text-sm text-black text-left">
                {formData.accountNumber}
              </span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-8 flex justify-start">
              <MdSwitchAccount className="w-8 h-8 text-green-400 rounded-md p-1" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-black text-left">
                Account Holder Name
              </span>
              <span className="text-sm text-black text-left">
                {formData.accountHolderName}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* EDIT MODAL */}
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Edit Bank Details"
        showClose={true}
        footer={
          <>
            <Button
              onClick={() => setIsOpen(false)}
              className="w-full"
              variant="secondary"
            >
              Cancel
            </Button>
            <Button onClick={handleUpdate} className="w-full m-auto">
              Update
            </Button>
          </>
        }
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Bank Name"
            name="bankName"
            value={formData.bankName}
            onChange={handleChange}
            className="px-4 py-2"
          />
          <Input
            label="Account Number"
            name="accountNumber"
            value={formData.accountNumber}
            onChange={handleChange}
            className="px-4 py-2"
          />
          <Input
            label="IFSC Code"
            name="ifscCode"
            value={formData.ifscCode}
            onChange={handleChange}
            className="px-4 py-2"
          />
          <Input
            label="Account Holder Name"
            name="accountHolderName"
            value={formData.accountHolderName}
            onChange={handleChange}
            className="px-4 py-2"
          />
        </div>
      </Modal>
    </div>
  );
};



