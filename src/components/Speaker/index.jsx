import React from 'react'
import speaker from '../../assets/speaker.png'
import RealTime from '../RealTime'

function Speaker() {
    return (
        <div className='lg:flex bg-black my-10 lg:pt-16 lg:pb-2 px-10'>
            <div className="w-1/2 flex flex-col gap-8">
                <p className='font-semibold text-green100'>Categories</p>
                <p className='w-full lg:w-[28.125rem] lg:text-5xl font-semibold text-white lg:leading-16'>Enhance Your Music Experience</p>
                <RealTime isStyle={true} />
                <button className='bg-green100 py-2 px-5 lg:py-4 lg:px-10 !text-white !rounded-md w-fit'>Buy Now</button>
            </div>
            <div className="w1/2">
                <img src={speaker} alt="Speaker" />
            </div>
        </div>
    )
}

export default Speaker