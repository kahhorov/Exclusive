import { FaArrowUp } from "react-icons/fa6"
import iconDelivery from "../../assets/icon-delivery.png"
import iconService from "../../assets/icon-service.png"
import iconSecure from "../../assets/icon-secure.png"

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

function Service() {
    const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" })

    return (
        <div className="py-16">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
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
            <div className="w-full flex justify-end pt-10">
                <button
                    onClick={scrollTop}
                    className="w-10 h-10 !rounded-full bg-gray-10 flex items-center justify-center hover:bg-secondary-10 hover:!text-white transition-colors duration-200"
                >
                    <FaArrowUp />
                </button>
            </div>
        </div>
    )
}

export default Service
