import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { Modal } from 'rsuite'
import api, { getImageUrl } from '../../Axios/Api'
import { useProductCounts } from '../../Context/productContext'
import { useNavigate } from 'react-router-dom'
import { FaArrowRightLong } from 'react-icons/fa6'
import { IoClose } from 'react-icons/io5'

const ProductModal = ({ isOpen, setIsOpen, productId }) => {
    const navigate = useNavigate()
    const { refreshCart } = useProductCounts()

    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(false)
    const [selectedColor, setSelectedColor] = useState(null)
    const [selectedSize, setSelectedSize] = useState(null)
    const [qty, setQty] = useState(1)

    async function getProduct() {
        try {
            setLoading(true)
            const res = await api.get(`product/detail/?product_id=${productId}`)
            const data = res.data

            setProduct(data)
            setSelectedColor(data.properties?.color?.[0] || null)
            setSelectedSize(data.properties?.size?.[0] || null)
            setQty(1)
        } catch (error) {
            console.log(error)
            toast.error("Mahsulot yuklanmadi")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (isOpen && productId) {
            getProduct()
        }
    }, [isOpen, productId])

    async function postCart() {
        if (!localStorage.getItem("token")) {
            toast.warning("Avval tizimga kiring")
            navigate("/login")
            return
        }

        const properties = {}
        if (selectedColor) properties.color = selectedColor
        if (selectedSize) properties.size = selectedSize

        try {
            await api.post("order/add-to-cart/", {
                product_id: productId,
                quantity: qty,
                count: qty,
                properties,
            })

            localStorage.setItem(`selected_${productId}`, JSON.stringify({
                color: selectedColor,
                size: selectedSize,
                qty,
            }))

            refreshCart()
            toast.success("Savatga qo'shildi")
            setIsOpen(false)
        } catch (error) {
            console.log(error.response?.data || error)
            toast.error("Xatolik yuz berdi")
        }
    }

    const colors = product?.properties?.color || []
    const sizes = product?.properties?.size || []
    const maxQty = product?.quantity || 1

    return (
        <Modal open={isOpen} onClose={() => setIsOpen(false)} size="md">
            <Modal.Body className="relative !m-0">
                <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="absolute top-0 right-0 w-7 h-7 flex items-center justify-center bg-secondary-10 !text-white !rounded"
                >
                    <IoClose size={20} />
                </button>

                {loading || !product ? (
                    <div className="flex h-60 items-center justify-center">
                        <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-secondary-10" />
                    </div>
                ) : (
                    <div className="flex flex-col sm:flex-row gap-6 p-3">
                        <div className="flex flex-col gap-4 sm:w-1/3">
                            <div className="bg-gray-10 shadow-gray-300 shadow-lg rounded-lg h-72 flex items-center justify-center overflow-hidden">
                                <img
                                    src={getImageUrl(product.pictures)}
                                    alt={product.title}
                                    className="h-full w-full object-contain rounded-lg"
                                />
                            </div>
                            <button
                                type="button"
                                onClick={() => navigate(`/product/detail/${productId}`)}
                                className="w-fit flex gap-4 items-center bg-secondary-10 !text-white !px-5 !py-2 !rounded-lg group"
                            >
                                Show More <FaArrowRightLong className="group-hover:translate-x-1 transition-all duration-100 ease-in" />
                            </button>
                        </div>

                        <div className="flex-1 flex flex-col gap-5">
                            <h5 className="!text-lg !font-medium pr-8">{product.title}</h5>

                            {colors.length > 0 && (
                                <div className="flex  items-center gap-4">
                                    <span className="text-lg">Color:</span>
                                    <div className="flex flex-wrap gap-3">
                                        {colors.map((color) => (
                                            <button
                                                key={color}
                                                type="button"
                                                title={color}
                                                onClick={() => setSelectedColor(color)}
                                                style={{ background: color }}
                                                className={`h-5 w-5 !rounded !border border-black/10 transition ${selectedColor === color ? "ring-2 ring-black ring-offset-2" : ""}`}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}

                            {sizes.length > 0 && (
                                <div className="flex items-center gap-4">
                                    <span className="text-lg">Size:</span>
                                    <div className="flex flex-wrap gap-3">
                                        {sizes.map((size) => (
                                            <button
                                                key={size}
                                                type="button"
                                                onClick={() => setSelectedSize(size)}
                                                className={`min-w-11 px-2 py-1 text-sm !rounded !border transition ${selectedSize === size ? "border-secondary-10 bg-secondary-10 !text-white" : "border-gray-400 hover:border-secondary-10"}`}
                                            >
                                                {size}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="flex items-center gap-4">
                                <span className="text-lg">Quantity:</span>
                                <div className="flex h-8 overflow-hidden rounded border border-gray-400">
                                    <button
                                        type="button"
                                        onClick={() => setQty(Math.max(1, qty - 1))}
                                        disabled={qty === 1}
                                        className="w-8 !border-r border-gray-400 disabled:text-gray-300"
                                    >
                                        -
                                    </button>
                                    <span className="w-14 flex items-center justify-center">{qty}</span>
                                    <button
                                        type="button"
                                        onClick={() => setQty(Math.min(maxQty, qty + 1))}
                                        disabled={qty >= maxQty}
                                        className="w-8 !border-l border-gray-400 disabled:text-gray-300"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <span className="text-lg font-medium">Price:</span>
                                <span>{product.discount_price || product.price}</span>
                            </div>

                            <button
                                type="button"
                                onClick={postCart}
                                disabled={product.quantity <= 0}
                                className="w-fit bg-secondary-10 !text-white !px-5 !py-2 !rounded-lg hover:bg-red-600 disabled:bg-gray-300"
                            >
                                {product.quantity > 0 ? "Add to Cart" : "Out of Stock"}
                            </button>
                        </div>
                    </div>
                )}
            </Modal.Body>
        </Modal>
    )
}

export default ProductModal
