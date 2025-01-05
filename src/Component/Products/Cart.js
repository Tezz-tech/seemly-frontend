import React, { useState, useContext } from "react";
import Nav from "../Partials/Nav";
import Footer from "../Partials/Footer";
import { FaTrash } from "react-icons/fa";
import { DataContext } from "../context/DataContext";

function Cart() {
  const { cart, setCart } = useContext(DataContext);
  const [address, setAddress] = useState("");

  // Get user from sessionStorage
  const user = JSON.parse(sessionStorage.getItem("smeemly-user"));

  // Increase quantity of a cart item
  const increaseItem = (item) => {
    const updatedCart = cart.map((cartItem) =>
      cartItem.id === item.id
        ? {
            ...cartItem,
            quantity: cartItem.quantity + 1,
            totalPrice: (cartItem.quantity + 1) * cartItem.price,
          }
        : cartItem
    );
    setCart(updatedCart);
    sessionStorage.setItem("cartItems", JSON.stringify(updatedCart));
  };

  // Decrease quantity of a cart item
  const decreaseItem = (item) => {
    if (item.quantity > 1) {
      const updatedCart = cart.map((cartItem) =>
        cartItem.id === item.id
          ? {
              ...cartItem,
              quantity: cartItem.quantity - 1,
              totalPrice: (cartItem.quantity - 1) * cartItem.price,
            }
          : cartItem
      );
      setCart(updatedCart);
      sessionStorage.setItem("cartItems", JSON.stringify(updatedCart));
    }
  };

  // Delete a cart item
  const handleDeleteItem = (item) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this item?");
    if (confirmDelete) {
      const updatedCart = cart.filter((cartItem) => cartItem.id !== item.id);
      setCart(updatedCart);
      sessionStorage.setItem("cartItems", JSON.stringify(updatedCart));
    }
  };

  // Calculate subtotal
  const subtotal = cart.reduce((acc, item) => acc + item.totalPrice, 0);
  const deliveryFee = 4.0; // Example fixed delivery fee
  const finalTotal = subtotal + deliveryFee;

  // Handle checkout with Paystack
  const handleCheckout = () => {
    if (!address) {
      alert("Please enter your address before proceeding to checkout.");
      return;
    }

    const paystackHandler = window.PaystackPop.setup({
      key: "pk_test_d3a60265a49af403da62ebb911e30f155701b601", // Replace with your Paystack public key
      email: user.email,
      amount: finalTotal * 100, // Convert to kobo
      currency: "NGN",
      callback: (response) => {
        // Payment successful
        const orderDetails = {
          user,
          address,
          cart,
          paymentReference: response.reference,
        };
        console.log("Order Details:", orderDetails);
        alert("Payment successful!");
        setCart([]);
        sessionStorage.removeItem("cartItems");
      },
      onClose: () => {
        alert("Payment was not completed. Please try again.");
      },
    });

    paystackHandler.openIframe();
  };

  return (
    <>
      <Nav />
      <section className="lg:mt-[160px] md:mt-[120px] mt-[60px] md:w-[90%] w-[80%] mx-auto flex md:flex-row flex-col md:gap-0 gap-10 justify-between">
        <div className="cart-orders lg:w-[60%] md:w-[60%] min-[500px]:w-[70%] mx-auto w-[100%]">
          <h1 className="text-[25px] text-[#2f9800]">My Cart</h1>
          <div className="w-full h-[400px] overflow-scroll mt-5">
            {cart.length > 0 ? (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="order mt-2 w-full lg:h-[40%] h-auto border-t-[1px] border-[#ccc] pt-5 flex lg:flex-row flex-col gap-10 lg:gap-0 lg:items-center justify-between"
                >
                  <div className="lg:w-[45%] w-[100%] flex gap-5 h-full items-center">
                    <img
                      src={item.image}
                      alt=""
                      className="md:w-[120px] w-[80px] h-[90px] object-cover border-2 border-[#ccc] rounded-md shadow-md"
                    />
                    <div className="flex flex-col justify-center gap-2">
                      <p className="tracking-wide text-[14px] font-medium text-center lg:text-left">
                        {item.name}
                      </p>
                      <p className="text-lg font-semibold text-center lg:text-left">
                        ${item.price}
                      </p>
                    </div>
                  </div>

                  <div className="md:w-[40%] w-[60%] h-full flex justify-center items-center gap-4">
                    <button
                      onClick={() => decreaseItem(item)}
                      className="text-lg font-bold w-8 h-8 flex items-center justify-center bg-[#f0f0f0] rounded-full shadow-md border border-[#ccc] hover:bg-[#ccc]"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      value={item.quantity}
                      readOnly
                      className="w-[60px] text-center text-[14px] h-[30px] rounded-md outline-none border-2 border-[#00a2e2]"
                    />
                    <button
                      onClick={() => increaseItem(item)}
                      className="text-lg font-bold w-8 h-8 flex items-center justify-center bg-[#f0f0f0] rounded-full shadow-md border border-[#ccc] hover:bg-[#ccc]"
                    >
                      +
                    </button>
                    <p className="individual-total font-semibold text-[14px]">
                      ${item.totalPrice.toFixed(2)}
                    </p>
                    <FaTrash
                      className="text-[#2f9800] text-lg cursor-pointer hover:text-[#1e6b00]"
                      onClick={() => handleDeleteItem(item)}
                    />
                  </div>
                </div>
              ))
            ) : (
              <div>No items in cart</div>
            )}
          </div>
        </div>
        <div className="check-out md:w-[30%] min-[500px]:w-[60%] mx-auto">
          <h1 className="text-[25px] text-[#2f9800]">Order Summary</h1>
          <hr className="border-[0.5px] mt-7 border-[#ccc] w-full" />
          <div className="subtotal mt-5 w-full">
            <div className="flex justify-between">
              <p className="text-[16px] font-light">Subtotal</p>
              <p>${subtotal.toFixed(2)}</p>
            </div>
            <div className="flex mt-10 justify-between">
              <p className="text-[16px] font-light">Delivery</p>
              <p>${deliveryFee.toFixed(2)}</p>
            </div>
            <input
              type="text"
              placeholder="Enter address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-[100%] h-[40px] mt-10 outline-none rounded-md bg-[#ccc] text-[white] placeholder:text-white pl-3"
            />
          </div>
          <hr className="border-[0.5px] mt-7 border-[#ccc] w-full" />
          <div className="flex mt-10 justify-between">
            <p className="text-[20px] font-light">Total</p>
            <p className="text-[18px]">${finalTotal.toFixed(2)}</p>
          </div>
          <button
            onClick={handleCheckout}
            className="w-full min-[500px]:w-[100%] mx-auto flex justify-center bg-[#2f9800] rounded-sm items-center text-[#f5f5f5] mt-5 h-[45px]"
          >
            Checkout
          </button>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default Cart;
