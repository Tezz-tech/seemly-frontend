import React from 'react'
import Nav from '../Partials/Nav'
import Footer from '../Partials/Footer'

function Contact() {
  return (
    <>
    <Nav />
    <section className="contact-us h-auto w-full mt-[6%] sm:mt-[80px] md:mt-[80px]">
          <h1 className="contact-us-header text-center text-[#00a2e2] text-[34px] lg:text-[55px]">Contact Us</h1>
          <p className="text-center text w-[80%] lg:w-full text-[#a2a2a2] mt-5 lg:mx-0 mx-auto">Lay your complaint to us and we'll be happy to respond as soon as possible</p>

          <form action="" className="mt-[5%] lg:w-[30%] w-[80%] md:w-[50%] sm:w-[60%] mx-auto">
            <label htmlFor="email" className="text-[#00a2e2]">Email</label>
            <input type="email" id="email" className="w-[100%] h-[40px] mb-[10%] outline-none border-b-2 border-[#00a2e2] text-[#a2a2a2]" />

            <label htmlFor="textArea" className="text-[#00a2e2]">Message</label><br />
            <textarea name="message" id="textArea" className="outline-none border-2 lg:px-2 border-[#00a2e2] px-2 w-[100%] h-[200px]"></textarea>
            <button className="w-[90%] lg:w-[80%] md:w-[60%] md:h-[50px]  sm:w-[60%] sm:h-[50px]  flex items-center mx-auto lg:h-[50px] h-[60px] rounded-md mt-[10%] justify-center text-[#f5f5f5] bg-[#2f9800]">Enter</button>
          </form>
        </section>
    <Footer />
    </>
  )
}

export default Contact