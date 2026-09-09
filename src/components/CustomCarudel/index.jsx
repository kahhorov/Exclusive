import HerroImg from '../../assets/herro carusel.png'
import Apple from '../../assets/apple.png'
import { FaArrowRightLong } from 'react-icons/fa6'

function CustomCarusel() {
    return (
        <div className='flex !bg-black h-full'>
            <div className="flex flex-col gap-3 sm:gap-5 w-1/2 p-6 sm:p-10 lg:p-14">
                <div className="flex gap-3.5 items-center">
                    <img src={Apple} alt="" className='w-6 sm:w-10' />
                    <span className='text-white text-xs sm:text-base'>iPhone 14 Series</span>
                </div>
                <p className='text-xl sm:text-3xl lg:text-5xl text-white font-semibold'>Up to 10% <br /> off Voucher</p>
                <button className='!text-white underline flex items-center gap-2 text-sm sm:text-base'>Shop Now <FaArrowRightLong /></button>
            </div>
            <div className="w-1/2 flex items-center justify-center mt-4">
                <img src={HerroImg} alt="Herro img" className='w-full max-w-[27rem] p-0 m-0' />
            </div>
        </div>
    )
}

export default CustomCarusel