import React from 'react'

function Button({ text, width }) {
    return (
        <button className={`bg-secondary-10 py-2 lg:py-4 ${width ? "lg:px-10 px-6" : "lg:px-5 px-3"
            } !rounded-sm !text-white`}>{text}</button>
    )
}

export default Button