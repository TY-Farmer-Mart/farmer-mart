import Navbar from '@/components/common/Navbar'
import SellerPage from '@/features/seller/SellerPage'
import SellerRegistration from '@/features/seller/SellerRegistration'
function SellerLanding() {
  return (
    <>
    <Navbar/>
    <SellerRegistration/>   
    <SellerPage/> 
    </>
  )
}

export default SellerLanding