import React from 'react'
import SectionBanner from '../SectionBanner'
import Animate from '../Animate'
import { products } from '../../Data'
import { Card, Text } from 'rsuite';
import Rating from '../Rating';
import ProductImage from '../ProductImage';


function BestSelling() {
    const bestSelling = products?.filter((p) => p.category === "Best-Selling")
    return (
        <div className='py-10'>
            <Animate text="This Month" minwidth={5} />
            <SectionBanner text="Best Selling Products" isButton={true} />
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6 py-6">
                {bestSelling.map((p) => {
                    return (
                        <Card key={p.id} className='group h-full flex flex-col justify-start items-stretch border-none!'>
                            <ProductImage src={p.img} alt={p.title} isNew={p.isNew} />
                            <div className="w-full text-start">
                                <Card.Header>
                                    <Text size="md">
                                        {p.title}
                                    </Text>
                                </Card.Header>
                            </div>
                            <Card.Body className='flex gap-4 text-start w-full'>
                                <span className='text-secondary-10'>${p.price}</span>
                                {p.discountedPrice ? <span className='text-gray-400 line-through'>${p.discountedPrice}</span> : ""}

                            </Card.Body>
                            <Card.Footer className='w-full text-start'>
                                <Rating value={p.reting} count={p.comment} />
                            </Card.Footer>
                        </Card>
                    )
                })}
            </div>
        </div>
    )
}

export default BestSelling