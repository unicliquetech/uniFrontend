"use client";
import React, { useState } from 'react';
import axios from 'axios';
import Input from '../component/Input';
import Image from 'next/image';
import eyelock from '../images/eye-off.svg';
import Button from '../component/button';
import bg from '../images/Group12.png';
import bgg from '../images/Group9.svg';
import logo from '../images/Union (2).svg';
import Form from '../component/form';
import emoji from '../images/emojipng 1.svg';
import eyeOpen from '../images/eye-off (1).svg';
import { useRouter } from 'next/navigation';

const SignUp = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        password: '',
        confirmPassword: '',
    });

    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordVisible((prev) => !prev);
    };

    const toggleConfirmPasswordVisibility = () => {
        setConfirmPasswordVisible((prev) => !prev);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRegistration = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            console.error('Passwords do not match');
            return;
        }

        try {
            console.log('Form Data:', formData);
            const response = await axios.post('http://localhost:5000/api/v1/user/register', formData);

            // Handle the successful response
            if (response.data.msg === 'Verification email sent') {
                console.log('Registration successful, verification email sent');
                router.push('/verification');
            } else {
                console.error('Registration failed:', response.data.msg);
            }
        } catch (error) {
            // Handle the error
            if (error.response) {
                // The request was made and the server responded with a status code
                console.error('Error:', error.response.status, error.response.data);
            } else if (error.request) {
                // The request was made but no response was received
                console.error('No response received:', error.request);
            } else {
                // Something happened in setting up the request that triggered an error
                console.error('Error:', error.message);
            }
        }
    };

    return (
        <div
            style={{
                backgroundImage: `url(${bg.src})`,
                width: '100%',
                height: '140vh',
                backgroundRepeat: "no-repeat",
                backgroundPosition: 'left',
            }}
            className="outer-container"
        >
            <section
                className="bg-left flex justify-center w-full bg-gradient-to-r relative inner-container h-[100vh]"
                style={{
                    backgroundImage: `url(${bgg.src})`,
                    width: '100%',
                    height: '140vh',
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: 'right',
                }}
            >
                <div className="sm:flex justify-center sm:w-fit w-[90%] mt-[3rem]">
                    <div className="absolute left-[3%] md:top-2 top-3 justify-center items-center flex-col max-[420px]:hidden">
                        <Image src={logo} alt="" width={120} height={120} className="md:w-[120px] md:h-[120px] sm:w-[55px] sm:h-[55px] w-[60px] h-[60px]" />
                        <p className="md:text-[20px] text-[15px] font-[700] max-[420px]:text-[12px]">Uniclique</p>
                    </div>

                    <div className="flex items-center flex-col mt-[0rem]">
                        <h1 className="md:text-[2.5rem] text-[1.5rem] font-fold font-[700] flex gap-1 items-center">
                            Get Started <Image src={emoji} alt="" width={50} height={50} />
                        </h1>
                        <h2 className="md:text-[1rem] text-[.8rem] text-color1 font-[500]">Create an account as a user.</h2>
                        <div className="mt-[1rem] p-6 rounded-lg shadow-lg shadow-cyan-500/50 max-w-[100%] sm:w-[450px] bg-white w-full flex flex-col gap-7">
                            <form onSubmit={handleRegistration}>
                                <input
                                    type="text"
                                    name="firstName"
                                    placeholder="First Name"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                />
                                <input
                                    type="text"
                                    name="lastName"
                                    placeholder="Last Name"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                />
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email Address"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                                <input
                                    type="tel"
                                    name="phoneNumber"
                                    placeholder="Phone No."
                                    value={formData.phoneNumber}
                                    onChange={handleChange}
                                />
                                <div>
                                    <input
                                        type="password"
                                        name="password"
                                        placeholder="Password"
                                        value={formData.password}
                                        onChange={handleChange}
                                    />

                                    <Image
                                        src={passwordVisible ? eyeOpen : eyelock}
                                        alt=""
                                        width={15}
                                        height={15}
                                        onClick={togglePasswordVisibility}
                                        className="absolute right-[2%] flex justify-center items-center top-[57%]"
                                    />
                                </div>
                                <div>
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        placeholder="Confirm Password"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                    />
                                    <Image
                                        src={confirmPasswordVisible ? eyeOpen : eyelock}
                                        alt=""
                                        width={15}
                                        height={15}
                                        onClick={toggleConfirmPasswordVisibility}
                                        className="absolute right-[2%] flex justify-center items-center top-[57%]"
                                    />
                                </div>
                                <button type="submit">Sign Up</button>
                            </form>
                        </div>
                    </div>
                    <Button
                        style={{ backgroundColor: "#590209", fontSize: "12px", font: 'bold', padding: "15px", color: '#fff', width: '90%', marginTop: "20px", borderRadius: '10px' }}
                        text="Sign Up"
                        onClick={handleRegistration}
                    />
                    <Button
                        style={{ backgroundColor: "#590209", fontSize: "12px", font: 'bold', padding: "15px", color: '#fff', width: '90%', marginTop: "2px", borderRadius: '10px' }}
                        text="Already have an account? Sign In"
                        onClick={() => router.push('/signin')}
                    />
                </div>
            </section >
        </div >
    );
};

export default SignUp;