import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleForm = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/user/login",
        formData
      );

      toast.success("Login successful! Redirecting...", {
        position: "top-center",
        autoClose: 2000,
      });

      localStorage.setItem("smeemly-token", res.data.token);
      localStorage.setItem("smeemly-user", JSON.stringify(res.data.user));

      setTimeout(() => {
        navigate("/");
      }, 2500);
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Login failed. Please try again.",
        {
          position: "top-center",
          autoClose: 3000,
        }
      );
    }
  };

  return (
    <>
      <ToastContainer />

      <div className="login w-full h-[100vh] flex items-center justify-center">
        <div className="login-form mx-auto bg-white p-8 lg:w-[40%] md:w-[50%] sm:w-[90%]">
          <h1 className="text-center text-[45px] font-lato tracking-wide font-[500] text-[#2f9800]">
            Sign in
          </h1>

          <form onSubmit={handleLogin} className="w-[100%] mt-[10%]">
            {/* Email Input */}
            <label htmlFor="email">Email</label>
            <br />
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleForm}
              className="outline-none mt-2 w-[100%] h-[40px] mb-10 border-black border-b-[1px]"
              required
            />

            {/* Password Input */}
            <label htmlFor="password">Password</label>
            <br />
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleForm}
              className="outline-none mt-2 w-[100%] h-[40px] border-black border-b-[1px]"
              required
            />

            {/* Submit Button */}
            <div className="flex justify-center">
              <button
                type="submit"
                className="w-[50%] h-[50px] bg-[#2f9800] text-white text-center font-[600] mt-[5%]"
              >
                Sign In
              </button>
            </div>
          </form>

           {/* OR Divider */}
           <div className='flex items-center my-6'>
              <hr className='flex-grow border-t border-gray-300' />
              <span className='mx-4 text-gray-400'>or</span>
              <hr className='flex-grow border-t border-gray-300' />
            </div>

          {/* Sign Up Redirect */}
          <div className='text-center'>
              <Link to="/signup">
                <button className='w-[50%] h-[40px] border-[#1a1515] border-[1.5px] items-center py-2 rounded-md'>
                  <span className='text-[14px] text-black'>Sign up with Email</span>
                </button>
              </Link>
            </div>
        </div>
      </div>
    </>
  );
}

export default Login;
