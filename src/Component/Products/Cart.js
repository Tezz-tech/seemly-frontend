import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import Nav from '../Partials/Nav';
import Footer from '../Partials/Footer';
import aboutUsImg1 from '../../static/img/aboutusImg1.jpg';
import { FaTrash } from 'react-icons/fa';

const stripePromise = loadStripe('YOUR_STRIPE_PUBLIC_KEY');

function Cart() {
    const [cartItems, setCartItems] = useState([]);
    const [address, setAddress] = useState('');

    useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem('cartItems')) || [];
        console.log('Loaded Cart Items:', savedCart); // Debugging
        setCartItems(savedCart);
    }, []);

    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    const handleQuantityChange = (e, itemId) => {
        const newQuantity = parseInt(e.target.value, 10);
        setCartItems(prevItems =>
            prevItems.map(item =>
                item.CartProductId === itemId
                    ? { ...item, quantity: newQuantity, total: item.CartProductAmount * newQuantity }
                    : item
            )
        );
    };

    const handleDeleteItem = (itemId) => {
        setCartItems(prevItems => prevItems.filter(item => item.CartProductId !== itemId));
    };

    const subtotal = cartItems.reduce((acc, item) => acc + (item.total || item.CartProductAmount * (item.quantity || 1)), 0);
    const deliveryFee = 4.0;
    const finalTotal = subtotal + deliveryFee;

    const handleCheckout = async () => {
        if (!address) {
            alert('Please enter your address before proceeding to checkout.');
            return;
        }

        const stripe = await stripePromise;

        const lineItems = cartItems.map(item => ({
            price: 'YOUR_PRICE_ID_FOR_THIS_ITEM',
            quantity: item.quantity || 1,
        }));

        try {
            await stripe.redirectToCheckout({
                lineItems,
                mode: 'payment',
                successUrl: `${window.location.origin}/success`,
                cancelUrl: `${window.location.origin}/cancel`,
            });
        } catch (error) {
            console.error('Stripe Checkout error:', error);
            alert('Failed to redirect to Stripe Checkout. Please try again.');
        }
    };

    return (
        <>
            <Nav />
            <section className="lg:mt-[160px] md:mt-[120px] mt-[60px] md:w-[90%] w-[80%] mx-auto flex md:flex-row flex-col md:gap-0 gap-10 justify-between">
                <div className="cart-orders lg:w-[60%] md:w-[60%] min-[500px]:w-[70%] mx-auto w-[100%]">
                    <h1 className="text-[25px] text-[#2f9800]">My Cart</h1>
                    <div className="w-full h-[400px] overflow-scroll mt-5">
                        {cartItems.length > 0 ? cartItems.map(item => (
                            <div key={item.CartProductId} className="order mt-2 w-full lg:h-[40%] h-auto border-t-[1px] border-[#ccc] pt-5 flex lg:flex-row flex-col gap-10 lg:gap-0 lg:items-center justify-between">
                                <div className="lg:w-[45%] w-[100%] flex gap-5 h-[100%]">
                                    <img src={aboutUsImg1} alt="" className="md:w-[120px] w-[60px] h-[80px] md:h-[90px] object-cover border-[1.5px] border-[#ccc]" />
                                    <div className="flex flex-row lg:flex-col justify-between lg:justify-normal">
                                        <p className="tracking-wide lg:w-auto md:w-[70%] w-[70%]">{item.CartProductName}</p>
                                        <p className="mt-5">${item.CartProductAmount}</p>
                                    </div>
                                </div>
                                <div className="md:w-[40%] w-[60%] h-full flex justify-between">
                                    <input
                                        type="number"
                                        value={item.quantity || 1}
                                        onChange={(e) => handleQuantityChange(e, item.CartProductId)}
                                        name="quantity"
                                        className="w-[60px] text-[10px] lg:text-[14px] h-[25px] pl-3 rounded-sm outline-none border-2 border-[#00a2e2]"
                                    />
                                    <p className="individual-total">${(item.total || (item.CartProductAmount * (item.quantity || 1))).toFixed(2)}</p>
                                    <FaTrash className="text-[#2f9800] cursor-pointer" onClick={() => handleDeleteItem(item.CartProductId)} />
                                </div>
                            </div>
                        )) : <div>No items in cart</div>}
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
                        className="w-full min-[500px]:w-[100%] mx-auto flex justify-center bg-[#2f9800] rounded-sm items-center text-[#f5f5f5] mt-5 h-[45px]">
                        Checkout
                    </button>
                </div>
            </section>
            <Footer />
        </>
    );
}

export default Cart;
