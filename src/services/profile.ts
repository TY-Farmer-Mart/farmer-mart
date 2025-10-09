import API from "./index";

export interface ContactInfoProps {
  id: string;
  primaryMobile: string;
  altMobile?: string;
  primaryEmail: string;
  altEmail?: string;
  address: string;
}

// Fetch user profile
export const getUserProfile = async (): Promise<ContactInfoProps> => {
  try {
    const response = await API.get("/user/get-profile"); // replace with your endpoint
    return response.data;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw error;
  }
};

// Update user profile
export const updateUserProfile = async (
  data: ContactInfoProps
): Promise<ContactInfoProps> => {
  try {
    const response = await API.put(`/user/get-profile/${data.id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating user profile:", error);
    throw error;
  }
};
