import React, { useState, useEffect } from 'react';
import Nav from '../Partials/Nav';
import Footer from '../Partials/Footer';
import { useNavigate } from 'react-router-dom';
import ClipLoader from "react-spinners/ClipLoader";
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import AOS styles

function ProductPage() {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [categories, setCategories] = useState(["All"]);
    const [selectedCategory, setSelectedCategory] = useState("All");

    // Initialize AOS
    useEffect(() => {
        AOS.init({
            duration: 1000, // Animation duration
            once: true, // Whether animation should happen only once - while scrolling down
        });
    }, []);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setIsLoading(true);
                const response = await fetch('https://seemly-backend.onrender.com/api/product');
                const data = await response.json();
                setProducts(data);

                // Extract unique categories and ensure "All" is the first category
                const uniqueCategories = [...new Set(data.map(product => product.category))];
                setCategories(["All", ...uniqueCategories]);
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProducts();
    }, []);

    // Filter products based on selected category
    const filteredProducts = selectedCategory === "All" ? products : products.filter(product => product.category === selectedCategory);

    return (
        <>
            <Nav />

            {/* Categories Section */}
            <div
                className="w-[90%] mx-auto mt-12 text-center"
                data-aos="fade-down"
            >
                <h2 className="text-xl font-semibold mb-6">Categories</h2>
                <div className="flex gap-4 overflow-x-auto justify-center">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`px-8 py-4 rounded-md ${
                                selectedCategory === category ? "bg-green-600 text-white" : "bg-gray-200 text-gray-700"
                            }`}
                            data-aos="fade-up"
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </div>

            <div
                className='md:mt-[80px] sm:mt-[80px] mt-0 products-page lg:w-[100%] w-[90%] mx-auto h-[100%] lg:px-4 lg:pl-20 flex lg:gap-[5%] flex-wrap lg:justify-normal justify-between items-center'
                data-aos="fade-up"
            >
                {isLoading ? (
                    <ClipLoader color="#2f9800" size={50} />
                ) : (
                    filteredProducts.map((product) => (
                        <div
                            key={product.id}
                            onClick={() => {
                                navigate(`/products/${product.name}`, {
                                    state: {
                                        productId: product.id,
                                        productName: product.name,
                                        productAmount: product.price,
                                        productDesc: product.description,
                                        productImage: product.image,
                                        productCategory: product.category
                                    }
                                });
                            }}
                            className='product-cards cursor-pointer lg:w-[20%] md:w-[40%] w-[45%] lg:h-[450px] h-[350px] mt-[100px]'
                            data-aos="fade-up"
                        >
                            <img
                                src={product.image}
                                alt=""
                                className='lg:h-[70%] h-[50%] lg:rounded-none rounded-md w-[100%] object-cover'
                                data-aos="zoom-in"
                            />
                            <h1 className='font-light text-[13px] lg:text-[15px] mt-2'>{product.name}</h1>
                            <p className='font-medium tracking-wide h-[20%] lg:h-[10%] lg:text-[12px] text-[10px] mt-3'>
                                {product.description}
                            </p>
                            <p className='mt-5 font-semibold'>${`${product.price}.00`}</p>
                        </div>
                    ))
                )}
            </div>

            <Footer />
        </>
    );
}

export default ProductPage;