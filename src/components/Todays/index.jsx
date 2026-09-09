import Animate from "../Animate"
import Products from "../products"
import CustomButton from '../Button'
import SectionBanner from "../SectionBanner"

function Todays() {
    return (
        <div>
            <Animate text="Today's" />
            <SectionBanner text={"Flash Sales"} isTime={true} />
            <Products />
            <div className='w-full text-center py-10'> <CustomButton text="View All Products" /></div>
        </div>
    )
}

export default Todays