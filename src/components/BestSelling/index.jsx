import React, { useEffect, useState } from 'react'
import SectionBanner from '../SectionBanner'
import Animate from '../Animate'
// import { products } from '../../Data'
import { Card, Text } from 'rsuite';
import Rating from '../Rating';
import ProductImage from '../ProductImage';
import api from '../../Axios/Api';


function BestSelling() {
    // const bestSelling = products?.filter((p) => p.category === "Best-Selling")


    const [products, setProducts] = useState([])

    async function getProducts() {
        try {
            const res = await api.get("product/list/")
            setProducts(res.data || [])

        } catch (error) {
            console.log("error:" + error);
        }
    }

    useEffect(() => {
        getProducts()
    }, [])


    return (
        <div className='py-10'>
            <Animate text="This Month" minwidth={5} />
            <SectionBanner text="Best Selling Products" isButton={true} />
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6 py-6">
                {products?.slice(4, 8).map((p) => {
                    return (
                        <Card key={p.id} className='group h-full flex flex-col justify-start items-stretch border-none!'>
                            <ProductImage img={p.pictures?.[0]} alt={p.title} discount={p.discount_percent} productId={p.id} />
                            <div className="w-full text-start">
                                <Card.Header>
                                    <Text size="md">
                                        {p.title?.split(" ").length > 5 ? p.title.split(" ").slice(0, 5).join(" ") + "..." : p.title}
                                    </Text>
                                </Card.Header>
                            </div>
                            <Card.Body className='flex gap-4 text-start w-full'>
                                <span className='text-secondary-10'>${p.discount_price}</span>
                                {p.discount_price !== p.price ? <span className='text-gray-400 line-through'>${p.price}</span> : ""}

                            </Card.Body>
                            <Card.Footer className='w-full text-start'>
                                <Rating value={p.stars} count={p.review_quantity} />
                            </Card.Footer>
                        </Card>
                    )
                })}
            </div>
        </div>
    )
}

export default BestSelling