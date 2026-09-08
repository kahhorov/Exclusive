import { FaStar } from 'react-icons/fa';

const Stars = [1, 2, 3, 4, 5];

function Rating({ value = 0, count }) {
    const filled = Math.round(value);

    return (
        <div className='flex items-center gap-1'>
            {Stars.map((star) => (
                <FaStar
                    key={star}
                    className={star <= filled ? 'text-star-10' : 'text-gray-300'}
                />
            ))}
            {count && (
                <span className='ml-1 text-sm font-semibold text-gray-400'>({count})</span>
            )}
        </div>
    )
}

export default Rating
