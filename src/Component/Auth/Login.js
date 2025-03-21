import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AOS from "aos";
import "aos/dist/aos.css";

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false); // Add loading state
  const navigate = useNavigate();

  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration
      once: true, // Whether animation should happen only once - while scrolling down
    });
  }, []);

  const handleForm = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Set loading to true

    try {
      const res = await axios.post(
        "https://seemly-backend.onrender.com/api/user/login",
        formData
      );

      toast.success("Login successful! Redirecting...", {
        position: "top-center",
        autoClose: 2000,
      });

      localStorage.setItem("smeemly-token", res.data.token);
      sessionStorage.setItem("smeemly-user", JSON.stringify(res.data.user));

      setTimeout(() => {
        setIsLoading(false); // Set loading to false before navigating
        navigate("/");
      }, 2500);
    } catch (err) {
      setIsLoading(false); // Set loading to false on error
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
        <div
          className="login-form mx-auto bg-white p-8 lg:w-[40%] md:w-[50%] sm:w-[90%]"
          data-aos="fade-up"
        >
          <h1
            className="text-center text-[45px] font-lato tracking-wide font-[500] text-[#2f9800]"
            data-aos="fade-down"
          >
            Sign in
          </h1>

          <form onSubmit={handleLogin} className="w-[100%] mt-[10%]">
            {/* Email Input */}
            <label htmlFor="email" data-aos="fade-right">
              Email
            </label>
            <br />
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleForm}
              className="outline-none mt-2 w-[100%] h-[40px] mb-10 border-black border-b-[1px]"
              required
              data-aos="fade-left"
            />

            {/* Password Input */}
            <label htmlFor="password" data-aos="fade-right">
              Password
            </label>
            <br />
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleForm}
              className="outline-none mt-2 w-[100%] h-[40px] border-black border-b-[1px]"
              required
              data-aos="fade-left"
            />

            {/* Submit Button */}
            <div className="flex justify-center" data-aos="fade-up">
              <button
                type="submit"
                className="w-[50%] h-[50px] bg-[#2f9800] text-white text-center font-[600] mt-[5%]"
                disabled={isLoading} // Disable button while loading
              >
                {isLoading ? "Loading..." : "Sign In"}
              </button>
            </div>
          </form>

          {/* OR Divider */}
          <div
            className="flex items-center my-6"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <hr className="flex-grow border-t border-gray-300" />
            <span className="mx-4 text-gray-400">or</span>
            <hr className="flex-grow border-t border-gray-300" />
          </div>

          {/* Sign Up Redirect */}
          <div className="text-center" data-aos="fade-up" data-aos-delay="300">
            <Link to="/signup">
              <button className="w-[50%] h-[40px] border-[#1a1515] border-[1.5px] items-center py-2 rounded-md">
                <span className="text-[14px] text-black">Sign up with Email</span>
              </button>
            </Link>
          </div>
        </div>

        {/* Loading Overlay */}
        {isLoading && (
          <div
            className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center"
            data-aos="fade-in"
          >
            <div className="loader border-t-4 border-b-4 border-white w-12 h-12 rounded-full animate-spin"></div>
          </div>
        )}
      </div>
    </>
  );
}

export default Login;