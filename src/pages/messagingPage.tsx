import Aside from '@/components/vendorDashboard/Aside'
import Messaging from '@/components/vendorDashboard/messages'
import React from 'react'

const MessagingPage = () => {
  return (
    <div className='flex w-full'>
      <Aside />
      <Messaging/>
    </div>
  )
}

export default MessagingPage;