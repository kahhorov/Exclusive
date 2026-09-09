import React from 'react'
import Animate from '../Animate'
import SectionBanner from '../SectionBanner'
import { products } from '../../Data'

function Categories() {
    const iconProducts = products?.filter((p) => p.category === "icon")
    return (
        <div>
            <Animate text="Categories" />
            <SectionBanner text="Browse By Category" isTime={false} />
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6 md:gap-6 py-10">
                {iconProducts?.map((p) => {
                    return (
                        <div key={p.id} className={`border-gray-300 border rounded-md flex flex-col gap-4 justify-center items-center sm:py-8 ${p.color ? "bg-secondary-10 text-white" : ""}`}>
                            <img src={p.img} alt={p.title} className='w-14' />
                            <p>{p.title}</p>
                        </div>
                    )
                })}
            </div>
            <hr />
        </div>
    )
}

export default Categories