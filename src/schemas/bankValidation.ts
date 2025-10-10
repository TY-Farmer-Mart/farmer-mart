import { PROFILE_PAGE_TXT } from "@constants/textConstants";

export interface BankFormData {
  bankName: string;
  accountNumber: string;
  ifscCode: string;
  accountHolderName: string;
}

export interface BankFormErrors {
  bankName?: string;
  accountNumber?: string;
  ifscCode?: string;
  accountHolderName?: string;
}

// Validate IFSC format
export const isValidIFSC = (ifsc: string) =>
  /^[A-Z]{4}0[A-Z0-9]{6}$/.test(ifsc?.toUpperCase());

// Verify IFSC exists via API
export const verifyIFSCExists = async (ifsc: string) => {
  try {
    const res = await fetch(`https://ifsc.razorpay.com/${ifsc}`);
    if (!res.ok) return false;
    return await res.json();
  } catch {
    return false;
  }
};

// Main validation function
export const validateBankForm = async (data: BankFormData): Promise<BankFormErrors> => {
  const errors: BankFormErrors = {};

  if (!data.ifscCode) errors.ifscCode = PROFILE_PAGE_TXT.REQUIRED_IFSC;
  else if (!isValidIFSC(data.ifscCode)) errors.ifscCode = PROFILE_PAGE_TXT.INVALID_IFSC;
  else if (!(await verifyIFSCExists(data.ifscCode))) errors.ifscCode = PROFILE_PAGE_TXT.IFSC_NOT_FOUND;

  if (!data.bankName) errors.bankName = PROFILE_PAGE_TXT.REQUIRED_BANK_NAME;
  if (!data.accountNumber) errors.accountNumber = PROFILE_PAGE_TXT.REQUIRED_ACC_NUM;
  else if (!/^\d{9,18}$/.test(data.accountNumber)) errors.accountNumber = PROFILE_PAGE_TXT.INVALID_ACC_NUM;
  if (!data.accountHolderName) errors.accountHolderName = PROFILE_PAGE_TXT.REQUIRED_ACC_HOLDER;

  return errors;
};
