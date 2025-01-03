import { React, useEffect, useState } from 'react';
import logo from '../../static/img/logo.png';
import { FaSearch, FaShoppingCart, FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function Nav() {
    const [cartCount, setCartCount] = useState(0);
    const [openNav, setOpenNav] = useState(false);
    const [user, setUser] = useState(null);
    const [showLogoutModal, setShowLogoutModal] = useState(false); // State for the modal

    useEffect(() => {
        const storedCartCount = localStorage.getItem('cartCount');
        if (storedCartCount) {
            setCartCount(parseInt(storedCartCount));
        }

        const storedUser = JSON.parse(localStorage.getItem("smeemly-user"));
        if (storedUser) {
            setUser(storedUser);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("smeemly-token");
        localStorage.removeItem("smeemly-user");
        setUser(null);
        setShowLogoutModal(false); // Close modal after logout
    };

    return (
        <>
            <div className='lg:hidden md:hidden sm:hidden  flex px-2 sm:px-5 md:px-5 justify-between w-full items-center h-[80px] navbar'>
                <div className='w-[10%] md:w-[8%] sm:w-[8%]  min-[500px]:w-[8%]'>
                    <img src={logo} alt="" className='w-[100%]' />
                </div>
                <div className='w-[8%] md:w-[5%] sm:w-[5%] h-[100%]  min-[500px]:w-[5%] flex flex-col gap-2 justify-center' onClick={() => setOpenNav(true)}>
                    <div className='w-[100%] h-[4px] rounded-md bg-[#00a2e2]'></div>
                    <div className='w-[100%] h-[4px] rounded-md bg-[#00a2e2]'></div>
                    <div className='w-[100%] h-[4px] rounded-md bg-[#00a2e2]'></div>
                </div>
            </div>
            <nav className={`lg:w-full md:w-full md:left-0 sm:left-0 min-[670px]:w-full md:px-2 sm:px-2 w-[100vw] lg:left-0 ${openNav ? `left-[0]` : `left-[100%]`} transition-[0.4s] linear delay-[0.2px]  fixed  navbar h-[100vh] sm:h-[80px] md:h-[80px] z-40 top-0 lg:px-[5%] flex md:flex-row sm:flex-row flex-col items-center`}>
                <div className='pt-5 md:hidden sm:hidden'><FaArrowLeft onClick={() => setOpenNav(false)} className='self-start text-[15px] text-[#2f9800]' /></div>
                {/* =================== LOGO DIV  =================== */}
                <div className='Logo w-[20%] md:mt-0 sm:mt-0 mt-5 md:w-[4%] sm:w-[8%] md:[8%]'>
                    <img src={logo} alt="" className='w-[100%]' />
                </div>

                {/* =================== NAV ITEMS =================== */}
                <div className='nav-links md:ml-[40px] lg:ml-[80px] sm:ml-[20px]  md:text-[10px]  mt-10 md:mt-0 sm:mt-0 mr-5 flex flex-col md:flex-row sm:flex-row items-center justify-between sm:w-[40%] md:w-[30%] w-[30%] h-[30%] sm:h-full md:h-full'>
                    <Link to='/'>
                        <li className='w-fit md:text-[10px] sm:text-[10px]'><a href="#" className='100%'>Home</a></li>
                    </Link>

                    <Link to='/products'>
                        <li className='w-fit md:text-[10px] sm:text-[10px]'><a href="#" className='100%'>Products</a></li>
                    </Link>
                    <Link to='/contact'>
                        <li className='w-fit md:text-[10px] sm:text-[10px]'><a href="#" className='100%'>Contact Us</a></li>
                    </Link>
                </div>

                {/* =================== SEARCH BAR  =================== */}
                <div className='search-bar w-[80%]  sm:w-[30%] md:mt-0 sm:mt-0 mt-10 h-[8%] md:h-[60%] sm:h-[60%]  rounded-md md:w-[30%]  lg:h-[50%] lg:ml-[50px] bg-[white] flex gap-[2px] items-center'>
                    <input type="text" className='w-[90%] h-[100%] outline-none pl-5 font-Roboto rounded-[10px] bg-transparent placeholder:text-[#2f9800]  placeholder:text-[11px]  ' placeholder='Search item...' />
                    <button onClick={() => { console.log('Searching') }} className='w-[10%] sm:w-[5%] md:h-[100%]  flex items-center justify-center  '><FaSearch className=' text-[#2f9800]' /></button>
                </div>

                {/* =================== USER GREETING =================== */}
                <div className='user-greeting md:w-[10%] sm:w-[20%] mt-10 md:mt-0 sm:mt-0 mx-auto w-[60%]  lg:w-[15%] h-[8%] sm:h-[50%] md:h-[50%] sm:ml-[10px] lg:ml-[5%]'>
                    {user ? (
                        <div className='flex items-center justify-between'>
                        <span className='text-[#2f9800] text-md font-semibold'>Welcome, {user.firstName}!</span> {/* Increased font size and added boldness */}
                        <button 
                            onClick={() => setShowLogoutModal(true)} 
                            className='ml-2 bg-red-500 text-white rounded px-4 py-2'> {/* Increased padding for the button */}
                            Logout
                        </button>
                    </div>
                    ) : (
                        <Link to="/login">
                            <button className='w-full bg-[#00a2e2] h-[100%] rounded-md transition-[0.5s] ease-in text-[#f5f5f5]'>Log in</button>
                        </Link>
                    )}
                </div>

                {/* =================== CART ICONS  =================== */}
                <div className='cart w-[10%] mt-5 md:mt-0  sm:mt-0 sm:ml-[10px] md:ml-0  lg:ml-[8%] mx-auto'>
                    <Link to='/cart' className='flex items-center gap-2'>
                        <FaShoppingCart className='text-[20px] sm:text-[12px] text-[#2f9800]' />
                        <div className='nav-cart-info w-[20%] flex flex-col justify-center gap-[4px]'>
                            <div className='lg:w-[100%] w-[30px] lg:h-[40%] h-[60%] flex justify-center items-center bg-white rounded-full'><h6>{cartCount}</h6></div>
                            <h6 className='text-[12px] font-[600] text-[#2f9800]'>Cart</h6>
                        </div>
                    </Link>
                </div>
            </nav>

            {/* =================== LOGOUT CONFIRMATION MODAL =================== */}
            {showLogoutModal && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg p-5 w-80">
                        <h2 className="text-lg font-semibold mb-4">Confirm Logout</h2>
                        <p>Are you sure you want to logout?</p>
                        <div className="flex justify-end mt-4">
                            <button onClick={() => setShowLogoutModal(false)} className="mr-2 px-4 py-2 bg-gray-300 text-black rounded">Cancel</button>
                            <button onClick={handleLogout} className="px-4 py-2 bg-red-500 text-white rounded">Confirm</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Nav;
