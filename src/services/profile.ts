import API from "./index";

export const getCompanies = async (userId: any) => {
  try {
    const response = await API.post("/user/get-companies", { id: userId }); 
    return response.data; 
  } catch (err: any) {
    throw err.response ? err.response.data : { message: err.message };
  }
};


export const updateCompany = async (data: any) => {
  try {
    const response = await API.put("/user/edit-company", data);
    return response.data;
  } catch (err: any) {
    throw err.response ? err.response.data : { message: err.message };
  }
};



