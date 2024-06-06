import Aside from '@/components/vendorDashboard/Aside'
import Homepage from '@/components/vendorDashboard/homePage'
import React from 'react'

const VendorDashboardPage = () => {
  return (
    <div className='flex w-full'>
      <Aside />
      <Homepage/>
    </div>
  )
}

export default VendorDashboardPage;