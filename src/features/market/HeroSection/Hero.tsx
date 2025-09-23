import heroImag from '@/assets/images/Investor-banner.webp';
import HeroSection from './HeroSection';


const Hero = () => {
  return (
    <div>
        <img src={heroImag} alt="heroImag" />
        <HeroSection/>
    </div>
  )
}

export default Hero