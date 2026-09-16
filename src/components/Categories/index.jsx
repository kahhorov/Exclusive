
import Animate from '../Animate'
import SectionBanner from '../SectionBanner'
import { products } from '../../Data'
import api, { getImageUrl } from '../../Axios/Api'
import { useEffect, useState } from 'react'


function Categories() {

    const [categoryProducts, setCategoryProducts] = useState([])

    async function getProducts() {
        try {
            const res = await api.get("product/categories/")
            setCategoryProducts(res.data || [])

        } catch (error) {
            console.log("error:" + error);
        }
    }

    useEffect(() => {
        getProducts()
    }, [])



    return (
        <div>
            <Animate text="Categories" />
            <SectionBanner text="Browse By Category" isTime={false} />
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5 md:gap-6 py-10">
                {categoryProducts?.map((p) => {
                    return (
                        <div key={p.id} className={`border-gray-300 border rounded-md flex flex-col gap-4 justify-center items-center sm:py-8 ${p.color ? "bg-secondary-10 text-white" : ""} ${p.id == 3 ? "bg-red-400 text-white" : ""}`}>
                            <img src={getImageUrl(p.image)} alt={p.title} className='w-14' />
                            <p>{p.title}</p>
                        </div>
                    )
                })}
            </div>
            <hr />
        </div>
    )
}

export default Categories