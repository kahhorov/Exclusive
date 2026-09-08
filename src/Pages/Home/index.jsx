import Banner from "../../components/Banner"
import Todays from "../../components/Todays"

function Home() {
    return (
        <>
            <div className="py-4">
                <Banner />
            </div>
            <div className="container py-20">
                <Todays />
            </div>
        </>

    )
}

export default Home