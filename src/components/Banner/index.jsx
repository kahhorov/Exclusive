import React from 'react'
import { FaAngleRight } from 'react-icons/fa'
import { Carousel } from 'rsuite'
import CustomCarusel from '../CustomCarudel'

function Banner() {
    return (
        <div className='border-gray-400 border-t'>
            <div className="lg:flex container px-4">
                <div className="hidden lg:block w-1/6 pr-4 border-gray-400 border-r">
                    <ul className='flex flex-col gap-4 h-full pt-10'>
                        <li className='flex gap-2 items-center w-full'>Woman's Fashion <FaAngleRight className='ml-auto' /> </li>
                        <li className='flex gap-2 items-center w-full'>Men's Fashion <FaAngleRight className='ml-auto' /></li>
                        <li>
                            Electronics
                        </li>
                        <li>
                            Home & Lifestyle
                        </li>
                        <li>
                            Sports & Outdoor
                        </li>
                        <li>
                            Baby's & Toys
                        </li>
                        <li>
                            Groceries & Pets
                        </li>
                        <li>
                            Health & Beauty</li>
                    </ul>
                </div>
                <div className="flex-1 mt-6 lg:mt-10 lg:ml-10">
                    <Carousel autoplay className='w-full !h-[220px] sm:!h-[280px] lg:!h-[344px]'>
                        <div>
                            <CustomCarusel />
                        </div>
                        <div>
                            <CustomCarusel />
                        </div>
                        <div>
                            <CustomCarusel />
                        </div>
                    </Carousel>
                </div>
            </div>
        </div>
    )
}

export default Banner