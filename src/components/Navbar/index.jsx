
import Logo from '../../../public/Logo.png'
import { IoCartOutline } from 'react-icons/io5'
import { CiHeart, CiSearch } from 'react-icons/ci'
import { Link } from 'react-router-dom'

function CustomNavbar() {
    return (
        <nav className='flex items-center py-4  container justify-between'>
            {/* Logo */}
            <div>

                <h1 className='font-black !text-2xl'>Exclusive</h1>
            </div>
            <ul className='flex gap-6 !p-0 !m-0'>
                <li>
                    <Link to={'/'} className="!text-black">
                        Home
                    </Link>
                </li>
                <li>
                    <Link to={"contact"} className='!text-black'>Contact</Link>
                </li>
                <li><Link to={"about"} className='!text-black'>About</Link></li>
                <li><Link to={"sign-up"} className='!text-black'>Sign Up</Link></li>
            </ul>
            <div className='flex gap-6'>
                <div className="flex bg-gray-10 py-1.5 pl-2 pr-2 rounded-lg w-[240px]">
                    <input type="text" className='outline-0 w-[240px]' placeholder='What are you looking for?' />
                    <span className='px-1'> <CiSearch size={20} /></span>
                </div>
                <button><CiHeart size={22} /></button>
                <button><IoCartOutline size={22} /></button>
            </div>
        </nav >
    )
}

export default CustomNavbar