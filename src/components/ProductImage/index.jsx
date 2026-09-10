import { FaRegEye, FaRegHeart } from 'react-icons/fa6'

function ProductImage({ src, alt, isNew, height = 288, discount, productId }) {

    function handleSaveHeart(id) {
        console.log(id);
    }

    return (
        <div
            className="relative w-full shrink-0 p-2 bg-gray-100 flex items-center justify-center overflow-hidden"
            style={{ height }}
        >
            {isNew && (
                <span className='absolute top-3 left-3 bg-green100 text-white text-xs px-3 py-1 rounded-sm'>NEW</span>
            )}
            {discount &&
                <span className='absolute top-3 left-3 bg-secondary-10 text-white text-xs px-3 py-1 rounded-sm'>-{discount}%</span>
            }
            <div className="absolute top-3 right-3 flex flex-col gap-2 ">
                <button onClick={() => handleSaveHeart(productId)} className='w-8 h-8 !rounded-full bg-white flex items-center justify-center hover:bg-secondary-10 hover:!text-white transition-colors duration-200'>
                    <FaRegHeart />
                </button>
                <button className='w-8 h-8 !rounded-full bg-white flex items-center justify-center hover:bg-secondary-10 hover:!text-white transition-colors duration-200'>
                    <FaRegEye />
                </button>
            </div>
            <img
                src={src}
                alt={alt}
                className="w-full h-full object-contain"
            />
            <button className='absolute bottom-0 left-0 w-full bg-black !text-white py-2 translate-y-full group-hover:translate-y-0 transition-transform duration-200 ease-linear'>
                Add To Cart
            </button>
        </div>
    )
}

export default ProductImage
