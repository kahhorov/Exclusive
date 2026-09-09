import { Card, Text } from 'rsuite';
import Rating from '../Rating';
import ProductImage from '../ProductImage';

function CustomCard({ products, category }) {
    const filterProducts = products?.filter(
        (p) => p.category === category
    );
    return (
        <>

            {filterProducts.map((p) => {
                return (
                    <Card key={p.id} className='group h-full flex flex-col justify-start items-stretch border-none!'>
                        <ProductImage src={p.img} alt={p.title} isNew={p.isNew} discount={p.discount} />
                        <div className="w-full text-start">
                            <Card.Header>
                                <Text size="md">
                                    {p.title}
                                </Text>
                            </Card.Header>
                        </div>
                        <Card.Body className='flex gap-4 text-start w-full'>
                            <span className='text-secondary-10'>${p.price}</span>
                            <span className='text-gray-400 line-through'>${p.discountedPrice}</span>
                        </Card.Body>
                        <Card.Footer className='w-full text-start'>
                            <Rating value={p.reting} count={p.comment} />
                        </Card.Footer>
                    </Card>
                )
            })}

        </>
    )
}

export default CustomCard