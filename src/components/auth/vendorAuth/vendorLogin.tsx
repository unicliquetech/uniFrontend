"use client"
import React, { useState, ChangeEvent } from 'react'
import Input from '@/component/Input'
import Image from 'next/image'
import eyelock from '@/images/eye-off.svg'
import Button from '@/component/button'
import google from '@/images/Group 11.svg'
import bg from '@/images/Group12.png'
import bgg from '@/images/Group9.svg'
import logo from '@/images/Union (2).svg'
import { useRouter } from 'next/navigation'
import eyeOpen from '@/images/eye-off (1).svg'
import axios from 'axios'

interface FormData {
  email: string
  password: string
}

const LoginVendor = () => {
  const router = useRouter()
  const [passwordVis, setPasswordVis] = useState<boolean>(false)
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
  })
  const [error, setError] = useState('');

  const PasswordVis = () => {
    setPasswordVis((prev) => !prev)
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const response = await axios.post('https://unibackend.onrender.com/api/v1/vendor/login', formData)
      const { token } = response.data

      // Store the token in localStorage or a cookie
      localStorage.setItem('token', token)


      // Redirect to the desired page or show a success message
      router.push('/')
    } catch (err) {
      console.error('Login error:', err)
      setError('Invalid email or password. Please try again.');
    }
  }


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

  return (
    <div style={{
      backgroundImage: `url(${bgg.src})`,
      width: '100%',
      height: '100vh',
      backgroundRepeat: "no-repeat",
      backgroundPosition: 'left',
    }} className='outer-container'>
      <section className='bg-left flex justify-center w-full bg-gradient-to-r relative inner-container h-[100vh]' style={{
        backgroundImage: `url(${bgg.src})`,
        width: '100%',
        height: '100vh',
        backgroundRepeat: "no-repeat",
        backgroundPosition: 'right'
      }} >
        <div className='sm:flex justify-center sm:w-fit mt-[2rem] items-center w-[90%]'>
          <div className='absolute left-[3%] md:top-2 top-3 justify-center items-center flex-col max-[420px]:hidden'>
            <Image src={logo} alt='' width={120} height={120} className='md:w-[120px] md:h-[120px] sm:w-[55px] sm:h-[55px] w-[60px] h-[60px]' />
            <p className='md:text-[20px] text-[15px] font-[700] max-[420px]:text-[12px]'>Uniclique</p>
          </div>

          <div className='flex items-center justify-center w-full flex-col h-screen'>
            <h1 className='md:text-[2.5rem] text-[1.5rem] font-fold font-[700]'>Welcome Back! <span>👋</span></h1>
            <h2 className='md:text-[1rem] text-[.8rem] text-color1 font-[500]'>Please sign into your account</h2>
            <div className='mt-[1rem] p-6 rounded-lg shadow-lg shadow-cyan-500/50 max-w-[100%]  sm:w-[450px] bg-white w-full' >
              <div className='flex flex-col gap-7'>
              <form onSubmit={handleLogin}>
              <input
                    placeholder="Email Address"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    style={{
                      borderBottomColor: '#590209',
                      borderBottomWidth: 2,
                      width: '100%',
                      padding: '10px',
                      marginTop: '1.5rem',
                      cursor: 'pointer',
                    }}
                  />
                <div className='flex relative justify-center items-center'>
                  <input placeholder="Password"
                      type={passwordVis ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                    style={{ borderBottomColor: '#590209', borderBottomWidth: 2, width: '100%', padding: "10px" }} />
                  <Image src={passwordVis ? eyeOpen : eyelock} alt='' width={15} height={15} onClick={PasswordVis} className='absolute right-[2%] flex justify-center items-center ' />
                </div>
                <p className='text-[0.6rem] text-color1 font-bold font-fold flex justify-end cursor-pointer mt-[-13px]' onClick={() => router.push('/forgottenPasVen')} >Forgot Password?</p>
                <div className='flex w-full justify-center items-center'>
                <Button
                      style={{
                        backgroundColor: '#590209',
                        fontSize: '12px',
                        font: 'bold',
                        padding: '15px',
                        color: '#fff',
                        width: '90%',
                      }}
                      text="Sign In"
                      type="submit"
                    />

                </div>
                </form>
            <div className='flex w-[100%] max-w-[100%] justify-center items-center'>
                  <div className='flex gap-2 items-center p-1 border-2 border-color1 justify-center w-[90%] mt-[-10px] cursor-pointer'>
                    <Image src={google} alt='' width={40} height={40} />
                    <p className='text-[0.7rem] cursor-pointer'>Sign In with Google</p>
                  </div>
                </div>
                <div className='flex justify-center items-center mt-[-18px] mb-[2rem] opacity '>
                  <p className='text-[10px]'>Need an account? <button className='font-bold' onClick={() => router.push('/signUpVen')}>Create an account</button></p>
                </div>
          </div>
          </div>
          </div>
        </div>
      </section>
    </div>

  )
}

export default LoginVendor;