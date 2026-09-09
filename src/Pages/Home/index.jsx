import Banner from "../../components/Banner"
import BestSelling from "../../components/BestSelling"
import Categories from "../../components/Categories"
import Explore from "../../components/Explore"
import NewArrival from "../../components/NewArrival"
import Service from "../../components/Service"
import Speaker from "../../components/Speaker"
import Todays from "../../components/Todays"

function Home() {
    return (
        <>
            <div className="py-4">
                <Banner />
            </div>
            <div className="container px-4 py-10 lg:py-20">
                <Todays />
                <Categories />
                <BestSelling />
                <Speaker />
                <Explore />
                <NewArrival />
                <Service />
            </div>
        </>

    )
}

export default Home