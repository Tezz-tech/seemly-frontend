import React, { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook, FaArrowLeft } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Using axios for the API request
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Importing toastify CSS

function Signup() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    address: '',
  });

  const [isLoading, setIsLoading] = useState(false); // Add loading state
  const navigate = useNavigate(); // For redirecting after successful signup

  const handleForm = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true); // Set loading to true

    try {
      const response = await axios.post(
        'https://seemly-backend.onrender.com/api/user/register',
        formData
      );
      toast.success('User registered successfully!', {
        position: 'top-right',
        autoClose: 3000,
      });

      setTimeout(() => {
        setIsLoading(false); // Stop loading
        navigate('/login'); // Redirect to login
      }, 3000);
    } catch (error) {
      setIsLoading(false); // Stop loading on error
      toast.error(
        error.response?.data?.message || 'Registration failed. Please try again.',
        {
          position: 'top-right',
          autoClose: 3000,
        }
      );
    }
  };

  return (
    <>
      <div className="login w-full h-[100vh] flex-col items-center justify-center relative">
        {/* Arrow redirecting to home page */}
        <div className="flex items-center w-[90%] h-[20%] px-5 justify-between">
          <Link to="/">
            <FaArrowLeft className="text-[30px] text-[#2f9800]" />
          </Link>
          <Link to="/login">
            <h1 className="text-[#2f9800] font-semibold">Back</h1>
          </Link>
        </div>

        {/* Signup Form */}
        <div className="login-form mx-auto h-[70%] lg:w-[40%] md:w-[50%] sm:w-[100%]">
          <h1 className="text-center text-[45px] font-lato tracking-wide font-[500] text-[#2f9800]">
            Sign Up
          </h1>
          <div className="w-[80%] lg:w-[50%] md:w-[90%] mx-auto">
            <h6 className="text-[font-thin] mt-5 text-center">Already a member? Log in</h6>

            {/* Form */}
            <form onSubmit={handleSubmit} className="w-[100%] mt-[10%]">
              <label htmlFor="firstName">First Name</label>
              <br />
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleForm}
                className="outline-none mt-2 w-[100%] h-[40px] mb-10 border-black border-b-[1px]"
              />

              <label htmlFor="lastName">Last Name</label>
              <br />
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleForm}
                className="outline-none mt-2 w-[100%] h-[40px] mb-10 border-black border-b-[1px]"
              />

              <label htmlFor="email">Email</label>
              <br />
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleForm}
                className="outline-none mt-2 w-[100%] h-[40px] mb-10 border-black border-b-[1px]"
              />

              <label htmlFor="password">Password</label>
              <br />
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleForm}
                className="outline-none mt-2 w-[100%] h-[40px] border-black border-b-[1px]"
              />

              <label htmlFor="address">Address</label>
              <br />
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleForm}
                className="outline-none mt-2 w-[100%] h-[40px] border-black border-b-[1px]"
              />

              <button
                type="submit"
                className="w-[100%] h-[50px] bg-[#00a2e2] text-white font-[600] mt-[5%]"
                disabled={isLoading} // Disable button when loading
              >
                {isLoading ? 'Loading...' : 'Sign Up'}
              </button>
            </form>

            {/* Toast Container */}
            <ToastContainer />
          </div>
        </div>

        {/* Loading Spinner */}
        {isLoading && (
          <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
            <div className="loader border-t-4 border-b-4 border-white w-12 h-12 rounded-full animate-spin"></div>
          </div>
        )}
      </div>
    </>
  );
}

export default Signup;
