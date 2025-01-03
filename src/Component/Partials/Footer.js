import React from 'react'
import { Link } from "react-router-dom"
import logo from '../../static/img/logo.png'
import {FaStar, FaFacebookF, FaTwitterSquare, FaInstagramSquare} from 'react-icons/fa'

function Footer() {
  return (
    <>
    <footer className="w-full h-auto mt-[20%] lg:mt-[10%] px-[2%] pt-[2%] pb-[2%] bg-[#f5f5f5]">
          <div className="flex items-center md:flex-row flex-col w-full justify-between">
            <div className="md:w-[24%] lg:w-[60%] sm:w-[40%] sm:mx-auto w-[80%] lg:justify-normal sm:justify-between  h-[100%] flex items-center gap-[10px]">
            <img src={logo} alt="" className="md:w-[8%] w-[20%]" />
            <h1 className="text-[#00a2e2] font-semibold text-[20px] footer-logo">Seemly <span className="text-[#2f9800]">Professional</span></h1>
            </div>
            <div className="footer-nav-list md:text-[10px] lg:text-[13px]  h-full w-[40%] lg:w-[50%] md:w-[50%] md:mt-0 mt-10 md:mx-0 md:flex-row flex-col flex items-center gap-[50px]">
              <li>Home</li>
              <li>About</li>
              <li>Products</li>
              <li>Contact us</li>
            </div>
           
          </div>
          <hr className="border-[.5px] mt-5 border-[#ccc]" />
          <div className="copyright mt-5 flex md:flex-row flex-col items-center justify-between">
            <p className="w-[30%] text-[12px]">@2024SeemlyProfessionals</p>
            <div className="socials lg:w-[40%] md:w-[50%] sm:w-[40%] mt-10 md:mt-0 w-[90%]  flex items-center gap-[5px] justify-between">
              <p className="lg:text-[12px] text-[10px] w-[20%] text-[#2f9800]">Privacy</p>
              <p className="lg:text-[12px] text-[10px] lg:w-[30%] w-[30%] text-[#2f9800]">Term of Use</p>
              <div className="flex w-[50%] lg:w-[80%] items-center gap-[30px]">
                <hr  className="border-[#ccc] h-[40px] border-r-2"/>
                <FaInstagramSquare className="text-[#E1306C] text-[15px]" />
                <FaTwitterSquare className="text-[#1DA1F2] text-[15px]" />
                <FaFacebookF className="text-[#1877F2] text-[15px]" />
              </div>
            </div>
          </div>
          <div>

          </div>
        </footer>
    </>
  )
}

export default Footer