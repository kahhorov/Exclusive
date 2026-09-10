import React from 'react'

function OutlineButton({ text }) {
    return (
        <button className="!border-gray-300 !border-2 !py-0.5 !px-5 lg:!py-2 lg:!px-10 !rounded-sm hover:bg-gray-300">{text}</button>

    )
}

export default OutlineButton