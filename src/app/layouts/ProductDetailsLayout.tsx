import Footer from "@/components/common/Footer"
import Navbar from "@/components/common/Navbar"
import ProductListView from "@/features/productDetails/ProductListView"


function ProductDetailsLayout() {
  return (
    <div>
       <Navbar/>
      <ProductListView/>
      <Footer/>
    </div>
  )
}

export default ProductDetailsLayout
