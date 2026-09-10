import React, { useState } from 'react'
import { IoCallOutline } from 'react-icons/io5'
import { MdOutlineMailOutline } from 'react-icons/md'
import { Breadcrumb, Textarea } from 'rsuite'
import Button from '../../components/Button'

const workTime = {
    name: "Call To Us",
    text: "We are available 24/7, 7 days a week.",
    phone: "+8801611112222"
}
const message = {
    name: "Write To US",
    text: "Fill out our form and we will contact you within 24 hours.",
    customEmail: "Emails: customer@exclusive.com",
    email: "Emails: support@exclusive.com"
}

function Contact() {
    const [inputs, setInputs] = useState({
        name: "",
        email: "",
        phone: ""
    });

    function handleChange(e) {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value
        });
    }
    return (
        <div className='border-gray-300 border-t'>
            <div className="container py-10">

                <Breadcrumb aria-label="breadcrumb" className='!mb-0 py-10'>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item className='text-black'>Contact</Breadcrumb.Item>
                </Breadcrumb>
                <div className="flex gap-8 justify-between py-10">
                    <div className="w-1/4 shadow-gray-300 shadow-xl rounded-md py-8 px-10">
                        <div>
                            <div className='flex items-center gap-3 py-6'>
                                <span className='flex justify-center items-center bg-secondary-10 text-white w-8 h-8 rounded-full'><IoCallOutline /> </span>
                                <p className='font-bold'>{workTime.name}</p>
                            </div>
                            <div className="flex flex-col gap-4">
                                <p>{workTime.text}</p>
                                <p>Phone: {workTime.phone}</p>
                            </div>
                        </div>
                        <hr className='border-gray-300 !border-t-2' />
                        <div>
                            <div className='flex items-center gap-3 py-6'>
                                <span className='flex justify-center items-center bg-secondary-10 text-white w-8 h-8 rounded-full'><MdOutlineMailOutline /> </span>
                                <p className='font-bold'>{message.name}</p>
                            </div>
                            <div className="flex flex-col gap-4">
                                <p>{message.text}</p>
                                <p>{message.customEmail}</p>
                                <p>{message.email}</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex-1 shadow-gray-300 shadow-md rounded-lg py-10 px-6">
                        <div className='flex gap-4'>
                            <div className="relative w-full">
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Your Name"
                                    value={inputs.name}
                                    onChange={handleChange}
                                    className="w-full rounded-lg border bg-gray-10 border-gray-200 px-7 py-3 outline-none placeholder:text-gray-400"
                                />

                                {inputs.name.length < 1 && <span className="absolute left-26 top-1/2 -translate-y-1/2 text-red-500 pointer-events-none">
                                    *
                                </span>}
                            </div>
                            <div className="relative w-full">
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Your Email"
                                    value={inputs.email}
                                    onChange={handleChange}
                                    className="w-full rounded-lg border bg-gray-10 border-gray-200 px-7 py-3 outline-none placeholder:text-gray-400"
                                />

                                {inputs.email.length < 1 && <span className="absolute left-26 top-1/2 -translate-y-1/2 text-red-500 pointer-events-none">
                                    *
                                </span>}
                            </div>
                            <div className="relative w-full">
                                <input
                                    type="text"
                                    name="phone"
                                    placeholder="Your Phone"
                                    value={inputs.phone}
                                    onChange={handleChange}
                                    className="w-full rounded-lg border bg-gray-10 border-gray-200 px-7 py-3 outline-none placeholder:text-gray-400"
                                />

                                {inputs.phone.length < 1 && <span className="absolute left-26 top-1/2 -translate-y-1/2 text-red-500 pointer-events-none">
                                    *
                                </span>}
                            </div>
                        </div>
                        <div className="mt-10">
                            <Textarea placeholder="Your Message" h={207} />
                            <div className='flex justify-end mt-5'>

                                <Button text={"Send Message"} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Contact