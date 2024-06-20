"use client"
import React, { useState, ChangeEvent } from 'react'
import Image from 'next/image'
import eyelock from '@/images/eye-off.svg'
// import Button from '@/component/button'
import bg from '@/images/Group12.png'
import bgg from '@/images/Group9.svg'
import logo from '@/images/Union (2).svg'
import emoji from '@/images/emojipng 1.svg'
import eyeOpen from '@/images/eye-off (1).svg'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import jwt from 'jsonwebtoken'


interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    style?: React.CSSProperties;
    text: string;
}

const Button: React.FC<ButtonProps> = ({ style, text, ...rest }) => {
    return (
        <button style={style} {...rest}>
            {text}
        </button>
    );
};

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


const SignUp = () => {
    const router = useRouter()
    const [passwordVisible, setPasswordVisible] = useState(false)
    const [confirmpasswordVisible, setConfirmPasswordVisible] = useState(false)
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        password: '',
        confirmPassword: '',
    })

    const togPasswordVis = () => {
        setPasswordVisible((prev) => !prev);
    };

    const togConfirm = () => {
        setConfirmPasswordVisible((prev) => !prev)
    }

    interface DecodedToken {
        email: string;
      }
    

    

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await axios.post('https://unibackend.onrender.com/api/v1/user/register', formData )
            console.log(response.data); // Handle the response as needed

            if (response.data.email) {
                localStorage.setItem('email', response.data.email);
                // You can also store other user information from the response if needed
              }

            router.push('/verify')
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div style={{
            backgroundImage: `url(${bg.src})`,
            width: '100%',
            height: '140vh',
            backgroundRepeat: "no-repeat",
            backgroundPosition: 'left',
        }} className='outer-container'>
            <section className='bg-left flex justify-center w-full bg-gradient-to-r relative inner-container h-[100vh]' style={{
                backgroundImage: `url(${bgg.src})`,
                width: '100%',
                height: '140vh',
                backgroundRepeat: "no-repeat",
                backgroundPosition: 'right'
            }} >
                <div className='sm:flex justify-center sm:w-fit w-[90%] mt-[3rem]'>
                    <div className='absolute left-[3%] md:top-2 top-3 justify-center items-center flex-col max-[420px]:hidden'>
                        <Image src={logo} alt='' width={120} height={120} className='md:w-[120px] md:h-[120px] sm:w-[55px] sm:h-[55px] w-[60px] h-[60px]' />
                        <p className='md:text-[20px] text-[15px] font-[700] max-[420px]:text-[12px]'>Uniclique</p>
                    </div>

                    <div className='flex items-center flex-col mt-[0rem]'>
                        <h1 className='md:text-[2.5rem] text-red-900 text-[1.5rem] font-fold font-[700] flex gap-1 items-center'>Get Started <Image src={emoji} alt='' width={50} height={50} /></h1>
                        <h2 className='md:text-[1rem] text-[.8rem] text-color1 font-[500]'>Create an account as a user.</h2>
                        <form onSubmit={handleSubmit}>
                            <div className='mt-[1rem] p-6 rounded-lg shadow-lg shadow-cyan-500/50 max-w-[100%] sm:w-[450px] bg-white w-full flex flex-col gap-7' >
                                <input
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleInputChange}
                                    placeholder="First Name"
                                    className="input-field"
                                />
                                <input
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleInputChange}
                                    placeholder="Last Name"
                                    className="input-field"
                                />
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    placeholder="Email Address"
                                    className="input-field"
                                />
                                <input
                                    type="text"
                                    name="phoneNumber"
                                    value={formData.phoneNumber}
                                    onChange={handleInputChange}
                                    placeholder="Phone No."
                                    className="input-field"
                                />
                                <div className='relative'>
                                    <input
                                        type={passwordVisible ? 'text' : 'password'}
                                        name="password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        placeholder="Password"
                                        className="input-field"
                                    />
                                    <Image src={passwordVisible ? eyeOpen : eyelock} alt='' width={15} height={15} onClick={togPasswordVis} className='absolute right-[2%] flex justify-center items-center top-[57%]' />
                                </div>
                                <div className='relative'>
                                    <input
                                        type={confirmpasswordVisible ? 'text' : 'password'}
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleInputChange}
                                        placeholder="Confirm Password"
                                        className="input-field"
                                    />
                                    <Image src={confirmpasswordVisible ? eyeOpen : eyelock} alt='' width={15} height={15} onClick={togConfirm} className='absolute right-[2%] flex justify-center items-center top-[57%]' />
                                </div>
                            </div>
                        <Button style={{ backgroundColor: "#590209", fontSize: "12px", font: 'bold', padding: "15px", color: '#fff', width: '90%', marginTop: "20px", borderRadius: '10px' }}
                            text='Sign Up'
                            type='submit' />
                        <Button style={{ backgroundColor: "#590209", fontSize: "12px", font: 'bold', padding: "15px", color: '#fff', width: '90%', marginTop: "2px", borderRadius: '10px' }} text='Already have an account? Sign In' onClick={() => router.push('/login')} />
                        </form>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default SignUp