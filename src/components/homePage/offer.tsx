import React from 'react';
import Image from 'next/image';
import cho from '../../images/Union (4).svg';
import mk from '../../images/market-place-by-jasons-slider-3 1marketPlaceImg (1).svg';
import saleImg from '../../images/saleImg.svg';
import Button from '../../components/homePage/button';

const OfferPage = () => {
    return (
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:px-10 px-5 mt-20">
            <div className='flex flex-col'>
                <h1 className="text-2xl text-black mb-4">What we offer to boost your business</h1>
                <div className="flex flex-col justify-between gap-4">
                    <div className="flex flex-col gap-4">
                        <div className="flex gap-2 items-center">
                            <Image src={cho} alt="Branding" width={20} height={20} />
                            <h3 className="text-xl text-black font-bold">Branding</h3>
                        </div>
                        <p>Elevate your business’s identity with our platform. Cultivate a distinct brand presence, connect with students, and stand out in the competitive marketplace for lasting success.</p>
                    </div>
                    <div className="flex flex-col gap-4">
                        <div className="flex gap-2 items-center">
                            <Image src={cho} alt="Marketing" width={20} height={20} />
                            <h3 className="text-xl text-black font-bold">Marketing</h3>
                        </div>
                        <p>Unlock your business’s full potential, reach a vast student audience, boost visibility, and thrive with seamless marketing and sales opportunities.</p>
                    </div>
                    <div className="flex flex-col gap-4">
                        <div className="flex gap-2 items-center">
                            <Image src={cho} alt="Order management" width={20} height={20} />
                            <h3 className="text-xl text-black font-bold">Order management</h3>
                        </div>
                        <p>Simplify and streamline order management for your university business. From processing to fulfillment, take control and enhance customer satisfaction with ease.</p>
                    </div>
                    <div className="flex flex-col gap-4">
                        <div className="flex gap-2 items-center">
                            <Image src={cho} alt="Online store creation" width={20} height={20} />
                            <h3 className="text-xl text-black font-bold">Online store creation</h3>
                        </div>
                        <p>Create your dream online store effortlessly. Showcase your products, engage students, and launch a thriving digital storefront that drives success.</p>
                    </div>
                    <div className='flex gap-4'>
                        <Button text="Get started" styles="bg-[#590209] text-lg text-white" />
                        <Button text="Learn More" styles="text-[#590209] text-lg border border-[#590209]" />
                    </div>
                </div>
            </div>
            <div className="grid grid-rows-2 gap-4">
                <div className="relative w-full h-64 md:h-full">
                    <Image src={mk} alt="Marketplace" layout="fill" objectFit="cover" />
                </div>
                <div className="relative w-full h-64 md:h-full">
                    <Image src={saleImg} alt="Sale" layout="fill" objectFit="cover" />
                </div>
            </div>
        </section>
    );
};

export default OfferPage;
