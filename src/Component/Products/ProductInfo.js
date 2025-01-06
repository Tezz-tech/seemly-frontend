import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import Nav from "../Partials/Nav";
import Footer from "../Partials/Footer";
import aboutUsImg1 from "../../static/img/aboutusImg1.jpg";
import { DataContext } from "../context/DataContext";
import ClipLoader from "react-spinners/ClipLoader"; // Import spinner

function ProductInfo() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [productData, setProductData] = useState(null); // Product data state
  const [quantity, setQuantity] = useState(1);
  const [total, setTotal] = useState(0);
  const { setCart, cart } = useContext(DataContext);

  const isUserLoggedIn = sessionStorage.getItem("smeemly-user");

  // Fetch product data when component mounts
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true);
        // Simulate a fetch to an API using the product ID from location state
        const product = location.state || {};
        setProductData(product);
        setTotal(product.productAmount || 0);
      } catch (error) {
        console.error("Error fetching product details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [location.state]);

  // Handle quantity and total price calculation
  const handleTotal = (e) => {
    const quantityAdded = parseInt(e.target.value, 10);
    setQuantity(quantityAdded);
    const newTotal = quantityAdded * (productData?.productAmount || 0);
    setTotal(newTotal);
  };

  // Add to cart functionality
  const handleAddToCart = () => {
    if (!isUserLoggedIn) {
      alert("Please log in before adding items to your cart.");
      return;
    }

    // Create a new item to add to the cart
    const newItem = {
      id: productData.productId,
      name: productData.productName,
      price: productData.productAmount,
      quantity,
      totalPrice: quantity * productData.productAmount,
      image: productData.productImage,
    };

    // Add the new item to the existing cart
    const updatedCart = [...cart, newItem];

    // Update the cart in state and storage
    setCart(updatedCart);
    sessionStorage.setItem("cartItems", JSON.stringify(updatedCart));

    alert("Item added to cart successfully!");
  };

  if (isLoading) {
    return (
      <>
        <Nav />
        <section className="flex justify-center items-center h-screen">
          {/* Display the spinner */}
          <ClipLoader color="#2f9800" size={50} />
        </section>
        <Footer />
      </>
    );
  }

  if (!productData) {
    return (
      <>
        <Nav />
        <section className="flex justify-center items-center h-screen">
          <p className="text-lg font-medium text-red-500">
            Error: Product not found.
          </p>
        </section>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Nav />
      <section className="md:mt-[120px] sm:mt-[120px] mt-[20px] lg:w-[60%] w-[90%] h-auto mx-auto relative">
        <div className="w-full small-nav flex items-center gap-5">
          <Link to="/">
            <li className="text-[#2f9800] font-light md:text-[16px] text-[10px] hover:font-semibold transition-[0.5s] ease-in-out">
              Home
            </li>
          </Link>
          <p>/</p>
          <Link to="/products">
            <li className="text-[#2f9800] font-light md:text-[16px] text-[10px] hover:font-semibold transition-[0.5s] ease-in-out">
              Products
            </li>
          </Link>
          <p>/</p>
          <li className="text-[#2f9800] font-light md:text-[16px] text-[10px] hover:font-semibold transition-[0.5s] ease-in-out">
            {productData.productName}
          </li>
        </div>
        <section className="product-info mt-[5%] w-full flex lg:flex-row flex-col justify-between">
          <div className="first-part lg:w-[45%] w-[100%]">
            <figure className="w-full">
              <img
                src={productData.productImage || aboutUsImg1}
                alt={productData.productName}
                className="h-[300px] w-full rounded-sm object-cover"
              />
              <div className="other-view-of-image mt-5 flex w-full gap-[20px]">
                {[...Array(4)].map((_, index) => (
                  <img
                    key={index}
                    src={productData.productImage || aboutUsImg1}
                    alt={`View ${index + 1}`}
                    className="w-[60px] border-[1px] rounded-sm border-[#00000053] object-cover"
                  />
                ))}
              </div>
            </figure>
            <div className="mt-5 w-full h-auto">
              <p className="text-[#00000095] product-desc font-light md:text-[16px] sm:text-[14px] text-[13px] tracking-wide">
                {productData.productDesc}
              </p>
            </div>
          </div>
          <div className="second-part lg:w-[45%] w-[100%] mt-5 lg:mt-0">
            <h1 className="product-name md:text-[30px] text-[20px] font-light text-[#a2a2a2]">
              {productData.productName}
            </h1>
            <p className="mt-5 font-semibold text-[26px] text-[#00a2e2]">
              ${total}.00
            </p>
            <div className="quantity mt-5">
              <p className="text-[#a2a2a2]">Quantity</p>
              <input
                type="number"
                value={quantity}
                onChange={handleTotal}
                className="text-[#a2a2a2] outline-none w-[20%] h-[50px] mt-2 pl-3 border-[1px] border-[#00000087]"
                min="1"
              />
            </div>
            <div className="add-to-cart mt-5">
              <button
                onClick={handleAddToCart}
                className="text-[white] bg-[#2f9800] hover:bg-[#309800e1] transition-[0.3s] lg:w-[80%] sm:w-[50%] md:w-[40%] min-[500px]:w-[50%] w-[100%] py-3 rounded-md border-[1px] border-[#2f9800] flex justify-center items-center"
              >
                Add to Cart
              </button>
              <button className="text-[#2f9800] sm:w-[50%] md:w-[40%] min-[500px]:w-[50%] lg:w-[80%] w-[100%] py-3 rounded-md border-[1px] hover:font-semibold mt-5 border-[#2f9800] flex justify-center items-center">
                Buy Now
              </button>
            </div>
          </div>
        </section>
      </section>
      <Footer />
    </>
  );
}

export default ProductInfo;
