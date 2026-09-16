import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import sideImage from '../../assets/side-image.png'
import googleIcon from '../../assets/icon-google.png'
import api from '../../Axios/Api'
import { toast } from 'react-toastify'

function SignUp() {
    const navigate = useNavigate()
    const [form, setForm] = useState({ fullName: "", email: "", password: "" })

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await api.post("user/register/", { first_name: form.fullName, email_or_phone: form.email, password: form.password })
            toast.success(res.data.message)
            navigate("/login")
        } catch (error) {
            toast.warning("Bu hisob allaqachon ro'yxatdan o'tgan")
        }


    }
    return (
        <div className='lg:flex items-center gap-16 xl:gap-32 mb-10 pt-10 lg:mb-16 border-gray-300 border-t'>
            <div className="lg:w-1/2">
                <img src={sideImage} alt="Sign up" className='w-full object-cover' />
            </div>

            <div className="lg:w-1/2 flex justify-center px-6 mt-10 lg:mt-0">
                <form onSubmit={handleSubmit} className='w-full max-w-[23.5rem] flex flex-col gap-8'>
                    <div className="flex flex-col gap-4">
                        <h2 className='text-3xl lg:text-4xl font-medium tracking-[0.06em]'>Create an account</h2>
                        <p className='text-base'>Enter your details below</p>
                    </div>

                    <div className="flex flex-col gap-10">
                        <input
                            type="text"
                            name="fullName"
                            value={form.fullName}
                            onChange={handleChange}
                            placeholder='full Name'
                            className='border-b border-black/30 pb-2 outline-none placeholder:text-black/40 focus:border-black'
                        />
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder='Email or Phone Number'
                            className='border-b border-black/30 pb-2 outline-none placeholder:text-black/40 focus:border-black'
                        />
                        <input
                            type="text"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            placeholder='Password'
                            className='border-b border-black/30 pb-2 outline-none placeholder:text-black/40 focus:border-black'
                        />
                    </div>

                    <div className="flex flex-col gap-4">
                        <button
                            type='submit'
                            className='bg-secondary-10 py-4 !rounded-sm !text-white cursor-pointer'
                        >
                            Create Account
                        </button>
                        <button
                            type='button'
                            className='flex items-center justify-center gap-4 py-4  border-gray-300 !border !rounded-sm cursor-pointer'
                        >
                            <img src={googleIcon} alt="Google" className='w-6 h-6' />
                            Sign up with Google
                        </button>
                    </div>

                    <div className="flex items-center justify-center gap-4">
                        <p className='text-black/70'>Already have account?</p>
                        <Link to="/login" className='font-medium border-b border-black/40 pb-1'>Log in</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignUp
