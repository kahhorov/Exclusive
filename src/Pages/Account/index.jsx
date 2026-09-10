import React, { useState } from 'react'
import { Breadcrumb } from 'rsuite'

const sidebarLinks = [
    {
        id: 1,
        title: "Manage My Account",
        items: ["My Profile", "Address Book", "My Payment Options"],
    },
    {
        id: 2,
        title: "My Orders",
        items: ["My Returns", "My Cancellations"],
    },
    {
        id: 3,
        title: "My WishList",
        items: [],
    },
]

const initialForm = {
    firstName: "Md",
    lastName: "Rimel",
    email: "rimel1111@gmail.com",
    address: "Kingston, 5236, United State",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
}

function Account() {
    const [active, setActive] = useState("My Profile")
    const [form, setForm] = useState(initialForm)

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })

    }

    const handleSubmit = (e) => {
        e.preventDefault()
    }
    return (
        <div className='border-gray-300 border-t'>
            <div className="container py-10">

                {/* Breadcrumb */}
                <div className="flex justify-between items-center">
                    <Breadcrumb aria-label="breadcrumb" className='!mb-0'>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item className='text-black'>My Account</Breadcrumb.Item>
                    </Breadcrumb>
                    <p className="text-sm">
                        Welcome! <span className="text-secondary-10">{form.firstName} {form.lastName}</span>
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row gap-10 lg:gap-24 py-16">

                    {/* leftBar */}
                    <div className="w-full lg:max-w-[200px] flex flex-col gap-6">
                        {sidebarLinks.map((s) => (
                            <div key={s.id}>
                                <h3 className="!text-[15px] font-medium text-black">
                                    {s.title}
                                </h3>
                                {s.items && (
                                    <ul className="flex flex-col gap-2 !mt-3 !pl-9 !mb-0">
                                        {s.items.map((item, i) => (
                                            <li
                                                key={i + 1}
                                                onClick={() => setActive(item)}
                                                className={`text-[15px] cursor-pointer transition ${active === item
                                                    ? "text-secondary-10"
                                                    : "text-gray-500 hover:text-black"
                                                    }`}
                                            >
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="flex-1 bg-white rounded-sm shadow-[0_1px_13px_rgba(0,0,0,0.05)] px-6 py-8 lg:px-20 lg:py-10">
                        <h2 className="text-[20px] font-medium text-secondary-10 mb-4">
                            Edit Your Profile
                        </h2>

                        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
                                <div>
                                    <label className="block text-[15px] mb-2">First Name</label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        value={form.firstName}
                                        onChange={handleChange}
                                        className="w-full h-[50px] bg-gray-10 rounded-sm outline-none px-4 text-[15px] text-gray-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-[15px] mb-2">Last Name</label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        value={form.lastName}
                                        onChange={handleChange}
                                        className="w-full h-[50px] bg-gray-10 rounded-sm outline-none px-4 text-[15px] text-gray-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-[15px] mb-2">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={form.email}
                                        onChange={handleChange}
                                        className="w-full h-[50px] bg-gray-10 rounded-sm outline-none px-4 text-[15px] text-gray-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-[15px] mb-2">Address</label>
                                    <input
                                        type="text"
                                        name="address"
                                        value={form.address}
                                        onChange={handleChange}
                                        className="w-full h-[50px] bg-gray-10 rounded-sm outline-none px-4 text-[15px] text-gray-500"
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col gap-4">
                                <label className="block text-[15px]">Password Changes</label>
                                <input
                                    type="password"
                                    name="currentPassword"
                                    placeholder="Current Passwod"
                                    value={form.currentPassword}
                                    onChange={handleChange}
                                    className="w-full h-[50px] bg-gray-10 rounded-sm outline-none px-4 text-[15px]"
                                />
                                <input
                                    type="password"
                                    name="newPassword"
                                    placeholder="New Passwod"
                                    value={form.newPassword}
                                    onChange={handleChange}
                                    className="w-full h-[50px] bg-gray-10 rounded-sm outline-none px-4 text-[15px]"
                                />
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    placeholder="Confirm New Passwod"
                                    value={form.confirmPassword}
                                    onChange={handleChange}
                                    className="w-full h-[50px] bg-gray-10 rounded-sm outline-none px-4 text-[15px]"
                                />
                            </div>

                            <div className="flex justify-end items-center gap-8">
                                <button
                                    type="button"
                                    onClick={() => setForm(initialForm)}
                                    className="text-[15px] hover:text-secondary-10 transition"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="py-3 px-12 !rounded-sm bg-secondary-10 !text-white text-[15px]
                                    hover:bg-red-600 transition"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Account
