"use client"
import React, { useState, useRef, useEffect } from 'react';
import jwt from 'jsonwebtoken'
import bg from '@/images/BG-st-3.svg'
import bgg from '@/images/BG-secondtype.svg'
import logo from '@/images/Union (2).svg'
import Image from 'next/image'
import InputVer from '@/component/inputVer'
// import Button from '@/component/button';
import arrowRight from '@/images/arrow-right (1).svg'
// import verfied from '@/images/icons8-verified-100 1.svg'
import { useRouter } from 'next/navigation'
import axios from 'axios';

function showCustomAlert(message: string) {
  const alertContainer = document.createElement('div');
  alertContainer.classList.add('custom-alert');

  const alertHeader = document.createElement('div');
  alertHeader.classList.add('custom-alert-header');
  alertHeader.textContent = 'Alert';

  const alertBody = document.createElement('div');
  alertBody.classList.add('custom-alert-body');
  alertBody.textContent = message;

  alertContainer.appendChild(alertHeader);
  alertContainer.appendChild(alertBody);

  document.body.appendChild(alertContainer);

  setTimeout(() => {
    document.body.removeChild(alertContainer);
  }, 100000); // Adjust the duration (in milliseconds) to control how long the alert should be displayed
}


interface ApiResponse {
  message?: string;
  error?: string;
}

const EmailVerification = () => {
  const someRef = useRef<HTMLInputElement>(null);
  const [inputs, setInputs] = useState<Array<React.RefObject<HTMLInputElement>>>([]);
  const [focusedIndex, setFocusedIndex] = useState<number>(0);
  const [openSus, setOpenSus] = useState(false);
  const [otp, setOtp] = useState('');
  const [apiResponse, setApiResponse] = useState<ApiResponse | null>(null);

  const router = useRouter()


  const getEmailHeaders = () => {
    const email = localStorage.getItem('email');

    if (!email) {
      showCustomAlert("Error occurred. Please proceed to re-signup.");
      window.location.href = '/signup';
      throw new Error('Invalid auth token');
    }
    return {
      headers: {
        'email': email,
      },
    };
  };

  const handleInputFilled = (value: string) => {
    setOtp(prevOtp => prevOtp + value);

    if (focusedIndex < inputs.length - 1) {
      const nextInput = inputs[focusedIndex + 1];
      if (nextInput && nextInput.current) {
        nextInput.current.value = value;
        nextInput.current.focus();
        setFocusedIndex(prevIndex => prevIndex < inputs.length - 1 ? prevIndex + 1 : prevIndex);
      }
    }
  };

  const handleInputRef = (ref: React.RefObject<HTMLInputElement>) => {
    setInputs((prevInputs) => [...prevInputs, ref]);
  };

  useEffect(() => {
    if (inputs.length > 0 && inputs[0] && inputs[0]?.current) {
      inputs[0].current.focus();
    }
  }, [inputs]);

  const handleVerifyEmail = async () => {
    try {
      const response = await axios.post('https://unibackend-4ebp.onrender.com/api/v1/user/verify-email', { otp }, );
      setApiResponse(response.data);
      if (response.data.message === 'Email verified successfully') {
        router.push('/login');
      }
    } catch (error) {
      console.error('Error verifying email:', error);
      setApiResponse({ error: 'An error occurred' });
    }
  };

  const handleresendEmail = async () => {
    try {
      const headers = getEmailHeaders();
      const response = await axios.post('https://unibackend-4ebp.onrender.com/api/v1/user/resend-otp', null, headers);
      setApiResponse(response.data);
      if (response.data.message === 'OTP sent to Email') {
        router.push('/verify');
      }
    } catch (error) {
      console.error('Error sending email:', error);
      setApiResponse({ error: 'An error occurred' });
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${bg.src})`,
        width: '100%',
        height: '100vh',
        backgroundRepeat: "no-repeat",
        backgroundPosition: 'right',
      }}
      className={openSus ? 'top-0 left-0 duration-100 ease-in-out z-[100] fixed inset-0 bg-black/40' : 'outer-container'}
    >
      <section
        className={openSus ? 'relative bg-gradient-to-r from-gray-800 to-gray-900 h-[100vh] w-[100vw] overflow-hidden' : 'bg-left flex justify-center  w-full bg-gradient-to-r relative inner-container h-[100vh]'}
        style={{
          backgroundImage: `url(${bgg.src})`,
          width: '100%',
          height: '100vh',
          backgroundRepeat: "no-repeat",
          backgroundPosition: 'left',
        }}
      >
        <div className='sm:flex justify-center sm:w-fit  md:mt-[1rem] mt-[0.5rem]'>
          <div className='absolute left-[3%] md:top-2 top-3 justify-center items-center flex-col max-[340px]:hidden'>
            <Image src={logo} alt='' width={120} height={120} className='md:w-[120px] md:h-[120px] sm:w-[55px] sm:h-[55px] w-[70px] h-[70px]' />
            <p className='md:text-[20px] text-[15px] font-[700] max-[340px]:text-[13px]'>Uniclique</p>
          </div>
        </div>
        <div className='flex w-full justify-center items-center md:mt-[1rem] mt-[0.1rem] flex-col '>
          <div className={openSus ? 'mt-[5rem]' : 'flex items-center flex-col mt-[0.2rem]'}>
            <h2 className=' text-center font-mon'><b>Email Verification</b></h2>

            {apiResponse && (
            <div className="mt-4">
              {apiResponse.message && <p className="text-green-500">{apiResponse.message}</p>}
              {apiResponse.error && <p className="text-red-500">{apiResponse.error}</p>}
            </div>
          )}
          
            <h4 className=' text-center font-mon md-2'><b>Enter your OTP code here</b></h4>
          </div>
          <div className="flex w-6 justify-center md:gap-10 gap-5 items-center md:mt-[2.5rem] mt-[2.75rem]">
            {Array(5)
              .fill(null)
              .map((_, index) => (
                <InputVer
                  key={index}
                  onInputFilled={handleInputFilled}
                //   ref={handleInputRef}
                />
              ))}
          </div>
          <button
            className='flex justify-center mt-[2rem] items-center  bg-color-red pointer text-color1  rounded-3xl cursor-pointer'
            onClick={handleVerifyEmail}
          > Next
            {/* <Image src={arrowRight} alt='' width={20} height={20} /> */} </button>

          <p className='md:text-[15px] text-[12px] text-color1 mt-[2rem]'>Didn&apos;t you receive any code?</p>
          <p className='md:text-[15px] text-[12px] text-color1 font-bold mt-[0.5rem]' onClick={handleresendEmail}>
            Resend a new code.</p>


          {apiResponse && (
            <div className="mt-4">
              {apiResponse.message && <p className="text-green-500">{apiResponse.message}</p>}
              {apiResponse.error && <p className="text-red-500">{apiResponse.error}</p>}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default EmailVerification