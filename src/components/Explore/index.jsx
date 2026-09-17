import { Card, Text } from 'rsuite'
import Animate from '../Animate'
import ProductImage from '../ProductImage'
import SectionBanner from '../SectionBanner'
import CustomButton from '../Button'
import Rating from '../Rating'
import api from '../../Axios/Api'
import { useEffect, useState } from 'react'

const colorCodes = {
    red: '#db4444',
    orange: '#f97316',
    yellow: '#eaff66',
    black: '#000000',
    green: '#0d3b2e',
}


function Explore() {
    const [newProducts, setNewProducts] = useState([])
    const [num, setNum] = useState(16)

    async function getProducts() {
        try {
            const res = await api.get("product/list/")
            setNewProducts(res.data || [])

        } catch (error) {
            console.log("error:" + error);
        }
    }

    useEffect(() => {
        getProducts()
    }, [])

    function handleAll() {
        const n = newProducts?.length - 8
        setNum(n)
        if (num == newProducts?.length - 8) {
            setNum(16)
        }
    }

    return (
        <div className='py-10'>
            <Animate text="Our Products" minwidth={5} />
            <SectionBanner text="Explore Our Products" />
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6 py-6">
                {newProducts?.slice(8, num).map((p) => {
                    return (
                        <Card key={p.id} className='group h-full flex flex-col justify-start items-stretch border-none!'>
                            <ProductImage img={p.pictures?.[0]} alt={p.title} discount={p.discount_percent} productId={p.id} height={250} />
                            <div className="w-full text-start">
                                <Card.Header>
                                    <Text size="md">
                                        {p.title?.split(" ").length > 5 ? p.title.split(" ").slice(0, 5).join(" ") + "..." : p.title}
                                    </Text>
                                </Card.Header>
                            </div>
                            <Card.Body className='flex items-center gap-3 text-start w-full'>
                                <span className='text-secondary-10'>${p.discount_price}</span>
                                {p.discount_price !== p.price ? <span className='text-gray-400 line-through'>${p.price}</span> : ""}
                                <Rating value={p.stars} count={p.review_quantity} />
                            </Card.Body>
                            <Card.Footer className='w-full text-start'>
                                {p.colors && (
                                    <div className="flex items-center gap-2">
                                        {p.colors.map((color, i) => (
                                            <span
                                                key={color}
                                                style={{ backgroundColor: colorCodes[color] }}
                                                className={`w-4 h-4 rounded-full cursor-pointer ${i === 0 ? "ring-1 ring-black ring-offset-2" : ""}`}
                                            />
                                        ))}
                                    </div>
                                )}
                            </Card.Footer>
                        </Card>
                    )
                })}
            </div>
            <div className='w-full text-center py-6'>
                <button onClick={handleAll} className={`bg-secondary-10 py-2 lg:py-4 lg:px-5 px-3 !rounded-sm !text-white`}> {num !== newProducts.length - 8 ? "View All Products" : "Short Products"}</button>
            </div>
        </div>
    )
}

export default Explore
