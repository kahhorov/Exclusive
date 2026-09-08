import { Outlet } from "react-router-dom"
import Footer from "../components/Footer"
import CustomNavbar from "../components/Navbar"

function MainLayout() {
    return (
        <div className="min-h-screen flex flex-col">
            <header>
                <CustomNavbar />
            </header>
            <main className="flex-1"><Outlet /></main>
            <Footer />
        </div>
    )
}

export default MainLayout