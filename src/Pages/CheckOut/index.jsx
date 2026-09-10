import React, { useState } from 'react'
import { Breadcrumb } from 'rsuite'
import img1 from '../../assets/1.png'
import img3 from '../../assets/3.png'
import payments from '../../assets/payments.png'

const products = [
    {
        id: 1,
        img: img3,
        title: "LCD Monitor",
        price: 650,
        pCount: 1,
    },
    {
        id: 2,
        img: img1,
        title: "H1 Gamepad",
        price: 1100,
        pCount: 1,
    },
]

function CheckOut() {
    const [payment, setPayment] = useState("cash")

    const subtotal = products.reduce((sum, item) => sum + item.price * item.pCount, 0)
    const shipping = 0
    const total = subtotal + shipping

    return (
        <div className='border-gray-300 border-t'>
            <div className="container py-10">

                {/* Breadcrumb */}
                <Breadcrumb aria-label="breadcrumb">
                    <Breadcrumb.Item>Account /</Breadcrumb.Item>
                    <Breadcrumb.Item>My Account /</Breadcrumb.Item>
                    <Breadcrumb.Item>Product /</Breadcrumb.Item>
                    <Breadcrumb.Item>View Cart /</Breadcrumb.Item>
                    <Breadcrumb.Item className='text-black'>CheckOut</Breadcrumb.Item>
                </Breadcrumb>
                <div className="flex justify-between py-10">
                    <div className="w-full max-w-[327px]">
                        <h2 className="text-[20px] font-medium text-[#111] mb-[23px]">
                            Billing Details
                        </h2>

                        <form className="flex flex-col gap-[16px]">
                            <div>
                                <label className="block text-[11px] text-[#999] mb-[5px]">
                                    First Name<span className="text-[#e85b5b]">*</span>
                                </label>

                                <input
                                    type="text"
                                    className="w-full h-[27px] bg-[#f5f5f5] border-none outline-none px-2 text-[11px]"
                                />
                            </div>

                            <div>
                                <label className="block text-[11px] text-[#999] mb-[5px]">
                                    Company Name
                                </label>

                                <input
                                    type="text"
                                    className="w-full h-[27px] bg-[#f5f5f5] border-none outline-none px-2 text-[11px]"
                                />
                            </div>

                            <div>
                                <label className="block text-[11px] text-[#999] mb-[5px]">
                                    Street Address<span className="text-[#e85b5b]">*</span>
                                </label>

                                <input
                                    type="text"
                                    className="w-full h-[27px] bg-[#f5f5f5] border-none outline-none px-2 text-[11px]"
                                />
                            </div>

                            <div>
                                <label className="block text-[11px] text-[#999] mb-[5px]">
                                    Apartment, floor, etc. (optional)
                                </label>

                                <input
                                    type="text"
                                    className="w-full h-[27px] bg-[#f5f5f5] border-none outline-none px-2 text-[11px]"
                                />
                            </div>

                            <div>
                                <label className="block text-[11px] text-[#999] mb-[5px]">
                                    Town/City<span className="text-[#e85b5b]">*</span>
                                </label>

                                <input
                                    type="text"
                                    className="w-full h-[27px] bg-[#f5f5f5] border-none outline-none px-2 text-[11px]"
                                />
                            </div>

                            <div>
                                <label className="block text-[11px] text-[#999] mb-[5px]">
                                    Phone Number<span className="text-[#e85b5b]">*</span>
                                </label>

                                <input
                                    type="text"
                                    className="w-full h-[27px] bg-[#f5f5f5] border-none outline-none px-2 text-[11px]"
                                />
                            </div>

                            <div>
                                <label className="block text-[11px] text-[#999] mb-[5px]">
                                    Email Address<span className="text-[#e85b5b]">*</span>
                                </label>

                                <input
                                    type="email"
                                    className="w-full h-[27px] bg-[#f5f5f5] border-none outline-none px-2 text-[11px]"
                                />
                            </div>

                            <label className="flex items-center gap-[8px] mt-[1px] cursor-pointer">
                                <input
                                    type="checkbox"
                                    defaultChecked
                                    className="appearance-none w-[13px] h-[13px] rounded-[2px] bg-[#e84c4c] relative
                                    checked:after:content-['✓']
                                    checked:after:absolute
                                    checked:after:text-white
                                    checked:after:text-[10px]
                                    checked:after:font-bold
                                    checked:after:left-[2px]
                                    checked:after:top-[-1px]"
                                />

                                <span className="text-[12px] text-[#222] ">
                                    Save this information for faster check-out next time
                                </span>
                            </label>
                        </form>
                    </div>
                    <div className="w-full max-w-[425px] pt-[45px]">

                        <div className="flex flex-col gap-[22px] mb-[22px]">
                            {products.map((item) => (
                                <div key={item.id} className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <img
                                            src={item.img}
                                            alt={item.title}
                                            className="w-[40px] h-[40px] object-contain"
                                        />
                                        <p className="text-sm">{item.title}</p>
                                    </div>
                                    <p className="text-sm">${item.price * item.pCount}</p>
                                </div>
                            ))}
                        </div>

                        <div className="flex justify-between items-center pb-3 border-b border-gray-400 text-sm">
                            <span>Subtotal:</span>
                            <span>${subtotal}</span>
                        </div>

                        <div className="flex justify-between items-center py-3 border-b border-gray-400 text-sm">
                            <span>Shipping:</span>
                            <span>{shipping === 0 ? "Free" : `$${shipping}`}</span>
                        </div>

                        <div className="flex justify-between items-center py-3 text-sm">
                            <span>Total:</span>
                            <span>${total}</span>
                        </div>

                        <div className="flex flex-col gap-5 mt-3">
                            <label className="flex items-center justify-between cursor-pointer">
                                <div className="flex items-center gap-3">
                                    <input
                                        type="radio"
                                        name="payment"
                                        value="bank"
                                        checked={payment === "bank"}
                                        onChange={(e) => setPayment(e.target.value)}
                                        className="w-[18px] h-[18px] accent-black cursor-pointer"
                                    />
                                    <span className="text-sm">Bank</span>
                                </div>
                                <img src={payments} alt="payments" className="h-[20px] object-contain" />
                            </label>

                            <label className="flex items-center gap-3 cursor-pointer">
                                <input
                                    type="radio"
                                    name="payment"
                                    value="cash"
                                    checked={payment === "cash"}
                                    onChange={(e) => setPayment(e.target.value)}
                                    className="w-[18px] h-[18px] accent-black cursor-pointer"
                                />
                                <span className="text-sm">Cash on delivery</span>
                            </label>
                        </div>

                        <div className="flex items-center gap-3 mt-6">
                            <input
                                type="text"
                                placeholder="Coupon Code"
                                className="flex-1 h-[46px] px-4 border border-gray-400 rounded-md
                                outline-none text-sm focus:border-black"
                            />
                            <button
                                className="h-[46px] px-8 rounded-md bg-red-500 !text-white text-sm
                                hover:bg-red-600 transition"
                            >
                                Apply Coupon
                            </button>
                        </div>

                        <button
                            className="h-[46px] px-10 !mt-6 rounded-md bg-red-500 !text-white text-sm
                            hover:bg-red-600 transition"
                        >
                            Place Order
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CheckOut