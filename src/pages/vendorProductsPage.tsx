import React from 'react'
import VendorProducts from '@/components/vendorDashboard/productPage'
import Aside from '@/components/vendorDashboard/Aside'


const VendorProductsPage = () => {
  return (
    <div className='flex w-full'>
      <Aside />
      <VendorProducts />
    </div>
  )
}

export default VendorProductsPage;