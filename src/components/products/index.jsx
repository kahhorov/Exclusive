import React from 'react'
import CustomCard from '../CustomCard'

// products images
import product1 from '../../assets/1.png'
import product2 from '../../assets/2.png'
import product3 from '../../assets/3.png'
import product4 from '../../assets/4.png'

const products = [
    {
        id: 1,
        img: product1,
        title: "HAVIT HV-G92 Gamepad",
        price: 120,
        discountedPrice: 160,
        discount: 40,
        reting: 5,
        comment: 88
    },
    {
        id: 2,
        img: product2,
        title: "AK-900 Wired Keyboard",
        price: 960,
        discountedPrice: 1160,
        discount: 35,
        reting: 4,
        comment: 75
    },
    {
        id: 3,
        img: product3,
        title: "IPS LCD Gaming Monitor",
        price: 370,
        discountedPrice: 400,
        discount: 30,
        reting: 5,
        comment: 99
    },
    {
        id: 4,
        img: product4,
        title: "S-Series Comfort Chair ",
        price: 375,
        discountedPrice: 400,
        discount: 25,
        reting: 4,
        comment: 99
    },
]

function Products() {
    return (
        <div className='grid grid-cols-4 gap-6'>
            <CustomCard products={products} />
        </div>
    )
}

export default Products