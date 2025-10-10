import { getBanks } from './auth';
// Login function
import API from "./index";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const loginUser = async ({ email, password }: any) => {
  try {
    const response = await API.post("/auth/signin", {
      email,
      password,
    });

    // Save user data in localStorage
    localStorage.setItem("user", JSON.stringify(response.data));

    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    throw err.response ? err.response.data : { message: err.message };
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const registerUser = async (userData: any) => {
  try {
    const response = await API.post("/auth/signup", userData);
    console.log(response);
    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    throw err.response ? err.response.data : { message: err.message };
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getProfile = async (payload: any) => {
  console.log("passed id in the function", payload)
  try {
    const response = await API.post("/user/get-profile", payload);
    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    throw err.response ? err.response.data : { message: err.message };
  }
};

export const getCompanies = async (payload: any) => {
  console.log("passed id in the function", payload)
  try {
    const response = await API.post("/user/get-companies", payload);
    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    throw err.response ? err.response.data : { message: err.message };
  }
};


export const getBank = async (payload: any) => {
  console.log("passed id in the function", payload)
  try {
    const response = await API.post("/user/get-banks", payload);
    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    throw err.response ? err.response.data : { message: err.message };
  }
};

export const editBank = async (payload: any) => {
  console.log("passed id in the function", payload)
  try {
    const response = await API.put("/user/edit-bank", payload);
    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    throw err.response ? err.response.data : { message: err.message };
  }
};
