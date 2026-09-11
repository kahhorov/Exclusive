import React from 'react'
import { Breadcrumb } from 'rsuite'
import aboutImg from '../../assets/aboutImg.jpg'
import AboutReting from '../../components/AboutReting'

function About() {
    return (
        <div className='border-gray-300 border-t'>
            <Breadcrumb className='py-10 container'>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item className='text-black'>About</Breadcrumb.Item>
            </Breadcrumb>
            <div className="flex justify-between py-10">
                <div className="flex justify-center items-center w-1/2">
                    <div className='flex flex-col gap-4 w-[32.8125rem]'>
                        <h3>Our Story</h3>
                        <p>Launced in 2015, Exclusive is South Asia's premier online shopping makterplace with an active presense in Bangladesh. Supported by wide range of tailored marketing, data and service solutions, Exclusive has 10,500 sallers and 300 brands and serves 3 millioons customers across the region. </p>
                        <p>Exclusive has more than 1 Million products to offer, growing at a very fast. Exclusive offers a diverse assotment in categories ranging  from consumer.</p>
                    </div>
                </div>
                <div className='w-1/2 flex justify-end'>
                    <img src={aboutImg} alt="Abount Img" className='w-[705px]' />
                </div>
            </div>
            <AboutReting />
        </div>
    )
}

export default About