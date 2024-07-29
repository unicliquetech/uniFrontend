import React, { useState } from 'react';
import Image from 'next/image';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import Gold from '../../images/goldE.png';
import Oyindamola from '../../images/oyindamola.jpg';
import placeholder from '../../images/placeholderimg.png';
import Adebayo from '../../images/adebayo.jpg';

const AboutUs = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showFullText, setShowFullText] = useState(false);

    const team = [
        {
            name: "Oyindamola Adewole",
            role: "Chief Executive Officer",
            image: Oyindamola,
            about: "Oyindamola is a passionate Manager and Developer who is the Chief Executive Officer at UniClique. She is currently an undergraduate of physiotherapy at the University of Ibadan. Conversing with different students like herself, she realised the campus commerce was lacking in terms of access to quality products when you need them and also visibility for student entrepreneurs who actually sell these products or offer these services needed. She is currently focused on building products that scale and strengthen the economic capacity of students and young people. She believes building UniClique is just a starting point. Outside of work, Oyindamola enjoys working as a massage therapist and playing the saxophone, which she finds both relaxing and inspiring for her professional creativity."
        },
        {
            name: 'UGWUANI, Nmesoma Irene',
            role: 'Chief Design Officer',
            image: placeholder,
            about: "Nmesoma is a passionate Designer who is the Chief Design Officer at Uniclique. Currently a postgraduate student of University of Ibadan with a degree in Human Physiology, she brings enthusiasm and a modern perspective to our team. During her studies, Nmesoma developed a strong foundation in User Experience and User Interface Design. She particularly excels in Designs and Creative roles. Nmesoma's eagerness to learn and grow is evident in her approach to creating intuitive and visually appealing user-centric designs. She is currently focused on augmenting her Tech career, and is excited to contribute to Uniclique's innovative projects. Outside of work, Nmesoma enjoys watching documentaries and playing web3 games, which she finds both relaxing and inspiring for her professional creativity."
        },
        {
            name: 'Adebayo Samuel Olushola',
            role: 'Chief Marketing Officer',
            image: Adebayo,
            about: "Samuel is a dedicated businessman and serves as the Chief Marketing Officer at Uniclique. Though an undergraduate of Physiotherapy, he brings a fresh perspective and boundless enthusiasm to our team. Throughout his studies, Samuel has built a robust foundation in developing marketing strategies. He particularly excels in the area of customer engagement, applying this expertise in various projects and internships. Samuel's eagerness to learn and grow is evident in his approach to budget and campaign management. Currently, he is focused on conducting extensive market research and is excited to contribute to Uniclique's innovative endeavors. Outside of work, Samuel enjoys watching football and meeting new people, which not only provides relaxation but also fuels his professional creativity. He is aspiring to create and execute innovative and award-winning marketing campaigns that set industry benchmarks and significantly boost brand recognition and revenue."
        },
        {
            name: "Osadia Marvellous",
            role: "Senior Product Designer",
            image: placeholder,
            about: "Marvellous is a passionate Graphic and User Interface designer who is the product designer at Uniclique. Currently an undergraduate in the University of Benin with a degree in Education and Political Science. He brings enthusiasm and a modern perspective to our team. During his studies, Marvellous developed a strong foundation in Visual & Graphic designs, User interface designs and design research. He particularly excels in Visual & Graphic design, UI design and photo editing, which he applied in Uniclique and several other projects Marvellous's eagerness to learn and grow is evident in his approach to graphic design and UI design. He is currently focused on UX design, and is excited to contribute to Uniclique's innovative projects. Outside of work, Marvellous enjoys gaming, designing, travelling, dancing, which he finds both relaxing and inspiring for his professional creativity. I aspire to be a design leader, mentoring and inspiring others to reach their full potential and create amazing things and I'm also excited to use my design skills to make a difference in the world, creating solutions that are sustainable, accessible, and beautiful."
        },
        {
            name: "Oluwapelumi Egunjobi",
            role: "Senior Product Designer",
            image: placeholder,
            about: "Pelumi is an highly motivated and results-oriented product designer with several months of experience designing top-notch solutions for organisations and businesses. Oluwapelumi is experienced in conducting monitored and unmonitored user research and utilising insights to solve user pain points. She is an amazing collaborator, working with cross-functional teams to deliver impactful products."
        },
        {
            name: "Ogunseitan Gold",
            role: "Lead Frontend Developer",
            image: Gold,
            about: "Ogunseitan Gold is a seasoned Lead Front-End Developer and the Chief Executive Officer at UniClique. He is currently pursuing a degree in Mechatronics Engineering at Bowen University. Through his interactions with fellow students, he recognized a critical gap in campus commerce regarding access to quality products and the visibility of student entrepreneurs. This insight drove him to combine his leadership skills and technical expertise to create innovative solutions that address these challenges. As a Lead Front-End Developer, Gold is adept at overseeing the development of high-performance, scalable web applications. He excels in guiding his team to deliver seamless and engaging user experiences, ensuring that every project meets the highest standards of quality and functionality. His work at UniClique focuses on enhancing the economic capacity of students and young people through cutting-edge digital products. Gold believes that building UniClique is just the beginning of his journey to empower student entrepreneurs and drive positive change in the campus commerce ecosystem. His leadership and technical skills make him a pivotal figure in the success of UniClique and its mission. Outside of his professional life, Gold finds joy and relaxation in playing games, which helps him unwind and inspires his creativity as a lead developer."
        }
    ];

    const truncateText = (text: any, length: any) => {
        if (text.length <= length) return text;
        return text.substring(0, length) + '...';
    };

    const nextMember = () => {
        if (currentIndex < team.length - 1) {
            setCurrentIndex(currentIndex + 1);
            setShowFullText(false);
        }
    };

    const prevMember = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
            setShowFullText(false);
        }
    };

    return (
        <section className='sm:px-10 p-2 mt-[4rem]'>
            <div className='flex flex-col items-center'>
                <div className='text-center mb-8'>
                    <p className='md:text-[2.2rem] text-[1.6rem] font-[700]'>About Us</p>
                    <h4 className='md:text-[1.2rem] text-[0.8rem] font-[400]'>Checkout out our team</h4>
                </div>
                <div className='flex items-center'>
                    <button
                        className={`text-2xl md:p-4 p-3  rounded-full ${currentIndex === 0 ? 'text-gray-200 bg-gray-400' : 'text-white bg-[#590209]'}`}
                        onClick={prevMember}
                        disabled={currentIndex === 0}
                    >
                        <FaArrowLeft />
                    </button>
                    <div className='flex flex-col items-center gap-2 mx-4 max-w-[800px]'>
                        <div className='rounded-full'>
                            <Image
                                src={team[currentIndex].image}
                                alt={team[currentIndex].name}
                                width={300}
                                height={200}
                                className='rounded-md'
                            />
                        </div>
                        <h2 className='text-xl font-bold'>{team[currentIndex].name}</h2>
                        <h3 className='text-md font-semibold text-[#590209]'>{team[currentIndex].role}</h3>
                        <p className='text-sm text-center'>
                            {showFullText ? team[currentIndex].about : truncateText(team[currentIndex].about, 250)}
                        </p>
                        {team[currentIndex].about.length > 250 && (
                            <button onClick={() => setShowFullText(!showFullText)} className='text-[#590209]'>
                                {showFullText ? 'Show Less' : 'See More'}
                            </button>
                        )}
                    </div>
                    <button
                        className={`text-2xl bg-[#590209] md:p-4 p-3 cursor-pointer rounded-full ${currentIndex === team.length - 1 ? 'text-gray-200' : 'text-white'}`}
                        onClick={nextMember}
                        disabled={currentIndex === team.length - 1}
                    >
                        <FaArrowRight />
                    </button>
                </div>
            </div>
        </section>
    );
}

export default AboutUs;
