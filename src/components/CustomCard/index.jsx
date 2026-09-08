import { Card, Text } from 'rsuite';
import Rating from '../Rating';

function CustomCard({ products }) {
    return (
        <>
            {products?.map((p) => {
                return (
                    <Card key={p.id} className='h-full flex flex-col justify-start items-stretch border-none!'>
                        <div className="w-full h-[288px] shrink-0 p-2 bg-gray-100 flex items-center justify-center">
                            <img
                                src={p.img}
                                alt={p.title}
                                className="w-full h-full object-contain"
                            />
                        </div>
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