// import heroImag from "@/assets/images/Investor-banner.webp";
// import BannerSection from "./BannerSection";

// const Hero = () => {
//   return (
//     <div>
//       <img
//         src={heroImag}
//         alt="heroImag"
//         className="object-fit w-full py-2 rounded-md"
//       />
//       <BannerSection />
//     </div>
//   );
// };

// export default Hero;

import BannerSection from "./BannerSection";

const Hero = () => {
  return (
    <section className="bg-green-50">
      <BannerSection />
    </section>
  );
};

export default Hero;
