import API from "./index";

interface UpdateCompanyPayload {
  id: string;
  companyName?: string;
  companyType?: string;
  gstNumber?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  pinCode?: string;
}

// ✅ Fetch company details by userId (GET call)
export const getCompanies = async (userId: string) => {
  try {
    const response = await API.get(`/user/get-companies/${userId}`);
    return response.data; // { message, company }
  } catch (err: any) {
    throw err.response ? err.response.data : { message: err.message };
  }
};

// ✅ Update company info (PUT call)
export const updateCompany = async (data: UpdateCompanyPayload) => {
  try {
    const response = await API.put("/user/update-company", data);
    return response.data;
  } catch (err: any) {
    throw err.response ? err.response.data : { message: err.message };
  }
};



