import Nav from "../Partials/Nav";
import aboutUsImg1 from '../../static/img/aboutusImg1.jpg'
import aboutUsImg2 from '../../static/img/aboutusImg2.jpg'
import logo from '../../static/img/logo.png'
import Footer from "../Partials/Footer";
import { Link } from "react-router-dom"
import products from '../Products/data.json'
import { FaStar } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom';
import ClipLoader from "react-spinners/ClipLoader"; // Import spinner
import React, { useState, useEffect } from 'react';

function Home() {
  const navigate = useNavigate();

  // State to store products fetched from the API
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // State to track loading status

  // Fetch products from the API on component mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true); // Set loading to true before fetching
        const response = await fetch('https://seemly-backend.onrender.com/api/product'); // Replace with your API URL
        const data = await response.json();
        // Randomly shuffle the products and slice the first 3
        const randomProducts = data.sort(() => 0.5 - Math.random()).slice(0, 3);
        setProducts(randomProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setIsLoading(false); // Set loading to false after fetching is complete
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      <div className="w-[100%] ">
        <Nav />
        {/* =================== HERO SECTION  =================== */}
        <section className="hero-sec w-[100%] h-auto lg:mt-[80px] lg:h-[80vh] relative flex items-center">
          <div className="absolute lg:w-[50%] w-[90%] sm:w-[80%]  min-[500px]:w-[70%] px-[5%] pt-10 bg-[#ffffff84] h-[70%] md:h-[50%] lg:h-[70%]  min-[500px]:h-[60%] sm:h-[60%]  backdrop-blur-md lg:ml-[10%] ml-[5%] rounded-md">
            <h1 className="text-[white] lg:text-[55px] text-[34px] font-medium leading-tight">
              Accessories at your{" "}
              <span className="text-[#2f9800] font-bold">FINGERTIPS</span>
            </h1>
            <p className="text-[#f5f5f5] lg:text-[18px] text-[14px] md:text-[16px] mt-4">
              Discover high-quality nursing accessories designed to meet your
              professional needs. From practical essentials to stylish
              additions, everything you need is just a click away.
            </p>
            <button className="md:w-[40%] w-[60%] h-[40px] md:h-[50px] mt-[15%] flex items-center justify-center bg-[#2f9800] font-semibold hover:bg-[#367b16] linear transition-[0.4s] rounded-md text-[#f5f5f5]">Buy Now</button>
          </div>
        </section>

        {/* =================== ABOUT US  =================== */}
        <section className="about-us flex px-[5%] mt-10 lg:mt-0 items-center justify-between  w-full h-auto lg:h-[70vh]">
          <div className="about-us-text lg:w-[40%] w-[80%] mx-auto md:w-[60%]">
            <h1 className="lg:text-[50px] text-[34px] lg:w-[auto] w-[90%] mx-auto text-center lg:text-left text-[#00a2e2]">About Us</h1>
            <p className="lg:text-[14px] lg:text-start text-center text-[13px] text-[#a2a2a2] leading-snug ">Seemly Professionals Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium inventore provident sint fugiat aspernatur, iusto adipisci nostrum aperiam suscipit ab sit a quia porro eum deleniti error illum? <span className="text-[#00a2e2] font-medium"> Get</span></p>
            <Link to="/login">
              <button className="lg:w-[40%] w-[80%]  lg:mx-0 mx-auto h-[50px] mt-[10%] flex items-center justify-center bg-[#2f9800] font-semibold hover:bg-[#367b16] linear transition-[0.4s] rounded-md text-[#f5f5f5]">Join Now</button>
            </Link>
          </div>
          <div className="about-us-image lg:block hidden h-[80%] w-[45%] relative">
            <img src={aboutUsImg1} alt="" className="about-us-first-image w-[80%] bottom-0 absolute h-[60%] rounded-lg object-cover" />
            <img src={aboutUsImg2} alt=""  className=" w-[50%] right-[2%] top-10 z-20 absolute h-[50%] rounded-lg object-cover" />
          </div>
        </section>

        {/* =================== OUR PRODUCTS  =================== */}
        <section className="our-products-sec h-auto pt-[80px] px-[5%]">
          <h1 className="lg:text-[55px] text-[34px] text-[#2f9800] text-center">Our Best Sellers</h1>
          <div className="products-area-display w-[90%] mx-auto mt-10 h-auto flex lg:flex-row flex-col items-center justify-between">
            {isLoading ? (
              <ClipLoader color="#2f9800" size={50} />
            ) : (
              products.map((product) => (
                <div key={product.id} className="lg:w-[30%] sm:w-[60%] min-[500px]:w-[70%] w-[100%] product-card mt-10 lg:mt-0">
                  <img
                    src={product.image} // Assuming product has an image field
                    alt={product.name}
                    className="rounded-[20px] w-[100%] lg:h-[400px] h-[200px] object-cover"
                  />
                  <div className="product-header-info w-[100%] mt-5 flex flex-col gap-[15px] justify-center">
                    <div className="name-rating-info flex h-[60px] justify-between items-center">
                      <h1 className="mt-5 font-bold lg:text-[18px] text-[16px] min-[500px]:text-[14px] w-[60%] sm:w-[60%] min-[500px]:w-[50%] text-[#00a2e2]">{product.name}</h1>
                      <div className="flex items-center gap-2 mt-3">
                        <FaStar className="text-[#ffd27d]" />
                        <FaStar className="text-[#ffd27d]" />
                        <FaStar className="text-[#ffd27d]" />
                        <FaStar className="text-[#ffd27d]" />
                        <FaStar className="text-[#ffd27d]" />
                      </div>
                    </div>
                    <div className="flex justify-between lg:mt-5 mt-5 sm:mt-3 items-center">
                      <h1 className="font-medium text-[16px]">Price</h1>
                      <p className="font-semibold text-[18px]">{product.price}</p>
                    </div>
                    <p className="lg:text-[16px] text-[14px] h-[100px] min-[500px]:h-[80px] text-[#a2a2a2] mt-5">{product.description}</p>
                    <button
                      className="w-[60%] min-[500px]:w-[80%] h-[50px] sm:mt-[2%] flex items-center justify-center bg-[#2f9800] font-semibold hover:bg-[#367b16] linear transition-[0.4s] rounded-md text-[#f5f5f5]"
                      onClick={() => {
                        navigate(`/products/${product.name}`, {
                          state: {
                            productId: product.id,
                            productName: product.name,
                            productAmount: product.price,
                            productDesc: product.description,
                            productImage: product.image,
                            productCategory: product.category,
                          },
                        });
                      }}
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        {/* =================== CONTACT US SECTION =================== */}
        <section className="contact-us h-auto w-full mt-[20%] lg:mt-[10%] sm:mt-[18%]">
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

        {/* =================== FOOTER SECTION =================== */}
        <Footer />
      </div>
    </>
  );
}

export default Home;
