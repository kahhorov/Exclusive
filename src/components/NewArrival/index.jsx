import Animate from '../Animate'
import ArrivalCard from '../ArrivalCard'
import ps5 from '../../assets/ps5.png'
import woman from '../../assets/woman.jpg'
import speaker from '../../assets/amazon-speaker.png'
import perfume from '../../assets/perfume.png'

function NewArrival() {
    return (
        <div className='py-10'>
            <Animate text="Featured" minwidth={5} />
            <h2 className='!text-xs sm:!text-2xl lg:!text-3xl lg:py-6'>New Arrival</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 py-6 lg:h-[600px]">
                <ArrivalCard
                    img={ps5}
                    title="PlayStation 5"
                    text="Black and White version of the PS5 coming out on sale."
                    className='h-[400px] lg:h-full'
                    imgClass='object-contain object-bottom'
                />
                <div className="grid grid-rows-2 gap-6 h-full min-h-0">
                    <ArrivalCard
                        img={woman}
                        title="Women's Collections"
                        text="Featured woman collections that give you another vibe."
                        className='h-[250px] lg:h-full min-h-0'
                        imgClass='object-cover object-right'
                    />
                    <div className="grid grid-cols-2 gap-6 min-h-0">
                        <ArrivalCard
                            img={speaker}
                            title="Speakers"
                            text="Amazon wireless speakers"
                            className='h-[250px] lg:h-full min-h-0'
                            imgClass='object-contain'
                        />
                        <ArrivalCard
                            img={perfume}
                            title="Perfume"
                            text="GUCCI INTENSE OUD EDP"
                            className='h-[250px] lg:h-full min-h-0'
                            imgClass='object-contain'
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewArrival
