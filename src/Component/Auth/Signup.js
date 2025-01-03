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
    address: ''
  });

  const [error, setError] = useState('');
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
    try {
      const response = await axios.post('http://localhost:5000/api/user/register', formData);
      toast.success('User registered successfully!', {
        position: "top-right", // Use position as a string
        autoClose: 3000, // Close after 3 seconds
      });
      setError('');
      setTimeout(() => navigate('/login'), 3000); // Redirect to login after 3 seconds
    } catch (error) {
      setError(error.response?.data?.message || 'Registration failed. Please try again.');
      toast.error(error.response?.data?.message || 'Registration failed', {
        position: "top-right", // Use position as a string
        autoClose: 3000,
      });
    }
  };

  return (
    <>
      <div className='login w-full h-[100vh] overflow-hidden flex-col items-center justify-center'>
        {/* ARROW REDIRECTING TO HOME PAGE */}
        <div className='flex items-center w-[90%] h-[20%] px-5 justify-between'>
          <Link to='/'>
            <FaArrowLeft className='text-[30px] text-[#2f9800]' />
          </Link>
          <Link to='/login'>
            <h1 className='text-[#2f9800] font-semibold'>Back</h1>
          </Link>
        </div>
        {/* SIGN UP FORM */}
        <div className='login-form mx-auto h-[70%] lg:w-[40%] md:w-[50%] sm:w-[100%]'>
          <h1 className='text-center text-[45px] font-lato tracking-wide font-[500] text-[#2f9800]'>Sign Up</h1>
          <div className='w-[80%] lg:w-[50%] md:w-[90%] mx-auto'>
            <h6 className='text-[font-thin] mt-5 text-center'>Already a member? Log in</h6>

            {/* FORM */}
            <form onSubmit={handleSubmit} className='w-[100%] mt-[10%]'>
              <label htmlFor="firstName">First Name</label><br />
              <input type="text" id='firstName' name='firstName' value={formData.firstName} onChange={handleForm} className='outline-none mt-2 w-[100%] h-[40px] mb-10 border-black border-b-[1px]' />

              <label htmlFor="lastName">Last Name</label><br />
              <input type="text" id='lastName' name='lastName' value={formData.lastName} onChange={handleForm} className='outline-none mt-2 w-[100%] h-[40px] mb-10 border-black border-b-[1px]' />

              <label htmlFor="email">Email</label><br />
              <input type="email" id='email' name='email' value={formData.email} onChange={handleForm} className='outline-none mt-2 w-[100%] h-[40px] mb-10 border-black border-b-[1px]' />

              <label htmlFor="password">Password</label><br />
              <input type="password" id='password' name='password' value={formData.password} onChange={handleForm} className='outline-none mt-2 w-[100%] h-[40px] border-black border-b-[1px]' />

              <label htmlFor="address">Address</label><br />
              <input type="text" id='address' name='address' value={formData.address} onChange={handleForm} className='outline-none mt-2 w-[100%] h-[40px] border-black border-b-[1px]' />

              <button type="submit" className='w-[100%] h-[50px] bg-[#00a2e2] text-white font-[600] mt-[5%]'>Sign Up</button>
            </form>

            {/* Error message */}
            {/* {error && <p className='text-red-500 text-center mt-4'>{error}</p>} */}

            {/* Toast Container */}
            <ToastContainer />
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
