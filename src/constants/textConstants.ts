import { Country, Service } from "@/types/authTypes";
import { Star, Store, Smartphone, Calculator } from "lucide-react";

export const SERVICES: Service[] = [
  {
    icon: Star,
    title: "Connect with verified sellers",
    description:
      "Tell us your requirement & let our experts find verified sellers for you",
    buttonText: "Get Verified Sellers",
  },
  {
    icon: Store,
    title: "Sell on FarmMart for free",
    description: "Reach out to more than 21+ crore buyers. Sell with us.",
    buttonText: "Start Selling",
  },
  {
    icon: Smartphone,
    title: "Download our App",
    description: "Get instant notifications on the go. Download our App Now",
    buttonText: "Download Now",
  },
  {
    icon: Calculator,
    title: "Tally on Mobile",
    description:
      "With Live Keeping, SME's can now connect their Tally offline data to mobile app",
    buttonText: "Know More",
  },
];

export const ROLE_OPTIONS = [
  { label: "Admin", value: "admin" },
  { label: "User", value: "user" },
  { label: "Vendor/Farmer", value: "vendor" },
  { label: "Consultant", value: "consultant" },
] as const;

export const CITY_KEYS = [
  "Delhi",
  "Bengaluru",
  "Chennai",
  "Mumbai",
  "Ahmedabad",
  "Kolkata",
  "Pune",
  "Surat",
  "Jaipur",
  "Hyderabad",
];

export const AUTH_VALIDATION = {
  NAME_REQUIRED: "Full name is required",
  PHONE_REQUIRED: "Phone number is required",
  PHONE_INVALID: "Phone number must be 10 digits",
  EMAIL_REQUIRED: "Email is required",
  EMAIL_INVALID: "Invalid email address",
  ROLE_REQUIRED: "Role is required",
  GST_INVALID: "GST number must be 15 digits",
  PASSWORD_REQUIRED: "Password is required",
  PASSWORD_MIN: "Password must be at least 4 characters",
  CONFIRM_PASSWORD_REQUIRED: "Confirm Password is required",
  PASSWORD_MATCH: "Passwords must match",
  ABOUT_MAX: "About section must not exceed 300 characters",
};

export const DASHBOARD_NAV_TXT = {
  LOCATION: "All India",
  SEARCH_PLACEHOLDER: "Enter product / service",
  BTN_TEXT: "Search",
  POPOVER_TEXT: "Enter city",
};

export const LOCATION_SEARCH = {
  TITLE: "Farm near",
  NEARME: "Near Me",
};

export const PROFILE_PAGE_TXT = {
  // General
  EDIT_BTN: "Edit",
  MEMBER: "Member since",
  CONTACT_INFO: "Contact Information",
  PRIMARY_MOB: "Primary Mobile:",
  PRIMARY_MAIL: "Primary Email",
  ADDRESS: "Address",
  ALT_MOB: " Alternative Mobile",
  ALT_MAIL: " Alternative Email",
  COMPANY_INFO: " Company Information",
  COMPANY_NAME: "Company Name",
  GST: "GSTIN",
  FB: "Facebook",
  IG: "Instagram",
  GL_BUSINESS: "Google Business",
  WEBSITE: "Company Website",
  PAN: "PAN",
  
  // Bank Info
  BANK_ACC: "Bank Account Details",
  IFSC: "IFSC Code",
  BANK_NAME: "Bank Name",
  ACC_NUM: "Account Number",
  ACC_TYPE: "Account Type",
  ACC_HOLDER: "Account Holder Name",
  
  // Modal & Buttons
  EDIT_BANK_MODAL: "Edit Bank Details",
  CANCEL: "Cancel",
  UPDATE: "Update",
  
  // Loading / Error
  LOADING_BANK: "Loading bank details...",
  ERROR_BANK: "Error fetching bank details:",
  
  // Validation messages
  REQUIRED_IFSC: "IFSC Code is required.",
  REQUIRED_BANK_NAME: "Bank Name is required.",
  REQUIRED_ACC_NUM: "Account Number is required.",
  REQUIRED_ACC_HOLDER: "Account Holder Name is required.",
  INVALID_IFSC: "Invalid IFSC format.",
  IFSC_NOT_FOUND: "IFSC not found.",
  INVALID_ACC_NUM: "Account number must be 9–18 digits.",
};




export const SELLER_PAGE_TXT ={
  ICON1_TITLE:" Grow your Business",
  ICON1_DES: " Sell to buyers anytime, anywhere",
  ICON2_TITLE: "Zero Cost",
  ICON2_DES: "No commission or transaction fee",
  ICON3_TITLE:" Manage your Business Better",
  ICON3_DES: "Lead Management System & other features",
  ICON4_TITLE: " Create Account",
  ICON4_DES: " Add your name and phone number to get started",
  ICON5_TITLE:"Add Business",
  ICON5_DES: " Add name, address & e-mail of your company, store/ business.",
  ICON6_TITLE: "Add Products/ Services",
  ICON6_DES:"Minimum 3 products/ services needed    for your free listing page.",
  HEADING1_TXT: "Sell on IndiaMART",
  HEADING2_TXT:"Get a free listing in 3 simple steps:"

}


export const countries: Country[] = [
  { code: "+91", name: "India", flag: "https://flagcdn.com/w20/in.png"},
  { code: "+1", name: "USA", flag: "https://flagcdn.com/us.svg" },
  { code: "+44", name: "UK", flag: "https://flagcdn.com/gb.svg" },
  { code: "+61", name: "Australia", flag: "https://flagcdn.com/au.svg" },
  { code: "+81", name: "Japan", flag: "https://flagcdn.com/jp.svg" },
  
];

export const SELLER_REGIST_ICON_TXT ={
  ICON1_TITLE:" Grow your Business",
  ICON1_DES: " Sell to buyers anytime, anywhere",
  ICON2_TITLE: "Zero Cost",
  ICON2_DES1: "No commission",
  ICON2_DES2:"transaction fee",
  ICON3_TITLE:" Manage Business Easily",
  ICON3_DES: "Lead Management System & other features",
}
 
 export const SELLER_REGISTER_TXT = {
 SELLER_HEADIND1 :"Sell for free",
  SELLER_HEADING2:"on India’s largest ",
  SELLER_TEXT3:"online B2B marketplace",
 SELLER_REGISTER_TITLE:"Free Registration / Sign In",
  SELLER_LOGIN_BTN:"Login"
 }
