import { FaInstagram } from 'react-icons/fa6'
import { RiLinkedinLine } from "react-icons/ri";
import { CiTwitter } from "react-icons/ci";

import Img1 from '../../assets/svg/icon1.svg'
import Img2 from '../../assets/svg/icon2.svg'
import Img3 from '../../assets/svg/icon3.svg'
import Img4 from '../../assets/svg/icon4.svg'
import wImg1 from '../../assets/w1.png'
import wImg2 from '../../assets/w2.png'
import wImg3 from '../../assets/w3.png'
import dot from '../../assets/svg/dot.svg'
import iconDelivery from "../../assets/icon-delivery.png"
import iconService from "../../assets/icon-service.png"
import iconSecure from "../../assets/icon-secure.png"

const style = "border-gray-300 border-2 flex flex-col justify-center items-center text-center gap-4 py-8 rounded-md shadow-gray-300 shadow-lg cursor-pointer hover:shadow-gray-600 hover:shadow-2xl hover:border-gray-600/80 hover:border-2  hover:text-white hover:bg-gray-900/80 transition-all duration-200 ease-linear"
const roundedStyle = "w-16 h-16 rounded-full flex justify-center items-center bg-gray-400/50"

const retings = [
    {
        img: Img1,
        reting: 10.5,
        text: "Sallers active our site"
        , style: "bg-black w-10 h-10 rounded-full flex justify-center items-center",
        cardStyle: style,
        roundedStyle
    },
    {
        img: Img2,
        reting: 33,
        text: "Mopnthly Produduct Sale",
        style: "bg-white !text-black w-10 h-10 rounded-full flex justify-center items-center",
        cardStyle: "bg-secondary-10 text-white flex flex-col justify-center items-center text-center gap-4 py-8 rounded-md shadow-red-400 shadow-xl hover:shadow-red-400/80 hover:shadow-2xl cursor-pointer  hover:text-white hover:bg-red-100/80 hover:!text-black transition-all duration-200 ease-linear",
        roundedStyle: "w-16 h-16 rounded-full flex justify-center items-center bg-gray-300/50"
    },
    {
        img: Img3,
        reting: 45.5,
        text: "Customer active in our site",
        style: "bg-black w-10 h-10 rounded-full flex justify-center items-center",
        cardStyle: style,
        roundedStyle
    },
    {
        img: Img4,
        reting: 25,
        text: "Anual gross sale in our site",
        style: "bg-black w-10 h-10 rounded-full flex justify-center items-center",
        cardStyle: style,
        roundedStyle
    },
]
const workers = [
    {
        workerImg: wImg1,
        name: "Tom Cruise",
        job: "Founder & Chairman",
        socals: [<CiTwitter />, <FaInstagram />, <RiLinkedinLine />]
    },
    {
        workerImg: wImg2,
        name: "Emma Watson",
        job: "Managing Director",
        socals: [<CiTwitter />, <FaInstagram />, <RiLinkedinLine />]
    },
    {
        workerImg: wImg3,
        name: "Will Smith",
        job: "Product Designer",
        socals: [<CiTwitter />, <FaInstagram />, <RiLinkedinLine />]
    }
]
const services = [
    {
        id: 1,
        icon: iconDelivery,
        title: "FREE AND FAST DELIVERY",
        text: "Free delivery for all orders over $140",
    },
    {
        id: 2,
        icon: iconService,
        title: "24/7 CUSTOMER SERVICE",
        text: "Friendly 24/7 customer support",
    },
    {
        id: 3,
        icon: iconSecure,
        title: "MONEY BACK GUARANTEE",
        text: "We reurn money within 30 days",
    },
]

function AboutReting() {
    return (
        <div>
            <div className="container justify-center">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 py-16">
                    {retings.map((r, i) => {
                        return (
                            <div key={i + 1} className={r.cardStyle}>
                                <div className={r.roundedStyle}>
                                    <div className={r.style}>
                                        <img src={r.img} alt={r.text} className='w-8' />
                                    </div>
                                </div>
                                <div className='flex flex-col gap-3'>
                                    <h4>{r.reting}</h4>
                                    <p>{r.text}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-16">
                    {workers?.map((w, i) => {
                        return (
                            <div key={i + 1}>
                                <div className="bg-gray-10 rounded-md pt-10 flex justify-center items-center lg:h-[430px]">
                                    <img src={w.workerImg} alt="" className='object-contain' />
                                </div>
                                <div className='py-8 flex flex-col gap-2'>
                                    <p className='text-2xl font-medium'>{w.name}</p>
                                    <p>{w.job}</p>
                                    <div className='flex gap-4 pt-2'>
                                        {w.socals.map((s, i) => {
                                            return <p key={i + 1} className='text-lg'>{s}</p>
                                        })}
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className="w-full flex justify-center py-10">
                <img src={dot} alt="" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-1 items-center container lg:h-[300px]">
                {services.map((s) => {
                    return (
                        <div key={s.id} className="flex flex-col items-center text-center gap-3">
                            <div className="w-[54px] h-[54px] rounded-full bg-gray-300 flex items-center justify-center">
                                <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center">
                                    <img src={s.icon} alt={s.title} className="w-6 h-6 object-contain" />
                                </div>
                            </div>
                            <h4 className="!text-base font-bold">{s.title}</h4>
                            <p className="text-sm">{s.text}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default AboutReting