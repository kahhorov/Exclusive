import React from 'react'

function Animate({ text, minwidth }) {
    return (
        <div className=" flex gap-10">
            <div className="flex items-center text-center w-5 h-10 bg-secondary-10 rounded-sm cursor-pointer group hover:rounded-md hover:w-[130px] transition-all duration-200 ease-linear">
                <span className="ml-10 text-secondary-10 group-hover:text-white transition-colors duration-200 font-bold text-sm absolute">{text}</span>
            </div>
        </div >
    )
}

export default Animate