// import { IoNewspaperOutline, IoPersonCircleSharp } from "react-icons/io5";

// import { CiLocationOn } from "react-icons/ci";
// import { LuCalendarCheck, LuPanelTop } from "react-icons/lu";
// import { RiStarSmileLine } from "react-icons/ri";
// import { MdEdit, MdLanguage, MdOutlineAccountBox, MdSwitchAccount } from "react-icons/md";
// import { ProfileCardProps } from "@/types/profileTypes";
// import { PROFILE_PAGE_TXT } from "@constants/textConstants";

// const ProfileCard: React.FC<ProfileCardProps> = ({
//   name,
//   location,
//   memberSince,
//   rating,
// }) => {
//   return (
//     <div className="relative flex flex-col md:flex-row flex-wrap  items-center md:items-center justify-center md:justify-between  bg-white rounded-lg shadow-md p-4 sm:p-6 md:p-8 gap-6 w-full text-center md:text-left">
//       <div className="absolute top-4 right-4 flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm font-medium">
//         <MdEdit />
//         {PROFILE_PAGE_TXT.EDIT_BTN}
//       </div>

//       <div className="flex flex-col sm:flex-row items-center md:items-center justify-center md:justify-start text-center md:text-left gap-4">
//         <IoPersonCircleSharp className="w-24 h-24 text-gray-500" />
//         <div className="flex flex-col">
//           <p className="text-lg font-semibold text-black">{name}</p>
//           <div className="flex items-center justify-center md:justify-start gap-2 text-gray-600 mt-1">
//             <CiLocationOn className="w-7 h-6" />
//             <span className="font-medium text-gray-500  ">{location}</span>
//           </div>
//         </div>
//       </div>

//       <div className="flex items-center gap-3 flex-wrap">
//         <LuCalendarCheck className="w-8 h-8  text-green-300 bg-gray-200" />
//         <div className="flex flex-col">
//           <span className="text-sm font-semibold text-gray-700">
//             {PROFILE_PAGE_TXT.MEMBER}
//           </span>
//           <span className="text-left font-bold">{memberSince}</span>
//         </div>
//       </div>

//       <div className="flex flex-col items-center md:items-start justify-center text-center md:text-left gap-4 md:mr-10">
//         <div className="flex items-center gap-2 flex-wrap">
//           <RiStarSmileLine className="w-6 h-8 text-blue-300 bg-gray-200" />
//           <span>{rating}</span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProfileCard;

// import { TbDeviceMobileStar } from "react-icons/tb";
// import { RiMailStarLine } from "react-icons/ri";
// import { ContactInfoProps } from "@/types/profileTypes";

// export const ContactInfoCard: React.FC<ContactInfoProps> = ({
//   mobile,
//   email,
//   address,
//   altMobile,
//   altEmail,
//   onEdit,
// }) => {

//   return (
//     <div className="relative bg-white rounded-lg shadow-md  px-3 py-4 mt-4">
//       <div className="flex justify-between items-center border-b pb-3 mb-4">
//         <h2 className="text-lg font-semibold text-gray-800 p-2">
//           {PROFILE_PAGE_TXT.CONTACT_INFO}
//         </h2>
//         <div
//           onClick={onEdit}
//           className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm font-medium"
//         >
//           <MdEdit /> {PROFILE_PAGE_TXT.EDIT_BTN}
//         </div>
//       </div>

//       <div className="flex flex-col sm:flex-row flex-wrap justify-start gap-8 sm:gap-16 lg:gap-64">
//         <div className="flex flex-col  items-start space-y-10 p-5">
//           <div className="flex items-start gap-3">
//             <div className="w-8 flex justify-start">
//               <TbDeviceMobileStar className="w-16 h-10 bg-gray-200 text-green-400" />
//             </div>

//             <div className="flex flex-col">
//               <span className="text-sm font-semibold text-gray-700">
//                 {PROFILE_PAGE_TXT.PRIMARY_MOB}
//               </span>
//               <span className="text-sm text-gray-600">{mobile}</span>
//             </div>
//           </div>
//           <div className="flex items-start gap-3">
//             {/* Icon */}
//             <div className="w-8 flex justify-start">
//               <RiMailStarLine className="w-14 h-10 text-blue-300 bg-gray-200 " />
//             </div>

//             <div className="flex flex-col">
//               <span className="text-sm font-semibold text-gray-700">
//                 {PROFILE_PAGE_TXT.PRIMARY_MAIL}
//               </span>
//               <span className="text-sm text-gray-600">{email}</span>
//             </div>
//           </div>
//           <div className="flex items-start gap-3">
//             <div className="w-8 flex justify-start">
//               <CiLocationOn className="w-7 h-8 bg-gray-200 text-green-400 " />
//             </div>

//             <div className="flex flex-col">
//               <span className="text-sm font-semibold text-gray-700  text-left">
//                 {PROFILE_PAGE_TXT.ADDRESS}
//               </span>
//               <span className="text-sm text-gray-600">{address}</span>
//             </div>
//           </div>
//         </div>

//         <div className="flex flex-col space-y-10 p-5">
//           {altMobile && (
//             <div className="flex items-start gap-3">
//               <div className="w-8 flex justify-center">
//                 <TbDeviceMobileStar className="w-16 h-11  text-blue-300 bg-gray-200" />
//               </div>

//               <div className="flex flex-col">
//                 <span className="text-sm font-semibold text-gray-700">
//                   {PROFILE_PAGE_TXT.ALT_MOB}
//                 </span>
//                 <span className="text-sm text-gray-600">{mobile}</span>
//               </div>
//             </div>
//           )}
//           {altEmail && (
//             <div className="flex items-start gap-3">
//               {/* Icon */}
//               <div className="w-8 flex justify-center">
//                 <RiMailStarLine className="w-14 h-10 bg-gray-200 text-green-400 " />
//               </div>

//               <div className="flex flex-col">
//                 <span className="text-sm font-semibold text-gray-700">
//                   {PROFILE_PAGE_TXT.ALT_MAIL}
//                 </span>
//                 <span className="text-sm text-gray-600">{altEmail}</span>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// //Company card
// import { MdBusiness } from "react-icons/md";

// import { FaFacebook } from "react-icons/fa";
// import { AiFillGoogleCircle, AiOutlineLink } from "react-icons/ai";
// import { FaSquareInstagram } from "react-icons/fa6";
// import { CompanyInfoProps } from "@/types/profileTypes";

// export const CompanyInformationCard: React.FC<CompanyInfoProps> = ({
//   companyName,

//   gstNumber,
//   companyAddress,
//   ownerName,
//   onEdit,
// }) => {

//   return (
//     <div className="relative bg-white rounded-lg shadow-md px-3 py-4 mt-4">
//       <div className="flex justify-between items-center border-b pb-3 mb-4">
//         <h2 className="text-lg font-semibold text-gray-800 p-2  ">
//           {PROFILE_PAGE_TXT.COMPANY_INFO}
//         </h2>
//         <div
//           onClick={onEdit}
//           className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm font-medium"
//         >
//           <MdEdit />
//           {PROFILE_PAGE_TXT.EDIT_BTN}
//         </div>
//       </div>

//       <div className="flex flex-col sm:flex-row flex-wrap justify-start gap-8 sm:gap-12 lg:gap-18">
//         <div className="flex flex-col items-start space-y-6 sm:space-y-8 p-2 sm:p-4 md:p-5">
//           <div className="flex items-start gap-3">
//             <div className="w-8 flex justify-start">
//               <MdBusiness className="w-8 h-8 text-green-500 bg-gray-200" />
//             </div>
//             <div className="flex flex-col items-start">
//               <span className="text-sm font-semibold text-gray-700">
//                 {PROFILE_PAGE_TXT.COMPANY_NAME}
//               </span>
//               <span className="text-sm text-gray-600">{companyName}</span>
//             </div>
//           </div>

//           <div className="flex items-start gap-3">
//             <div className="w-8 flex justify-start">
//               <IoNewspaperOutline className="w-8 h-8 text-blue-400 bg-gray-200" />
//             </div>
//             <div className="flex flex-col items-start">
//               <span className="text-sm font-semibold text-gray-700">
//                 {PROFILE_PAGE_TXT.GST}
//               </span>
//               <span className="text-sm text-gray-600">{gstNumber}</span>
//             </div>
//           </div>

//           <div className="flex items-start gap-3">
//             <div className="flex items-start gap-3">
//               <div className="w-8 flex justify-start">
//                 <AiOutlineLink className="w-6 h-6 text-blue-500 bg-gray-200" />
//               </div>

//               <div className="flex flex-col items-start">
//                 <div className="flex flex-wrap items-center gap-3 sm:gap-4 md:gap-6 mt-2">
//                   <div className="flex items-center gap-2">
//                     <FaFacebook className="text-blue-950 w-5 h-5" />
//                     <span className="text-sm text-gray-600">
//                       {PROFILE_PAGE_TXT.FB}
//                     </span>
//                   </div>

//                   <div className="flex items-center gap-2">
//                     <FaSquareInstagram className="text-pink-500 w-5 h-5 " />
//                     <span className="text-sm text-gray-600">
//                       {PROFILE_PAGE_TXT.IG}
//                     </span>
//                   </div>

//                   <div className="flex items-center gap-2">
//                     <AiFillGoogleCircle className="text-blue-800  w-5 h-5" />
//                     <span className="text-sm text-gray-600">
//                       {PROFILE_PAGE_TXT.GL_BUSINESS}
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="flex flex-col items-start space-y-10 p-5">
//           <div className="flex items-start gap-3 ">
//             <div className="w-8 flex justify-start ">
//               <MdLanguage className="w-7 h-8 text-blue-500 bg-gray-200" />
//             </div>
//             <div className="flex flex-col items-start">
//               <span className="text-sm font-semibold text-gray-700">
//                 {PROFILE_PAGE_TXT.WEBSITE}
//               </span>
//               <span className="text-sm text-gray-600">{companyAddress}</span>
//             </div>
//           </div>

//           <div className="flex items-start gap-3">
//             <div className="w-8 flex justify-start">
//               <LuPanelTop className="w-6 h-6 text-green-400 bg-gray-200" />
//             </div>
//             <div className="flex flex-col items-start">
//               <span className="text-sm font-semibold text-gray-700">
//                 {PROFILE_PAGE_TXT.PAN}
//               </span>
//               <span className="text-sm text-gray-600">{ownerName}</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// import { BsBank2 } from "react-icons/bs";

// import { BankAccountDetailsProps } from "@/types/profileTypes";
// import { VscCodeOss } from "react-icons/vsc";
// export const BankAccountDetailsCard: React.FC<BankAccountDetailsProps> = ({
//   bankName,
//   accountNumber,
//   ifscCode,
//   accountType,
//   onEdit,
// }) => {
//   return (
//     <div className="relative bg-white rounded-lg shadow-md px-3 py-4 mt-4">
//       <div className="flex justify-between items-center border-b pb-3 mb-4">
//         <h2 className="text-lg font-semibold text-gray-800 p-2">
//           {PROFILE_PAGE_TXT.BANK_ACC}
//         </h2>
//         <div
//           onClick={onEdit}
//           className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm font-medium cursor-pointer"
//         >
//           <MdEdit /> {PROFILE_PAGE_TXT.EDIT_BTN}
//         </div>
//       </div>

//       <div className="flex flex-col sm:flex-row flex-wrap justify-start gap-8 sm:gap-16 lg:gap-64">
//         <div className="flex flex-col items-start space-y-10 p-5">
//           <div className="flex items-start gap-3">
//             <div className="w-8 flex justify-start">
//               <VscCodeOss className="w-8 h-8 text-green-400 bg-gray-200 rounded-md p-1" />
//             </div>
//             <div className="flex flex-col">
//               <span className="text-sm font-semibold text-gray-700 text-left">
//                 {PROFILE_PAGE_TXT.IFSC}
//               </span>
//               <span className="text-sm text-gray-600">{ifscCode}</span>
//             </div>
//           </div>

//           <div className="flex items-start gap-3">
//             <div className="w-8 flex justify-start">
//               <BsBank2 className="w-8 h-8 text-blue-500 bg-gray-200 rounded-md p-1" />
//             </div>
//             <div className="flex flex-col">
//               <span className="text-sm font-semibold text-gray-700 text-left">
//                 {PROFILE_PAGE_TXT.BANK_NAME}
//               </span>
//               <span className="text-sm text-gray-600">{bankName}</span>
//             </div>
//           </div>
//         </div>

//         <div className="flex flex-col items-start space-y-10 p-5">
//           <div className="flex items-start gap-3">
//             <div className="w-8 flex justify-start">
//               <MdOutlineAccountBox className="w-8 h-8 text-blue-500 bg-gray-200 rounded-md p-1" />
//             </div>
//             <div className="flex flex-col">
//               <span className="text-sm font-semibold text-gray-700">
//                 {PROFILE_PAGE_TXT.ACC_NUM}
//               </span>
//               <span className="text-sm text-gray-600 text-left">
//                 {accountNumber}
//               </span>
//             </div>
//           </div>

//           <div className="flex items-start gap-3">
//             <div className="w-8 flex justify-start">
//               <MdSwitchAccount className="w-8 h-8 text-green-400 bg-gray-200 rounded-md p-1" />
//             </div>
//             <div className="flex flex-col">
//               <span className="text-sm font-semibold text-gray-700">
//                 {PROFILE_PAGE_TXT.ACC_TYPE}
//               </span>
//               <span className="text-sm text-gray-600 text-left">
//                 {accountType}
//               </span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
