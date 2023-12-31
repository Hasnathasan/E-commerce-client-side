import { useState } from 'react';
import './ProductCard.css'
import { Link } from 'react-router-dom';
const ProductCard = ({product}) => {
    const [hover, setHover] = useState(false)
    const { _id, specification, images, price } = product;
    return (
        <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} className='flex flex-col justify-between text-center hover-effect h-[340px] px-2 pt-5 relative'>
            <img className='h-[180px]' src={images?.[0]} alt="" />
            <div className=' p-2 space-y-2'>
            <h3 className='text-sm'>{specification?.title}</h3>
            <h4 className='text-sm text-gray-500'>{specification?.brand}</h4>
            <div className='flex justify-around items-end'>
                <h4 className='text-[15px] text-gray-700 line-through'>৳{price?.real_price}</h4>
                <h4 className=' font-semibold'>৳{price?.discounted_price}</h4>
                <h4 className='text-red-500 text-sm'>{parseInt(((price?.real_price-price?.discounted_price) / price?.real_price ) * 100)}% OFF</h4>
            </div>
            <Link to={`/details/${_id}`}><span className={`w-full bg-blue-500 py-[9px] text-white font-bold ${hover ? "visible": "invisible"} absolute left-0 bottom-0`}>View Details</span></Link>
            </div>
        </div>
    );
};

export default ProductCard;