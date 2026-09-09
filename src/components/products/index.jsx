import React from 'react'
import CustomCard from '../CustomCard'
import { products } from '../../Data';


function Products() {
    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
            <CustomCard products={products} category="Flash-Sales" />
        </div>
    )
}

export default Products