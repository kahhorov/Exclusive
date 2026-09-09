import { Link } from 'react-router-dom'
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaRegPaperPlane, FaTwitter } from 'react-icons/fa6'
import qrCode from '../../assets/qr-code.png'
import googlePlay from '../../assets/google-play.png'
import appStore from '../../assets/app-store.png'

const supports = [
    "111 Bijoy sarani, Dhaka, DH 1515, Bangladesh.",
    "exclusive@gmail.com",
    "+88015-88888-9999",
]

const accounts = ["My Account", "Login / Register", "Cart", "Wishlist", "Shop"]

const links = ["Privacy Policy", "Terms Of Use", "FAQ", "Contact"]

const socials = [
    { id: 1, icon: <FaFacebookF /> },
    { id: 2, icon: <FaTwitter /> },
    { id: 3, icon: <FaInstagram /> },
    { id: 4, icon: <FaLinkedinIn /> },
]

function Footer() {
    return (
        <footer className='bg-black text-white'>
            <div className="container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 py-16 px-4">
                <div className="flex flex-col gap-4">
                    <h3 className='!text-white !text-2xl'>Exclusive</h3>
                    <h4 className='!text-white !text-xl'>Subscribe</h4>
                    <p className='text-sm'>Get 10% off your first order</p>
                    <div className="flex items-center justify-between gap-2 border border-white rounded-sm px-3 py-2">
                        <input
                            type="email"
                            placeholder='Enter your email'
                            className='bg-transparent outline-none text-sm w-full placeholder:text-gray-400'
                        />
                        <FaRegPaperPlane className='shrink-0 cursor-pointer' size={20} />
                    </div>
                </div>

                <div className="flex flex-col gap-4">
                    <h4 className='!text-white !text-xl'>Support</h4>
                    {supports.map((s) => (
                        <p key={s} className='text-sm max-w-[220px]'>{s}</p>
                    ))}
                </div>

                <div className="flex flex-col gap-4">
                    <h4 className='!text-white !text-xl'>Account</h4>
                    {accounts.map((a) => (
                        <Link key={a} to="/#" className='!text-white text-sm hover:!text-secondary-10'>{a}</Link>
                    ))}
                </div>

                <div className="flex flex-col gap-4">
                    <h4 className='!text-white !text-xl'>Quick Link</h4>
                    {links.map((q) => (
                        <Link key={q} to="/#" className='!text-white text-sm hover:!text-secondary-10'>{q}</Link>
                    ))}
                </div>

                <div className="flex flex-col gap-4">
                    <h4 className='!text-white !text-xl'>Download App</h4>
                    <p className='text-xs text-gray-400'>Save $3 with App New User Only</p>
                    <div className="flex items-center gap-2">
                        <img src={qrCode} alt="QR Code" className='w-[80px] h-[80px] object-contain' />
                        <div className="flex flex-col gap-2">
                            <img src={googlePlay} alt="Google Play" className='w-[110px] object-contain' />
                            <img src={appStore} alt="App Store" className='w-[110px] object-contain' />
                        </div>
                    </div>
                    <div className="flex items-center gap-6 pt-2">
                        {socials.map((s) => (
                            <Link key={s.id} to="/#" className='!text-white hover:!text-secondary-10'>{s.icon}</Link>
                        ))}
                    </div>
                </div>
            </div>

            <div className="border-t border-gray-700 py-5 text-center text-sm text-gray-500">
                © Copyright Rimel 2022. All right reserved
            </div>
        </footer>
    )
}

export default Footer
