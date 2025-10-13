import Navbar from '@/components/common/Navbar'
import SellerPage from '@/features/seller/SellerPage'
import SellerBusinessDetails from '@/features/seller/SellerBusinessDetails'
// import SellerProductDetails from '@/features/seller/SellerProductDetails'
// import SellerRegistration from '@/features/seller/SellerRegistration'
function SellerLanding() {
  return (
    <>
    <Navbar/>
    {/* <SellerRegistration/>    */}
    <SellerBusinessDetails/>
    {/* <SellerProductDetails/> */}
    <SellerPage/> 
    </>
  )
}

export default SellerLanding