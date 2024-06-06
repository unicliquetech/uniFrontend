import React from 'react'
import Order from '@/components/vendorDashboard/orderPage'
import Aside from '@/components/vendorDashboard/Aside'


const VendorOrdersPage = () => {
  return (
    <div className='flex w-full'>
      <Aside />
      <Order />
    </div>
  )
}

export default VendorOrdersPage;