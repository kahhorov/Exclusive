import { useState } from 'react'
import { IoCartOutline, IoMenu } from 'react-icons/io5'
import { CiHeart, CiSearch } from 'react-icons/ci'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Drawer } from 'rsuite'
import CustomMenu from '../CustomMenu'
import { useProductCounts } from '../../Context/productContext'

const navLinks = [
    { id: 1, path: "/", text: "Home" },
    { id: 2, path: "contact", text: "Contact" },
    { id: 3, path: "about", text: "About" },
    { id: 4, path: "sign-up", text: "Sign Up" },
]

function CustomNavbar() {
    const [open, setOpen] = useState(false)
    const location = useLocation()
    const navigate = useNavigate()
    const { wishlistCount, cartCount } = useProductCounts()

    return (
        <nav className='flex items-center gap-4 py-4 px-4 
        container justify-between'>
            <h1 className='font-black !text-xl sm:!text-2xl'>Exclusive</h1>

            <ul className='hidden lg:flex gap-6 !p-0 !m-0'>
                {navLinks.map((l) => (
                    <li key={l.id}>
                        <Link to={l.path} className='!text-black'>{l.text}</Link>
                    </li>
                ))}
            </ul>

            <div className='flex items-center gap-3 sm:gap-6'>
                <div className="hidden sm:flex bg-gray-10 py-1.5 pl-2 pr-2 rounded-lg w-[200px] lg:w-[240px]">
                    <input type="text" className='outline-0 w-full bg-transparent' placeholder='What are you looking for?' />
                    <span className='px-1'> <CiSearch size={20} /></span>
                </div>
                {location.pathname !== "/sign-up" && location.pathname !== "/login" ?
                    <>
                        <button onClick={() => navigate("wishlist")}><CiHeart size={22} />
                            {wishlistCount > 0 && (
                                <span className="inline-flex items-center rounded-full bg-red-500 px-1.5 py-[.100rem] text-xs font-medium text-red-100 absolute top-3">
                                    {wishlistCount > 99 ? "99+" : wishlistCount}
                                </span>
                            )}
                        </button>
                        <button onClick={() => navigate("cart")}><IoCartOutline size={22} />
                            {cartCount > 0 && (
                                <span className="inline-flex items-center rounded-full bg-red-500 px-1.5 py-[.100rem] text-xs font-medium text-red-100 absolute top-3">
                                    {cartCount > 99 ? "99+" : cartCount}
                                </span>
                            )}
                        </button>
                        <CustomMenu />
                    </>
                    : ""}
                <button className='block lg:hidden' onClick={() => setOpen(true)}>
                    <IoMenu size={26} />
                </button>
            </div>
            <Drawer placement='left' size='xs' open={open} onClose={() => setOpen(false)}>
                <Drawer.Header>
                    <Drawer.Title className='font-black'>Exclusive</Drawer.Title>
                </Drawer.Header>
                <Drawer.Body>
                    <div className="flex sm:hidden bg-gray-10 py-1.5 px-2 rounded-lg mb-6">
                        <input type="text" className='outline-0 w-full bg-transparent' placeholder='What are you looking for?' />
                        <span className='px-1'> <CiSearch size={20} /></span>
                    </div>
                    <ul className='flex flex-col gap-5 !p-0 !m-0'>
                        {navLinks.map((l) => (
                            <li key={l.id}>
                                <Link
                                    to={l.path}
                                    onClick={() => setOpen(false)}
                                    className='!text-black hover:!text-secondary-10'
                                >
                                    {l.text}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </Drawer.Body>
            </Drawer>
        </nav >
    )
}

export default CustomNavbar
