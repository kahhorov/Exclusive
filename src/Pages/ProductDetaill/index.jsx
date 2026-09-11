import React from 'react'
import { useParams } from 'react-router-dom'
import { products } from '../../Data'

function ProductDetaill() {
    const { id } = useParams()
    const productDetail = products?.filter((p) => p.id == id)

    console.log();


    return (
        <div>ProductDetaill</div>
    )
}

export default ProductDetaill