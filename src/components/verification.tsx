"use client"
import React, { useState, useRef, useEffect } from 'react';
import bg from '../images/BG-st-2.svg'
import bgg from '../images/BG-secondtype.svg'
import logo from '../images/Union (2).svg'
// import Image from 'next/image'
import InputVer from '@/component/inputVer'
import Button from '@/component/button';
import arrowRight from '../images/arrow-right (1).svg'
import verfied from '../images/icons8-verified-100 1.svg'


const Verification = () => {
    const someRef = useRef<HTMLInputElement>(null);
    const [inputs, setInputs] = useState<Array<React.RefObject<HTMLInputElement>>>([]);
    const [focusedIndex, setFocusedIndex] = useState<number>(0);
    const [openSus, setOpenSus] = useState(false);


    const handleOpen = () => {
        setOpenSus(!openSus)

    }

    // Specify the type of 'focusedIndex'
    const handleInputFilled = (value: string) => {
        // Update input value and move focus (if possible)
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
        // Focus the first input on initial render
        if (inputs.length > 0 && inputs[0] && inputs[0]?.current) {
            inputs[0].current.focus();
        }
    }, [inputs]);
    return (
        <div style={{
            backgroundImage: `url(${bgg.src})`,
            width: '100%',
            height: '100vh',
            backgroundRepeat: "no-repeat",
            backgroundPosition: 'right',
        }} className={openSus ? 'top-0 left-0 duration-100 ease-in-out z-[100] fixed inset-0 bg-black/40' : 'outer-container'}>
            <section className={openSus ? 'relative bg-gradient-to-r from-gray-800 to-gray-900 h-[100vh] w-[100vw] overflow-hidden' : 'bg-left flex justify-center  w-full bg-gradient-to-r relative inner-container h-[100vh]'} style={{
                backgroundImage: `url(${bgg.src})`,
                width: '100%',
                height: '100vh',
                backgroundRepeat: "no-repeat",
                backgroundPosition: 'left',
            }} >
                <div className='sm:flex justify-center sm:w-fit  md:mt-[1rem] mt-[0.5rem]'>
                    <div className='absolute left-[3%] md:top-2 top-3 justify-center items-center flex-col max-[340px]:hidden'>
                        {/* <Image src={logo} alt='' width={120} height={120} className='md:w-[120px] md:h-[120px] sm:w-[55px] sm:h-[55px] w-[70px] h-[70px]' /> */}
                        <p className='md:text-[20px] text-[15px] font-[700] max-[340px]:text-[13px]'>Uniclique</p>
                    </div>
                </div>
                <div className='flex w-full justify-center items-center md:mt-[1.5rem] mt-[0.1rem] flex-col '>
                    <div className={ openSus ? 'mt-[5rem]' :'flex items-center flex-col mt-[0.2rem]'}>
                        <h1 className='md:text-[3.5rem] text-[2.5rem] font-fold font-[700] flex gap-1 items-center'>Verification</h1>
                        <h2 className='md:text-[1rem] text-[.8rem] text-color1 font-[500] tracking-[0rem] md:tracking-[0.12rem] md:w-[75%] w-[85%] text-center'>Enter Your Verification Code</h2>
                    </div>
                    <div className="flex w-full justify-center md:gap-10 gap-5 items-center md:mt-[1.5rem] mt-[0.75rem]">
                        {Array(5)
                            .fill(null)
                            .map((_, index) => (
                                <InputVer
                                    key={index}
                                    onInputFilled={handleInputFilled}
                                    ref={someRef} 
                                />
                            ))}
                    </div>

                    <div className='flex justify-end items-end mt-[0.7rem] md:w-[43%] w-[80%] sm:[70%] max-w-full:'>
                        <p className='text-[13px] font-bold '>
                            04:59
                        </p>
                    </div>
                    <div className='flex md:justify-start md:text-start md:items-start mt-[0.4rem] justify-center items-center text-center'>
                        <p className='md:w-[50%] w-[80%] md:text-[12px] text-[12px] font-bold flex justify-items-start'>We sent a verification code to
                            your email james********@gmail.com.
                            You can check your inbox.
                        </p>
                    </div>
                    <p className='text-[13px] items-center flex text-center md:mt-[2rem] mt-[1rem] mb-[1rem]'>I didn&apos;t receive the code? <span className='font-fold font-[700] cursor-pointer'>Send again</span></p>
                    <div className='flex justify-center items-center px-[3rem] py-2 gap-2 bg-color1 pointer text-white mb-[2rem] mt-[1rem] rounded-3xl cursor-pointer' onClick={handleOpen}>
                        <p className=''>Next</p>
                        {/* <Image src={arrowRight} alt='' width={20} height={20} className='' /> */}
                    </div>
                </div>

                {openSus && (
                    <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/50 p-2 md:p-0">
                        <div className="bg-white shadow-2xl rounded-[20px] p-4 flex flex-col gap-4 justify-center items-center">
                            {/* <Image src={verfied} alt="" width={120} height={120} /> */}
                            <p className="text-[18px] text-center font-bold md:w-[70%] w-[80%]">Your email has successfully been verified</p>
                            <p className="text-[17px] text-center md:w-[80%] w-[90%]">You&apos;ll be redirected to the login page shortly</p>
                            <Button text="Done" style={{ marginBottom: "20px", borderRadius: "2rem", backgroundColor: "#590209", fontSize: "12px", font: 'bold', padding: "15px", color: '#fff', width: "70%", }} onClick={handleOpen} />
                        </div>
                    </div>
                )}
            </section>

        </div>
    )
}

export default Verification
