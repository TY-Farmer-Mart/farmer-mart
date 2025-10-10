import { useState, useEffect, useCallback } from "react";
import { BsBank2 } from "react-icons/bs";
import { VscCodeOss } from "react-icons/vsc";
import { MdEdit, MdOutlineAccountBox, MdSwitchAccount } from "react-icons/md";
import Modal from "@/components/common/modal/Modal";
import { Button } from "@/components/common/ui/Button";
import { Input } from "@/components/common/ui/Input";
import { PROFILE_PAGE_TXT } from "@constants/textConstants";
import { getBank, editBank } from "@/services/auth";
import { isValidIFSC, verifyIFSCExists, validateBankForm, BankFormErrors } from "@/schemas/bankValidation";

interface BankData {
  bankName: string;
  accountNumber: string;
  ifscCode: string;
  accountHolderName: string;
}

export const BankAccountDetailsCard: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState<BankData>({
    bankName: "",
    accountNumber: "",
    ifscCode: "",
    accountHolderName: "",
  });

  const [modalFormData, setModalFormData] = useState(formData);
  const [modalFormErrors, setModalFormErrors] = useState<BankFormErrors>({});

  const fallback = (value?: string) => value || "-";

  const fetchBankDetails = useCallback(async () => {
    try {
      setLoading(true);
      const loginStr = localStorage.getItem("user");
      if (!loginStr) throw new Error("Login response not found");

      const loginObj = JSON.parse(loginStr);
      const userId = loginObj.user?.id;
      if (!userId) throw new Error("User ID not found");

      const response = await getBank({ id: userId });
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
  }, []);

  useEffect(() => {
    fetchBankDetails();
  }, [fetchBankDetails]);

  const openModal = () => {
    setModalFormData(formData);
    setModalFormErrors({});
    setIsOpen(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setModalFormData(prev => ({ ...prev, [name]: value }));
    setModalFormErrors(prev => ({ ...prev, [name]: undefined }));
  };

  const handleIFSCBlur = async () => {
    const { ifscCode } = modalFormData;
    if (!ifscCode) return;

    if (!isValidIFSC(ifscCode)) {
      setModalFormErrors(prev => ({ ...prev, ifscCode: PROFILE_PAGE_TXT.INVALID_IFSC }));
      return;
    }

    const ifscData = await verifyIFSCExists(ifscCode);
    if (ifscData?.BANK) {
      setModalFormData(prev => ({ ...prev, bankName: ifscData.BANK }));
      setModalFormErrors(prev => ({ ...prev, ifscCode: undefined }));
    } else {
      setModalFormErrors(prev => ({ ...prev, ifscCode: PROFILE_PAGE_TXT.IFSC_NOT_FOUND }));
    }
  };

  const handleUpdate = async () => {
    try {
      setLoading(true);
      const errors = await validateBankForm(modalFormData);
      setModalFormErrors(errors);
      if (Object.keys(errors).length) return;

      const loginStr = localStorage.getItem("user");
      if (!loginStr) throw new Error("Login response not found");

      const loginObj = JSON.parse(loginStr);
      const userId = loginObj.user?.id;
      if (!userId) throw new Error("User ID not found");

      await editBank({ id: userId, ...modalFormData });
      setFormData(modalFormData);
      setIsOpen(false);
    } catch (err: any) {
      console.error("Error updating bank info:", err);
      setError(err.message || "Failed to update bank info");
    } finally {
      setLoading(false);
    }
  };

  const renderField = (icon: JSX.Element, label: string, value: string) => (
    <div className="flex items-start gap-3">
      <div className="w-8 flex justify-start">{icon}</div>
      <div className="flex flex-col">
        <span className="text-sm font-semibold text-black text-left">{label}</span>
        <span className="text-sm text-black text-left">{value}</span>
      </div>
    </div>
  );

  if (loading)
    return (
      <div className="p-6 bg-white rounded-lg shadow-md mt-4">
        <p className="text-gray-500">{PROFILE_PAGE_TXT.LOADING_BANK}</p>
      </div>
    );

  if (error)
    return (
      <div className="p-6 bg-white rounded-lg shadow-md mt-4">
        <p className="text-red-500">{PROFILE_PAGE_TXT.ERROR_BANK} {error}</p>
      </div>
    );

  const modalFields = [
    { key: "ifscCode", label: PROFILE_PAGE_TXT.IFSC, onBlur: handleIFSCBlur },
    { key: "bankName", label: PROFILE_PAGE_TXT.BANK_NAME },
    { key: "accountNumber", label: PROFILE_PAGE_TXT.ACC_NUM },
    { key: "accountHolderName", label: PROFILE_PAGE_TXT.ACC_HOLDER },
  ];

  return (
    <div className="relative bg-white rounded-lg shadow-md px-3 py-4 mt-4">
      {/* HEADER */}
      <div className="flex justify-between items-center border-b pb-3 mb-4">
        <h2 className="text-lg font-semibold text-black p-2">{PROFILE_PAGE_TXT.BANK_ACC}</h2>
        <div onClick={openModal} className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm font-medium cursor-pointer">
          <MdEdit /> {PROFILE_PAGE_TXT.EDIT_BTN}
        </div>
      </div>

      {/* BANK DETAILS */}
      <div className="flex flex-col sm:flex-row flex-wrap justify-start gap-8 sm:gap-16 lg:gap-64">
        <div className="flex flex-col items-start space-y-10 p-5">
          {renderField(<VscCodeOss className="w-8 h-8 text-green-400 rounded-md p-1" />, PROFILE_PAGE_TXT.IFSC, formData.ifscCode)}
          {renderField(<BsBank2 className="w-8 h-8 text-blue-500 rounded-md p-1" />, PROFILE_PAGE_TXT.BANK_NAME, formData.bankName)}
        </div>
        <div className="flex flex-col items-start space-y-10 p-5">
          {renderField(<MdOutlineAccountBox className="w-8 h-8 text-blue-500 rounded-md p-1" />, PROFILE_PAGE_TXT.ACC_NUM, formData.accountNumber)}
          {renderField(<MdSwitchAccount className="w-8 h-8 text-green-400 rounded-md p-1" />, PROFILE_PAGE_TXT.ACC_HOLDER, formData.accountHolderName)}
        </div>
      </div>

      {/* EDIT MODAL */}
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title={PROFILE_PAGE_TXT.EDIT_BANK_MODAL}
        showClose
        footer={
          <>
            <Button onClick={() => setIsOpen(false)} className="w-full" variant="secondary">{PROFILE_PAGE_TXT.CANCEL}</Button>
            <Button onClick={handleUpdate} className="w-full m-auto">{PROFILE_PAGE_TXT.UPDATE}</Button>
          </>
        }
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 min-h-[170px]">
          {modalFields.map(({ key, label, onBlur }) => (
            <div key={key} className="flex flex-col">
              <Input
                label={label}
                name={key}
                value={modalFormData[key as keyof BankData]}
                onChange={handleChange}
                onBlur={onBlur}
                className={`px-4 py-2 ${modalFormErrors[key as keyof BankFormErrors] ? "border-red-500" : ""}`}
              />
              <p className="text-red-500 text-sm min-h-[1.25rem]">
                {modalFormErrors[key as keyof BankFormErrors] || ""}
              </p>
            </div>
          ))}
        </div>
      </Modal>
    </div>
  );
};
