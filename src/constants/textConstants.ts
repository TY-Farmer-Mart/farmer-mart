import { Service } from "@/types/authTypes";
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


