import RealTime from "../RealTime"
import { Button } from "rsuite"
import CustomButton from '../Button'
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6"

function SectionBanner({ text, isTime, isButton }) {
    return (
        <div className="flex flex-wrap items-center justify-between gap-4 py-4 lg:gap-14 lg:py-6">
            <div className="flex flex-wrap items-center gap-4 lg:justify-between lg:w-[37.5rem]">
                <h2 className="!text-lg sm:!text-2xl lg:!text-3xl">{text}</h2>
                {isTime && <RealTime />}
            </div>
            {isButton ? <CustomButton text="View All" width={true} /> : <div className="flex gap-2">
                <Button appearance="default" className="!rounded-full"><FaArrowLeftLong /></Button>
                <Button appearance="default" className="!rounded-full"><FaArrowRightLong /></Button>
            </div>}
        </div>
    )
}

export default SectionBanner