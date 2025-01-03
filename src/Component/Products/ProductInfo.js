import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import Nav from "../Partials/Nav";
import similarProducts from "./data.json";
import Footer from "../Partials/Footer";
import aboutUsImg1 from "../../static/img/aboutusImg1.jpg";

function ProductInfo() {
  const location = useLocation();
  const {
    productName,
    productAmount,
    productDesc,
    productImage,
    productCategory,
    productId,
  } = location.state || {};

  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [total, setTotal] = useState(productAmount);

  // Handle quantity and total price calculation
  const handleTotal = (e) => {
    const quantityAdded = parseInt(e.target.value, 10);
    setQuantity(quantityAdded);
    const newTotal = quantityAdded * productAmount;
    setTotal(newTotal);
  };

  // Fetch existing cart items from localStorage
  const [order, setNewOrder] = useState(() => {
    return JSON.parse(localStorage.getItem("cartItems")) || [];
  });

  // Add product to cart
  const addToCart = () => {
    const newProduct = {
      CartProductName: productName,
      CartProductAmount: productAmount,
      CartProductId: productId,
      quantity: quantity,
      total: total,
    };

    const updatedOrder = [...order, newProduct];
    setNewOrder(updatedOrder);
    localStorage.setItem("cartItems", JSON.stringify(updatedOrder));

    // Show success alert
    alert(`${productName} has been added to your cart.`);

    // Navigate to the cart page
    navigate("/cart", {
      state: {
        cartItems: updatedOrder,
      },
    });
  };

  const randomProducts = similarProducts.sort(() => 0.5 - Math.random());
  const similarProductsSliced = randomProducts.slice(0, 3);

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
            {productName}
          </li>
        </div>
        <section className="product-info mt-[5%] w-full flex lg:flex-row flex-col justify-between">
          <div className="first-part lg:w-[45%] w-[100%]">
            <figure className="w-full">
              <img
                src={productImage || aboutUsImg1}
                alt={productName}
                className="h-[300px] w-full rounded-sm object-cover"
              />
              <div className="other-view-of-image mt-5 flex w-full gap-[20px]">
                {[...Array(4)].map((_, index) => (
                  <img
                    key={index}
                    src={productImage || aboutUsImg1}
                    alt={`View ${index + 1}`}
                    className="w-[60px] border-[1px] rounded-sm border-[#00000053] object-cover"
                  />
                ))}
              </div>
            </figure>
            <div className="mt-5 w-full h-auto">
              <p className="text-[#00000095] product-desc font-light md:text-[16px] sm:text-[14px] text-[13px] tracking-wide">
                {productDesc}
              </p>
            </div>
          </div>
          <div className="second-part lg:w-[45%] w-[100%] mt-5 lg:mt-0">
            <h1 className="product-name md:text-[30px] text-[20px] font-light text-[#a2a2a2]">
              {productName}
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
              />
            </div>
            <div className="add-to-cart mt-5">
              <button
                onClick={addToCart}
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
      <section className="similar-product-section w-[90%] mx-auto mt-[10%]">
        <h1 className="text-center text-[35px] text-[#2f9800]">
          You Must Also Like
        </h1>
        <div className="w-[100%] h-[300px] lg:h-[400px] mx-auto mt-5 flex items-center gap-[5%] justify-center">
          {similarProductsSliced.map((similarProduct) => {
            if (similarProduct.category === productCategory) {
              return (
                <div
                  key={similarProduct.id}
                  className="lg:w-[20%] md:w-[40%] sm:w-[50%] w-[50%] h-full cursor-pointer"
                  onClick={() => {
                    navigate(`/products/${similarProduct.name}`, {
                      state: {
                        productId: similarProduct.id,
                        productName: similarProduct.name,
                        productAmount: similarProduct.amount,
                        productImage: aboutUsImg1,
                        productDesc: similarProduct.desc,
                        productCategory: similarProduct.category,
                      },
                    });
                  }}
                >
                  <img
                    src={productImage || aboutUsImg1}
                    alt={similarProduct.name}
                    className="w-full h-[45%] md:h-[50%] object-cover"
                  />
                  <h1 className="mt-2 font-light text-[16px] h-[30%] md:h-[10%]">
                    {similarProduct.name}
                  </h1>
                  <p className="font-medium text-[14px] mt-5 h-[10%]">
                    ${similarProduct.amount}.00
                  </p>
                </div>
              );
            } else {
              return null;
            }
          })}
        </div>
      </section>
      <Footer />
    </>
  );
}

export default ProductInfo;
