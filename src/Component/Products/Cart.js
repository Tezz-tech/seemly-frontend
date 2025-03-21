import React, { useState, useContext, useEffect } from "react";
import Nav from "../Partials/Nav";
import Footer from "../Partials/Footer";
import { FaTrash } from "react-icons/fa";
import { DataContext } from "../context/DataContext";
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import AOS styles

const stripePromise = loadStripe('pk_live_51OHG7qBqSNRl3dSZAFw1ptKnVwFHrku7k42rLPBYcLgamxI4S8J5lIdVCJGop6uFzrp1JkL2DpOoROb0z2IunSSC00HfwKlbdS'); // Replace with your Stripe public key

const CheckoutForm = ({ handleCheckout, address }) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      console.error(error);
      alert(error.message);
    } else {
      await handleCheckout(paymentMethod.id);
    }
  };

  return (
    <form onSubmit={handleSubmit} data-aos="fade-up">
      <CardElement className="border p-2 rounded-md" />
      <button
        type="submit"
        disabled={!stripe || !address}
        className="w-full min-[500px]:w-[100%] mx-auto flex justify-center bg-[#2f9800] rounded-sm items-center text-[#f5f5f5] mt-5 h-[45px]"
      >
        Pay
      </button>
    </form>
  );
};

function Cart() {
  const { cart, setCart } = useContext(DataContext);
  const [address, setAddress] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const storedUser = JSON.parse(sessionStorage.getItem("smeemly-user"));

  const user = storedUser.firstName;

  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration
      once: true, // Whether animation should happen only once - while scrolling down
    });
  }, []);

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

  const handleDeleteItem = (item) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this item?");
    if (confirmDelete) {
      const updatedCart = cart.filter((cartItem) => cartItem.id !== item.id);
      setCart(updatedCart);
      sessionStorage.setItem("cartItems", JSON.stringify(updatedCart));
    }
  };

  const subtotal = cart.reduce((acc, item) => acc + item.totalPrice, 0);
  const deliveryFee = 4.0;
  const finalTotal = subtotal + deliveryFee;

  const handleCheckout = async (paymentMethodId) => {
    if (!address) {
      alert("Please enter your address before proceeding to checkout.");
      return;
    }

    try {
      const stripe = await stripePromise;
      if (!stripe) {
        alert("Stripe is not available. Please try again later.");
        return;
      }

      const cartItems = JSON.parse(sessionStorage.getItem("cartItems")) || [];

      const response = await fetch('https://seemly-backend.onrender.com/api/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: cartItems,
          user: storedUser,
          total: finalTotal,
          paymentMethodId: paymentMethodId,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create payment intent. Please try again.');
      }

      const { clientSecret } = await response.json();

      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret);

      if (error) {
        throw new Error(error.message);
      }

      if (paymentIntent.status === 'succeeded') {
        console.log("Payment successful:", paymentIntent);

        const order = {
          paymentResponse: paymentIntent,
          items: cartItems,
          user: storedUser,
        };

        const apiResponse = await fetch('https://seemly-backend.onrender.com/api/order/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(order),
        });

        if (apiResponse.ok) {
          console.log('Order saved successfully');
          const orderData = await apiResponse.json();
          setOrderId(orderData.orderId);
          setIsModalOpen(true);
        } else {
          console.error('Failed to save order');
        }

        setCart([]);
        sessionStorage.removeItem("cartItems");
      }
    } catch (error) {
      console.error('Error:', error.message || error);
    }
  };

  return (
    <>
      <Nav />
      <section className="lg:mt-[160px] md:mt-[120px] mt-[60px] md:w-[90%] w-[80%] mx-auto flex md:flex-row flex-col md:gap-0 gap-10 justify-between">
        <div
          className="cart-orders lg:w-[60%] md:w-[60%] min-[500px]:w-[70%] mx-auto w-[100%]"
          data-aos="fade-right"
        >
          <h1 className="text-[25px] text-[#2f9800]">My Cart</h1>
          <div className="w-full h-[400px] overflow-scroll mt-5">
            {cart.length > 0 ? (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="order mt-2 w-full lg:h-[40%] h-auto border-t-[1px] border-[#ccc] pt-5 flex lg:flex-row flex-col gap-10 lg:gap-0 lg:items-center justify-between"
                  data-aos="fade-up"
                >
                  <div className="lg:w-[45%] w-[100%] flex gap-5 h-full items-center">
                    <img
                      src={item.image}
                      alt=""
                      className="md:w-[120px] w-[80px] h-[90px] object-cover border-2 border-[#ccc] rounded-md shadow-md"
                      data-aos="zoom-in"
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
                      data-aos="fade-left"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      value={item.quantity}
                      readOnly
                      className="w-[60px] text-center text-[14px] h-[30px] rounded-md outline-none border-2 border-[#00a2e2]"
                      data-aos="fade-up"
                    />
                    <button
                      onClick={() => increaseItem(item)}
                      className="text-lg font-bold w-8 h-8 flex items-center justify-center bg-[#f0f0f0] rounded-full shadow-md border border-[#ccc] hover:bg-[#ccc]"
                      data-aos="fade-right"
                    >
                      +
                    </button>
                    <p className="individual-total font-semibold text-[14px]">
                      ${item.totalPrice.toFixed(2)}
                    </p>
                    <FaTrash
                      className="text-[#2f9800] text-lg cursor-pointer hover:text-[#1e6b00]"
                      onClick={() => handleDeleteItem(item)}
                      data-aos="fade-down"
                    />
                  </div>
                </div>
              ))
            ) : (
              <div data-aos="fade-up">No items in cart</div>
            )}
          </div>
        </div>
        <div
          className="check-out md:w-[30%] min-[500px]:w-[60%] mx-auto"
          data-aos="fade-left"
        >
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
              data-aos="fade-up"
            />
          </div>
          <hr className="border-[0.5px] mt-7 border-[#ccc] w-full" />
          <div className="flex mt-10 justify-between">
            <p className="text-[20px] font-light">Total</p>
            <p className="text-[18px]">${finalTotal.toFixed(2)}</p>
          </div>
          <Elements stripe={stripePromise}>
            <CheckoutForm handleCheckout={handleCheckout} address={address} />
          </Elements>
        </div>
      </section>
      <Footer />

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96" data-aos="zoom-in">
            <h2 className="text-xl font-semibold text-center">Order Successful</h2>
            <p className="text-center mt-4">Your order has been successfully placed. Your Order is on it's way</p>
            <div className="mt-6 text-center">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Cart;