import { Service } from "@/types/authTypes";
import { Star, Store, Smartphone, Calculator } from "lucide-react";



export const APP_NAME = "FarmerMart";

export const AUTH_TEXT = {
  LOGIN_TITLE: "Login to your account",
  REGISTER_TITLE: "Create your account",
  TITLE: "Login",
  SUBTITLE: "Log in to continue to your dashboard",
  EMAIL: "Email",
  PASSWORD: "Password",
  REMEMBER_ME: "Remember me",
  FORGOT_PASSWORD: "Forgot password?",
  CONTINUE_WITH_GOOGLE: "Continue with Google",
  CONTINUE_WITH_APPLE: "Continue with Apple",
  SOCIAL: "OR Login with",
  FOOTER: "Don’t have an account?",
  FOOTER_LINK: "Sign up",
  LOGIN: "Login to your account",
  SIGNUP_BUTTON: "Sign Up",
  NAME_LABEL: "Full Name",
  NAME_PLACEHOLDER: "Enter your full name",
  PHONE_LABEL: "Phone Number",
  PHONE_PLACEHOLDER: "Enter your phone number",
  EMAIL_LABEL: "Email Address",
  EMAIL_PLACEHOLDER: "Enter your email",
  ROLE_LABEL: "Role",
  ROLE_PLACEHOLDER: "Select your role",
  GST_LABEL: "GST Number",
  GST_PLACEHOLDER: "Enter your GST number",
  PASSWORD_LABEL: "Password",
  PASSWORD_PLACEHOLDER: "Enter your password",
  CONFIRM_PASSWORD_LABEL: "Confirm Password",
  CONFIRM_PASSWORD_PLACEHOLDER: "Re-enter your password",
  ABOUT_LABEL: "About",
  ABOUT_PLACEHOLDER: "Tell us about yourself...",
  AUTH_HEADER: "Empower Your Farm With",
  AUTH_SUBHEADING: "Essential Supplies",
  AUTH_ENDING: " Management.",
  AUTH_FOOTER: `Find everything you need 
  seeds, fertilizers. tools, and aid more – to 
  grow other to successful harvest.`,
} as const;

export const DASHBOARD_TEXT = {
  DASHBOARD_CAROUSEL: "Categories You May Like",
  CAROUSEL_BUTTON: "Get Quotes",
  DASHBOARD_CART: "Buyer Testimonials",
};

export const MARKET_CATEGORY_PRODUCT = {
  VIEWALL_BUTTON: "View All",
};

export const MORE_FOR_YOU_TEXT = {
  HEADING: "More for You",
  SERVICES: [
    {
      TITLE: "Connect with verified sellers",
      DESCRIPTION:
        "Tell us your requirement & let our experts find verified sellers for you",
      BUTTON: "Get Verified Sellers",
    },
    {
      TITLE: "Sell on FarmMart for free",
      DESCRIPTION: "Reach out to more than 21+ crore buyers. Sell with us.",
      BUTTON: "Start Selling",
    },
    {
      TITLE: "Download our App",
      DESCRIPTION: "Get instant notifications on the go. Download our App Now",
      BUTTON: "Download Now",
    },
    {
      TITLE: "Tally on Mobile",
      DESCRIPTION:
        "With Live Keeping, SME's can now connect their Tally offline data to mobile app",
      BUTTON: "Know More",
    },
  ],
} as const;


export const SERVICES: Service[] = [
  {
    icon: Star,
    title: "Connect with verified sellers",
    description: "Tell us your requirement & let our experts find verified sellers for you",
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
    description: "With Live Keeping, SME's can now connect their Tally offline data to mobile app",
    buttonText: "Know More",
  },
]

export const HEADING = { heading: "More for you" } as const;




export const LANDING_TEXT = {
  HERO_TITLE: "Accounting Software",
  HERO_SUBTITLE:
    "Trusted by 3,60,000+ Small Businesses across different domains",
  FEATURES: [
    "GST Accounting Software",
    "e-Invoice Software",
    "Inventory Management Software",
    "e-Way Billing Software",
  ],
  GET_APP_TITLE: "Get FarmerMART App",
  GET_APP_SUBTITLE:
    "Search for products/services and connect with verified sellers on the go!",
  DOWNLOAD_INFO:
    "We will send you a link, open it on your phone to download the App",
  COMPANY_BADGE: {
    BUSY_LABEL: "Busy",
    BUSINESS: "BUSINESS",
    ACCOUNTING: "ACCOUNTING",
    SOFTWARE: "SOFTWARE",
    COMPANY_SUFFIX: "company",
    TRUSTED_BY: "Trusted by",
    COUNT: "3,60,000+",
    SMALL_BUSINESS: "Small Businesses across different domains",
  },
  STORE_LABELS: {
    APP_STORE_TOP: "Download on the",
    APP_STORE_BOTTOM: "App Store",
    PLAY_STORE_TOP: "GET IT ON",
    PLAY_STORE_BOTTOM: "Google Play",
  },
  PLACEHOLDERS: {
    MOBILE_NUMBER: "Enter Mobile Number",
  },
  BUTTONS: {
    SEND_LINK: "Send me the link",
  },
  ALERT_PREFIX: "Link will be sent to +91",
} as const;
export const MARKET_TEXT = {
  LOGO: "FarmerMart",
  REGISTERBTN: "Register",
  LOGINBTN: "Login",
  EMPOWERING_TAG: "Empowering Farmers to Sell Their Products Online 🚜",
  HERO_TEXT: "We connect Buyers & Sellers",
  HERO_SUB:
    "FarmMART is India's largest online B2B marketplace, connecting buyers with suppliers",
  TITLE_ICON1: "Trusted Platform",
  TITLE_ICON2: "Safe & Secure",
  TITLE_ICON3: "Quick Assistance",
  SUBMIT_BUTTON: "Submit Your Requirement",
};

export const REQUIREMENTFORM_TEXT = {
  TITLE1: "Tell us what you need, and we'll help you get quotes",
  TITLE2: "I want quotes for",
  BUTTON_TEXT: "Submit Requirement",
};
export const ROLE_OPTIONS = [
  { label: "Admin", value: "admin" },
  { label: "User", value: "user" },
  { label: "Vendor/Farmer", value: "vendor" },
  { label: "Consultant", value: "consultant" },
] as const;

export const GO_BUTTON_TEXT = "Go";


export const NAVBAR_TEXT = {
  searchPlaceholder: "Search for product or service",
  defaultLocation: "Bengaluru",
  getBestPrice: "Get Best Price",
  signIn: "Sign In",
  login: "Login",
  navOptions: [
    { label: "Export", value: "export" },
    { label: "Sell", value: "sell" },
    { label: "Help", value: "help" },
  ] as const,
} as const;
