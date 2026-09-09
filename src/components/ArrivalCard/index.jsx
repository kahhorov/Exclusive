import { Link } from "react-router-dom"

function ArrivalCard({ img, title, text, className, imgClass }) {
    return (
        <div className={`relative bg-black overflow-hidden rounded-sm ${className}`}>
            <img src={img} alt={title} className={`w-full h-full ${imgClass}`} />
            <div className="absolute bottom-6 left-6 right-6 text-white">
                <h3 className='!text-white !text-xl lg:!text-2xl'>{title}</h3>
                <p className='text-sm text-gray-300 max-w-[250px] py-2'>{text}</p>
                <Link to="/#" className='!text-white border-b border-white pb-1 text-sm'>Shop Now</Link>
            </div>
        </div>
    )
}

export default ArrivalCard
