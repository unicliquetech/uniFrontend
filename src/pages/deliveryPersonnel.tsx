import Aside from '@/components/vendorDashboard/Aside'
import DeliveryPersonnel from '@/components/vendorDashboard/deliveryPersonnel'
import React from 'react'

const DeliveryPersonnelPage = () => {
  return (
    <div className='flex w-full'>
      <Aside />
      <DeliveryPersonnel/>
    </div>
  )
}

export default DeliveryPersonnelPage;