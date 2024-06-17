"use client"
import React, { useState, ChangeEvent } from 'react'
import axios from 'axios'
import Input from '@/component/Input'
import Image from 'next/image'
import eyelock from '@/images/eye-off.svg'
import Button from '@/component/button'
// import google from '../../images/Group 11.svg'
import bg from '@/images/bg-three.svg'
import bgg from '@/images/bg-three-st.svg'
import logo from '@/images/Union (2).svg'
import Form from '@/component/form'
import emoji from '@/images/emojipng 1.svg'
import eyeOpen from '@/images/eye-off (1).svg'
import { useRouter } from 'next/navigation'
import arrowRight from '@/images/arrow-right (1).svg'


interface ApiResponse {
    message?: string;
    error?: string;
}

const SignUpVendor = () => {
    const router = useRouter()
    const [passwordVisible, setPasswordVisible] = useState(false)
    const [confirmpasswordVisible, setConfirmPasswordVisible] = useState(false)
    const [apiResponse, setApiResponse] = useState<ApiResponse | null>(null);
    const [formData, setFormData] = useState({
        ownerName: '',
        businessName: '',
        businessDescription: '',
        businessType: '',
        businessCategory: '',
        location: '',
        openingHours: '',
        closingHours: '',
        bank: '',
        accountNumber: '',
        accountName: '',
        email: '',
        phoneNumber: '',
        university: '',
        department: '',
        matricNumber: '',
        sex: '',
        yearOfEntry: '',
        dateOfBirth: '',
        password: '',
        confirmPassword: '',
    })

    interface DecodedToken {
        email: string;
    }




    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            console.log('form data:', formData);
            const response = await axios.post('https://unibackend.onrender.com/api/v1/vendor/register', formData)
            setApiResponse(response.data);
            console.log('Email data:', response.data.email);

            localStorage.setItem('vendorEmail', response.data.email);


            if (response.data.message === 'Vendor registered successfully. Please verify your email.') {
                router.push('/vendorEmailVerification');
            }
        } catch (error) {
            console.error(error);
            setApiResponse({ error: 'An error occurred' });
        }
    };


    const togPasswordVis = () => {
        setPasswordVisible((prev) => !prev);
    };

    const togConfirm = () => {
        setConfirmPasswordVisible((prev) => !prev)
    }
    return (
        <div
            style={{
                backgroundImage: `url(${bg.src})`,
                width: '100%',
                height: '200vh',
                backgroundRepeat: "no-repeat",
                backgroundPosition: 'left',
            }}
            className='outer-container  responsive-div'
        >
            <section className='bg-left flex justify-center w-full bg-gradient-to-r relative  responsive-div inner-container'
                style={{
                    backgroundImage: `url(${bgg.src})`,
                    width: '100%',
                    height: '200vh',
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: 'right',
                }}
            >
                <div className='sm:flex justify-center sm:w-[98%] w-[100%] mt-[3rem] md:items-start items-center'>
                    <div className='absolute left-[2%] md:top-2 top-3 justify-center items-center flex-col max-[420px]:hidden'>
                        <Image src={logo} alt='' width={120} height={120} className='md:w-[120px] md:h-[120px] sm:w-[55px] sm:h-[55px] w-[60px] h-[60px]' />
                        <p className='md:text-[20px] text-[15px] font-[700] max-[420px]:text-[12px]'>Uniclique</p>
                    </div>

                    <div className='flex items-center flex-col md:justify-start justify-center'>
                        <h1 className='md:text-[2.5rem] text-[1.5rem] font-fold font-[700] flex gap-1 items-center' style={{ color: '#590209' }}>Vendor&apos;s  Profile  </h1>
                        <h2 className='md:text-[1rem] text-[.8rem] text-color1 font-[500]'>Please fill in your details</h2>


                        <form onSubmit={handleSubmit}>
                            <div className='mt-[1rem] p-6 rounded-lg shadow-lg shadow-cyan-500/50 max-w-[100%] sm:w-[450px] bg-white w-full flex flex-col md:gap-5 gap-7' >
                                <input placeholder='Full Name' type='text' name="ownerName"
                                    value={formData.ownerName}
                                    onChange={handleInputChange} />
                                <input placeholder='Business Name' type='text' name="businessName"
                                    value={formData.businessName}
                                    onChange={handleInputChange} />
                                <input placeholder='Business Description' type='text' name="businessDescription"
                                    value={formData.businessDescription}
                                    onChange={handleInputChange} />

                                <input
                                    placeholder='Business Type'
                                    type='text'
                                    name='businessType'
                                    value={formData.businessType}
                                    onChange={handleInputChange}
                                    list='businessTypes'
                                />
                                <datalist id='businessTypes'>
                                    <option value='product' />
                                    <option value='service' />
                                </datalist>

                                {formData.businessType === 'product' ? (
                                    <>
                                        <input
                                            placeholder='Business Category'
                                            type='text'
                                            name='businessCategory'
                                            value={formData.businessCategory}
                                            onChange={handleInputChange}
                                            list='productcategories'
                                        />
                                        <datalist id='productcategories'>
                                            <option value='food' />
                                            <option value='clothes' />
                                            <option value='footwear' />
                                            <option value='bags' />
                                            <option value='books' />
                                            <option value='jewelry' />
                                            <option value='skincare' />
                                            <option value='perfume' />
                                            <option value='snacks' />
                                            <option value='haircare' />
                                            <option value='soap' />
                                            <option value='home accessories' />
                                            <option value='gadgets' />
                                        </datalist>
                                    </>
                                ) : formData.businessType === 'service' ? (
                                    <>
                                        <input
                                            placeholder='Business Category'
                                            type='text'
                                            name='businessCategory'
                                            value={formData.businessCategory}
                                            onChange={handleInputChange}
                                            list='serviceCategories'
                                        />
                                        <datalist id='serviceCategories'>
                                            <option value='fashion designing' />
                                            <option value='makeup' />
                                            <option value='laundry' />
                                            <option value='delivery' />
                                            <option value='photography' />
                                            <option value='massage therapy' />
                                            <option value='graphics design' />
                                            <option value='tutoring' />
                                            <option value='barbing' />
                                            <option value='hairstyling' />
                                            <option value='hardware repairs' />
                                            <option value='manicure & pedicure' />
                                        </datalist>
                                    </>
                                ) : (
                                    <input
                                        placeholder='Business Category'
                                        type='text'
                                        name='businessCategory'
                                        value={formData.businessCategory}
                                        onChange={handleInputChange}
                                    />
                                )}

                                <input
                                    placeholder='Location'
                                    type='option'
                                    name='location'
                                    value={formData.location}
                                    onChange={handleInputChange}
                                    list='locations'
                                />
                                <datalist id='locations'>
                                    <option value='Awo Hall' />
                                    <option value='Idia Hall' />
                                    <option value='Bello Hall' />
                                    <option value='Zik Hall' />
                                    <option value='Indy Hall' />
                                    <option value="Queen's Hall" />
                                    <option value='Mellanby Hall' />
                                    <option value='Tedder Hall' />
                                    <option value='Alexander brown Hall' />
                                    <option value='Cmf Hostel' />
                                    <option value='Talent Hostel' />
                                    <option value='AOO Hostel' />
                                    <option value='Iya Taofeek Hub' />
                                    <option value='Abdulsalam' />
                                    <option value='Kuti Hall' />
                                    <option value='Abadina' />
                                    <option value='CBN Hostel' />
                                    <option value='Agbowo' />
                                    <option value='Ajibode' />
                                    <option value='Bodija' />
                                    <option value='Samonda' />
                                </datalist>

                                <div>
                                    <label htmlFor="openingHours">Opening Hours:</label>
                                    <input
                                        id="openingHours"
                                        type="time"
                                        name="openingHours"
                                        value={formData.openingHours}
                                        onChange={handleInputChange}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="closingHours">Closing Hours:</label>
                                    <input
                                        id="closingHours"
                                        type="time"
                                        name="closingHours"
                                        value={formData.closingHours}
                                        onChange={handleInputChange}
                                    />
                                </div>

                              <div className='mt-2 grid'>
                                <h3 className='font-semibold'> Payment Information: </h3>
                                <input
                                    placeholder='Bank'
                                    type="text"
                                    id="bank"
                                    name="bank"
                                    value={formData.bank}
                                    onChange={handleInputChange}
                                />

                                <input
                                    placeholder='Account Number'
                                    type="text"
                                    id="accountNumber"
                                    name="accountNumber"
                                    value={formData.accountNumber}
                                    onChange={handleInputChange}
                                />

                                <input
                                    placeholder='Account Name'
                                    type="text"
                                    id="accountName"
                                    name="accountName"
                                    value={formData.accountName}
                                    onChange={handleInputChange}
                                />
                                </div> 

                                <input placeholder='University' type='text' name="university"
                                    value={formData.university}
                                    onChange={handleInputChange} />
                                <input placeholder='Department' type='text' name="department"
                                    value={formData.department}
                                    onChange={handleInputChange} />
                                <input placeholder='Matric Number' type='number' name="matricNumber"
                                    value={formData.matricNumber}
                                    onChange={handleInputChange} />
                                <input placeholder='Phone Number(for calls andd whatsapp messages)' type='phone' name="phoneNumber"
                                    value={formData.phoneNumber}
                                    onChange={handleInputChange} />
                                <input placeholder='Sex' type='text' name="sex"
                                    value={formData.sex}
                                    onChange={handleInputChange} />
                                <input placeholder='Date of Birth' type='date' name="dateOfBirth"
                                    value={formData.dateOfBirth}
                                    onChange={handleInputChange} />
                                <input placeholder='Year of Entry' type='year' name="yearOfEntry"
                                    value={formData.yearOfEntry}
                                    onChange={handleInputChange} />
                                <input placeholder='School Email e.g. gadeyemi234@stu.ui.edu.ng' type='email' name="email"
                                    value={formData.email}
                                    onChange={handleInputChange} />

                                <div className='relative'>
                                    <input placeholder='Password' type={passwordVisible ? 'text' : 'password'} name="password"
                                        value={formData.password}
                                        onChange={handleInputChange} />
                                    <Image src={passwordVisible ? eyeOpen : eyelock} alt='' width={15} height={15} onClick={togPasswordVis} className='absolute right-[2%] flex justify-center items-center top-[57%]' />
                                </div>
                                <div className='relative'>
                                    <input placeholder='Confirm Password' type={confirmpasswordVisible ? 'text' : 'password'} name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleInputChange} />
                                    <Image src={confirmpasswordVisible ? eyeOpen : eyelock} alt='' width={15} height={15} onClick={togConfirm} className='absolute right-[2%] flex justify-center items-center top-[57%]' />
                                </div>
                            </div>
                            <button className=' flex justify-center items-center  md:px-[5rem] w-[90%] py-[15px] gap-2 bg-color1 pointer rounded-[10px] mt-[10px] cursor-pointer'
                                style={{ color: '#590209' }}
                                type='submit' >
                                <p className=''>Next</p>
                                <Image src={arrowRight} alt='' width={20} height={20} className='' />
                            </button>
                        </form>
                        <Button style={{ fontSize: "12px", font: 'bold', padding: "15px", color: '#fff', width: '90%', marginBottom: "200px", marginTop: '10px', borderRadius: '10px' }} text='Already have an account? Sign In' onClick={() => router.push('/signInVendor')} />
                    </div>
                </div>
            </section>
            {apiResponse && (
                <div className="mt-4">
                    {apiResponse.message && <p className="text-green-500">{apiResponse.message}</p>}
                    {apiResponse.error && <p className="text-red-500">{apiResponse.error}</p>}
                </div>
            )}
        </div>
    )
}

export default SignUpVendor;