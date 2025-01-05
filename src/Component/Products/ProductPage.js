import React, { useState, useEffect } from 'react';
import Nav from '../Partials/Nav';
import Footer from '../Partials/Footer';
import aboutUsImg1 from '../../static/img/aboutusImg1.jpg';
import { useNavigate } from 'react-router-dom';

function ProductPage() {
    const navigate = useNavigate();

    // State to store products fetched from the API
    const [products, setProducts] = useState([]);

    // Fetch products from the API on component mount
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('https://seemly-backend.onrender.com/api/product'); // Replace with your API URL
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    return (
        <>
            <Nav />
            <div className='relative w-[100%] mx-auto'>
                
            </div>

            <div className='md:mt-[80px] sm:mt-[80px] mt-0 products-page lg:w-[100%] w-[90%] mx-auto h-[100%] lg:px-4 lg:pl-20 flex lg:gap-[5%] flex-wrap lg:justify-normal justify-between items-center'>
                {products.map((product) => (
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
                        className='product-cards cursor-pointer lg:w-[20%] md:w-[40%] w-[45%] lg:h-[450px] h-[350px] mt-[100px]'>
                        <img src={product.image} alt="" className='lg:h-[70%] h-[50%] lg:rounded-none rounded-md w-[100%] object-cover' />
                        <h1 className='font-light text-[13px] lg:text-[15px] mt-2'>{product.name}</h1>
                        <p className='font-medium tracking-wide h-[20%] lg:h-[10%] lg:text-[12px] text-[10px] mt-3'>
                            {product.description}
                        </p>
                        <p className='mt-5 font-semibold'>${`${product.price}.00`}</p>
                    </div>
                ))}
            </div>
            <Footer />
        </>
    );
}

export default ProductPage;
