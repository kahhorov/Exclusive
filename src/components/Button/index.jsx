import React from 'react'

function Button({ text }) {
    return (
        <button className='bg-secondary-10 py-4 px-5 !text-white !rounded-sm'>{text}</button>
    )
}

export default Button