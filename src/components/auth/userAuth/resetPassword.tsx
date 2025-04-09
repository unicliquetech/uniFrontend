"use client";
import React, { useState } from "react";
import Image from "next/image";
import bgg from "@/images/BG-secondtype.svg";
import logo from "@/images/Union (2).svg";
import InputPass from "@/component/passInput";
import arrowRight from "@/images/arrow-right (1).svg";
import sync from "@/images/synchronize 1.svg";
import axios from "axios";
import eyelock from '@/images/eye-off.svg'  
import eyeOpen from '@/images/eye-off (1).svg'

interface ResetPasswordProps {}

const ResetPassword: React.FC<ResetPasswordProps> = () => {
  const [resetOtp, setResetOtp] = useState("");
  const [newPassword, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [passwordVis, setPasswordVis] = useState<boolean>(false)

  const PasswordVis = () => {
    setPasswordVis((prev) => !prev)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (newPassword !== confirmPassword) {
        setMessage("Passwords do not match");
        return;
      }

      const response = await axios.post("https://unibackend-4ebp.onrender.com/api/v1/user/update-password", {
        resetOtp,
        newPassword,
        confirmPassword,
      });

      setMessage(response.data.msg);
      setModalOpen(true);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setMessage(error.response?.data.msg || "An error occurred");
      } else {
        setMessage("An unexpected error occurred");
      }
    }
  };

  const handleModal = () => {
    setModalOpen(false);
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
          <div className="flex items-center flex-col mt-[3rem]">
            <h1 className="md:text-[3rem] text-[1.5rem] font-fold font-[700]" 
              style={{ color: '#590209'}}>
              Reset Password
            </h1>
            <h2 className="md:text-[1rem] text-[.7rem] text-color1 font-[700] text-center font-mon">
              Please enter your reset OTP and new password
            </h2>
            <div className="mt-[3rem] max-w-[100%] sm:w-[450px] w-full flex flex-col gap-[1rem]">
              <form onSubmit={handleSubmit}>
                <input
                  placeholder="Reset OTP"
                  type="number"
                  value={resetOtp}
                  onChange={(e) => setResetOtp(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "10px",
                    cursor: "pointer",
                    borderRadius: "10px",
                    backgroundColor: "#DDDDDD",
                  }}
                  className="md-[5rem]"
                />
                <div className="flex relative justify-center items-center mt-4">
                <input
                  placeholder="New Password"
                  type={passwordVis ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "10px",
                    cursor: "pointer",
                    borderRadius: "10px",
                    backgroundColor: "#DDDDDD",
                  }}
                />
                <Image
                      src={passwordVis ? eyeOpen : eyelock}
                      alt=""
                      width={15}
                      height={15}
                      onClick={PasswordVis}
                      className="absolute right-[2%] flex justify-center items-center "
                    />
                </div>
                <div className="flex relative justify-center items-center mt-4">
                <input
                  placeholder="Confirm Password"
                  type={passwordVis ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "10px",
                    cursor: "pointer",
                    borderRadius: "10px",
                    backgroundColor: "#DDDDDD",
                  }}
                />
                <Image
                      src={passwordVis ? eyeOpen : eyelock}
                      alt=""
                      width={15}
                      height={15}
                      onClick={PasswordVis}
                      className="absolute right-[2%] flex justify-center items-center "
                    />
                  </div>
                <div className="flex justify-center items-center w-full">
                  <div className="flex justify-center items-center mt-[3rem] px-[5rem] py-2 gap-2 bg-color1 pointer text-white rounded-3xl cursor-pointer"
                  style={{color: '#590209', fontWeight: 'bolder'}}>
                    <button type="submit">
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
                </div>
              </form>
              {message && <p>{message}</p>}
            </div>
          </div>
        </div>
      </section>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/50 p-2 md:p-0">
          <div className="bg-white shadow-2xl rounded-[20px] p-4 flex flex-col gap-4 justify-center items-center">
            <Image src={sync} alt="" width={120} height={120} />
            <p className="text-[18px] text-center font-bold md:w-[70%] w-[80%]">
              Your password has been reset successfully
            </p>
            {/* <p className="text-[17px] text-center md:w-[80%] w-[90%]">
              You'll be redirected to the login page shortly
            </p> */}
            <a href='/login' className="text-[17px] text-center md:w-[80%] w-[90%]" style={{color: '#590209', fontWeight: 'bolder'}}>
              Proceed to login here
            </a>
            <button
              className="md:px-[5rem] px-[2rem] py-2 bg-color1 pointer text-white rounded-3xl cursor-pointer"
              onClick={handleModal}
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResetPassword;