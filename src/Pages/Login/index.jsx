import React, { useState } from 'react'
import sideImage from '../../assets/side-image.png'

function Login() {
    const [form, setForm] = useState({ email: "", password: "" })

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const email = form.email
        const password = form.password

        if (email.trim() === "" || password.trim() === "") {
            alert("Barcha maydonni to'ldiring!");
        } else if (password.trim().length < 5) {
            alert("Parol kamida 5 ta belgidan iborat bo'lsin!");
        } else if (!/\d/.test(password)) {
            alert("Parolda kamida 1 ta raqam ishtirok etsin!");
        } else {
            console.log(form);
            setForm({ email: "", password: "" })
        }
    }

    return (
        <div className='lg:flex items-center gap-16 xl:gap-32 mb-10 pt-10 lg:mb-16 border-gray-300 border-t'>
            <div className="lg:w-1/2">
                <img src={sideImage} alt="Log in" className='w-full object-cover' />
            </div>

            <div className="lg:w-1/2 flex justify-center px-6 mt-10 lg:mt-0">
                <form onSubmit={handleSubmit} className='w-full max-w-[23.5rem] flex flex-col gap-8'>
                    <div className="flex flex-col gap-4">
                        <h2 className='text-3xl lg:text-4xl font-medium tracking-[0.06em]'>Log in to Exclusive</h2>
                        <p className='text-base'>Enter your details below</p>
                    </div>

                    <div className="flex flex-col gap-10">
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder='Email or Phone Number'
                            className='border-b border-black/30 pb-2 outline-none placeholder:text-black/40 focus:border-black'
                        />
                        <input
                            type="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            placeholder='Password'
                            className='border-b border-black/30 pb-2 outline-none placeholder:text-black/40 focus:border-black'
                        />
                    </div>

                    <div className="flex items-center justify-between gap-4">
                        <button
                            type='submit'
                            className='bg-secondary-10 py-4 px-12 !rounded-sm !text-white cursor-pointer'
                        >
                            Log In
                        </button>
                        <button
                            type='button'
                            className='text-secondary-10 cursor-pointer'
                        >
                            Forget Password?
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login