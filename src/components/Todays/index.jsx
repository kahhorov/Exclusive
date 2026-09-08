import { Button } from "rsuite"
import Animate from "../Animate"
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6"
import RealTime from "../RealTime"
import Products from "../products"
import CustomButton from '../Button'

function Todays() {
    return (
        <div>
            <Animate text="Today's" />
            <div className="flex items-center justify-between gap-14 py-6">
                <div className="flex items-center justify-between w-[37.5rem]">
                    <h2>Flash Sales</h2>
                    <RealTime />
                </div>
                <div className="flex gap-2">
                    <Button appearance="default" className="!rounded-full"><FaArrowLeftLong /></Button>
                    <Button appearance="default" className="!rounded-full"><FaArrowRightLong /></Button>
                </div>
            </div>
            <Products />
            <div className='w-full text-center py-10'> <CustomButton text="View All Products" /></div>
        </div>
    )
}

export default Todays