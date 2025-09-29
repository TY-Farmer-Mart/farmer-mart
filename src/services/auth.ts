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
    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    throw err.response ? err.response.data : { message: err.message };
  }
};
