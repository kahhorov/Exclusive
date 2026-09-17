import { Card, Text } from 'rsuite';
import Rating from '../Rating';
import ProductImage from '../ProductImage';
import api from '../../Axios/Api';
import { useEffect, useState } from 'react';

function CustomCard() {
    const [newProducts, setNewProducts] = useState([])

    async function getProducts() {
        try {
            const res = await api.get("product/list/")
            setNewProducts(res.data || [])

        } catch (error) {
            console.log(error);

        }
    }
    useEffect(() => {
        getProducts()
    }, [])



    return (
        <>

            {newProducts.slice(0, 4).map((p) => {


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
                            {p.discount_price !== p.price && <span className='text-gray-400 line-through'>${p.price}</span>}
                        </Card.Body>
                        <Card.Footer className='w-full text-start'>
                            <Rating value={p.stars} count={p.review_quantity} />
                        </Card.Footer>
                    </Card>
                )
            })}

        </>
    )
}

export default CustomCard