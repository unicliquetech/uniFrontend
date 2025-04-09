"use client";
import React, { useState, ChangeEvent } from "react";
import Input from "@/component/Input";
import Image from "next/image";
import eyelock from "@/images/eye-off.svg";
import Button from "@/component/button";
import google from "@/images/Group 11.svg";
import bg from "@/images/BG-st-2.svg";
import bgg from "@/images/BG-secondtype.svg";
import logo from "@/images/Union (2).svg";
import { useRouter } from "next/navigation";
import eyeOpen from "@/images/eye-off (1).svg";
import InputPass from "@/component/passInput";
import arrowRight from "@/images/arrow-right (1).svg";
import axios from "axios";

interface ForgotPasswordProps {}
// interface FormData {
//     email: string,
// }

const VendorForgotPassword: React.FC<ForgotPasswordProps> = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
//   const [formData, setFormData] = useState<FormData>({
//     email: '',
//   })

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();


    try {
      const response = await axios.post("https://unibackend-4ebp.onrender.com/api/v1/vendor/reset-password", {email});
      setMessage(response.data.message);
      if (response.data.message === 'Password reset email sent') {
        router.push('/vendorResetPassword');
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setMessage(error.response?.data.message || "An error occurred");
      } else {
        setMessage("An unexpected error occurred");
      }
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${bgg.src})`,
        width: "100%",
        height: "100vh",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "left",
      }}
      className="outer-container"
    >
      <section
        className="bg-left flex justify-center w-full bg-gradient-to-r relative inner-container h-[100vh]"
        style={{
          backgroundImage: `url(${bgg.src})`,
          width: "100%",
          height: "100vh",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right",
        }}
      >
        <div className="sm:flex justify-center sm:w-fit w-[90%] mt-[2rem]">
          <div className="absolute left-[3%] md:top-2 top-3 justify-center items-center flex-col max-[420px]:hidden">
            <Image
              src={logo}
              alt=""
              width={120}
              height={120}
              className="md:w-[120px] md:h-[120px] sm:w-[55px] sm:h-[55px] w-[60px] h-[60px]"
            />
            <p className="md:text-[20px] text-[15px] font-[700] max-[420px]:text-[12px]">
              Uniclique
            </p>
          </div>
          <div className="flex items-center flex-col mt-[3rem] w-full">
            <h1 className="md:text-[3rem] text-[1.5rem] font-fold font-[700]" style={{ color: '#590209'}}>
              Forgot Password
            </h1>
            <h2 className="md:text-[1.1rem] text-[.7rem] text-color1 font-[700] md:w-[45%] w-[80%] text-center font-mon">
              Please enter your email address. You will receive a link to create
              a new password via email.
            </h2>
            <div className="mt-[3rem] max-w-[100%] sm:w-[450px] w-full flex flex-col md:gap-[3rem] gap-[1rem]">
              <form onSubmit={handleSubmit}>
                <input
                  placeholder="Email Address"
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  style={{
                    width: "100%",
                    padding: "10px",
                    marginTop: "1rem",
                    cursor: "pointer",
                    borderRadius: "30px",
                    backgroundColor: "#DDDDDD",
                  }}
                />
                <div className="flex justify-center items-center w-full">
                  <button
                    type="submit"
                    className="flex justify-center items-center md:px-[5rem] px-[2rem] py-2 gap-2 bg-color1 pointer text-red rounded-3xl cursor-pointer"
                    style={{ color: '#590209', fontWeight: 'bolder'}}
                  >
                    <p>Next</p>
                    <Image
                      src={arrowRight}
                      alt=""
                      width={20}
                      height={20}
                      className=""
                    />
                  </button>
                </div>
              </form>
              {message && <p>{message}</p>}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default VendorForgotPassword;