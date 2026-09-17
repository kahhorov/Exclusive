import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import api, { getImageUrl } from "../../Axios/Api";
import StarRating from "../../components/Stars";
import { FaHeart } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { FiMinus, FiPlus } from "react-icons/fi";
import { Breadcrumb } from "rsuite";
import { useProductCounts } from "../../Context/productContext";
import iconDelivery from "../../assets/svg/icon-delivery.svg";
import iconReturn from "../../assets/svg/icon-return.svg";

export default function ProductDetaill() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { refreshWishlist, refreshCart } = useProductCounts();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [selectedColor, setSelectedColor] = useState(null);
    const [selectedSize, setSelectedSize] = useState(null);
    const [activeImg, setActiveImg] = useState(0);
    const [qty, setQty] = useState(1);
    const [wished, setWished] = useState(false);

    async function getDetaill() {
        try {
            setLoading(true);
            const res = await api.get(`/product/detail/?product_id=${id}`);
            const data = res.data;

            setProduct(data);
            setActiveImg(0);
            setQty(1);

            if (data.properties?.color?.length > 0) {
                setSelectedColor(data.properties.color[0]);
            }
            if (data.properties?.size?.length > 0) {
                setSelectedSize(data.properties.size[0]);
            }
        } catch (err) {
            setError("Mahsulot topilmadi yoki xatolik yuz berdi.");
            console.log(err);
        } finally {
            setLoading(false);
        }
    }

    async function getWishlist() {
        if (!localStorage.getItem("token")) return;
        try {
            const res = await api.get("action/my-wishlist/");
            const list = res.data || [];
            setWished(list.some((item) => (item.product?.id ?? item.id) == id));
        } catch (err) {
            console.log(err);
        }
    }

    async function toggleWishlist() {
        if (!localStorage.getItem("token")) {
            toast.warning("Avval tizimga kiring");
            navigate("/login");
            return;
        }
        try {
            if (wished) {
                await api.delete(`action/remove-from-wishlist/?product_id=${id}`);
                setWished(false);
                toast.info("Sevimlilardan o'chirildi");
            } else {
                await api.post(`action/add-to-wishlist/?product_id=${id}`);
                setWished(true);
                toast.success("Sevimlilarga qo'shildi");
            }
            refreshWishlist();
        } catch (err) {
            console.log(err);
            toast.error("Xatolik yuz berdi");
        }
    }

    async function addToCart() {
        if (!localStorage.getItem("token")) {
            toast.warning("Avval tizimga kiring");
            navigate("/login");
            return;
        }

        const properties = {};
        if (selectedColor) properties.color = selectedColor;
        if (selectedSize) properties.size = selectedSize;

        try {
            await api.post("order/add-to-cart/", {
                product_id: Number(id),
                quantity: qty,
                count: qty,
                properties,
            });
            refreshCart();
            toast.success("Savatga qo'shildi");
            navigate("/cart");
        } catch (err) {
            console.log(err.response?.data || err);
            toast.error("Xatolik yuz berdi");
        }
    }

    useEffect(() => {
        getDetaill();
        getWishlist();
    }, [id]);

    if (loading) {
        return (
            <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3 text-gray-400">
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-secondary-10" />
                <span className="text-sm">Yuklanmoqda...</span>
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center text-sm text-secondary-10">
                {error || "Mahsulot topilmadi"}
            </div>
        );
    }

    const pictures = product.pictures || [];
    const colors = product.properties?.color || [];
    const sizes = product.properties?.size || [];
    const inStock = product.quantity > 0;

    return (
        <div className="border-gray-300 border-t">
            <div className="container px-4 py-10 lg:py-20">

                {/* Breadcrumb */}
                <Breadcrumb className="text-sm">
                    <Breadcrumb.Item><Link to="/" className="!text-gray-500 hover:!text-black">Home</Link></Breadcrumb.Item>
                    {product.category?.title && (
                        <Breadcrumb.Item className="text-gray-500">{product.category.title}</Breadcrumb.Item>
                    )}
                    <Breadcrumb.Item active className="!text-black">{product.title}</Breadcrumb.Item>
                </Breadcrumb>

                <div className="grid grid-cols-1 gap-10 pt-10 lg:grid-cols-[7fr_4fr] lg:gap-16 lg:pt-20">

                    {/* Rasmlar */}
                    <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-start lg:gap-6">

                        <div className="flex flex-wrap gap-3 sm:flex-col sm:flex-nowrap">
                            {pictures.map((pic, i) => (
                                <button
                                    key={i}
                                    type="button"
                                    onClick={() => setActiveImg(i)}
                                    className={`flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden !rounded bg-gray-10 p-1 !border-2 transition sm:h-[78px] sm:w-[90px] ${activeImg === i ? "border-secondary-10" : "border-transparent hover:border-gray-300"}`}
                                >
                                    <img src={getImageUrl(pic)} alt={`${product.title} ${i + 1}`} className="h-full w-full object-contain" />
                                </button>
                            ))}
                        </div>

                        <div className="flex h-[340px] flex-1 items-center justify-center overflow-hidden rounded bg-gray-10 p-4 sm:h-[438px]">
                            {pictures[activeImg] ? (
                                <img src={getImageUrl(pictures[activeImg])} alt={product.title} className="h-full w-full object-contain" />
                            ) : (
                                <span className="text-sm text-gray-400">Rasm yo'q</span>
                            )}
                        </div>
                    </div>

                    <div className="flex flex-col">
                        <h1 className="!text-2xl !font-semibold tracking-wide">{product.title}</h1>

                        <div className="mt-4 flex flex-wrap items-center gap-4 text-sm">
                            <div className="flex items-center gap-2">
                                <StarRating stars={product.stars} />
                                <span className="text-gray-500">({product.review_quantity} Reviews)</span>
                            </div>
                            <span className="h-4 w-px bg-gray-400" />
                            <span className={inStock ? "text-green-500" : "text-secondary-10"}>
                                {inStock ? "In Stock" : "Out of Stock"}
                            </span>
                        </div>

                        <div className="mt-4 flex items-center gap-3">
                            <span className="text-2xl">${product.discount_price || product.price}</span>
                            {product.discount_price && product.discount_price !== product.price && (
                                <span className="text-lg text-gray-400 line-through">${product.price}</span>
                            )}
                        </div>

                        <p className="mt-6 line-clamp-4 whitespace-pre-line text-sm leading-relaxed">
                            {product.description}
                        </p>

                        <hr className="my-6 border-gray-400" />

                        {colors.length > 0 && (
                            <div className="flex items-center gap-6">
                                <span className="text-xl">Colours:</span>
                                <div className="flex flex-wrap items-center gap-2">
                                    {colors.map((color) => (
                                        <button
                                            key={color}
                                            type="button"
                                            title={color}
                                            onClick={() => setSelectedColor(color)}
                                            style={{ background: color }}
                                            className={`h-5 w-5 !rounded-full !border border-black/10 transition ${selectedColor === color ? "ring-2 ring-black ring-offset-2" : ""}`}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}

                        {sizes.length > 0 && (
                            <div className="mt-6 flex items-center gap-6">
                                <span className="text-xl">Size:</span>
                                <div className="flex flex-wrap gap-4">
                                    {sizes.map((size) => (
                                        <button
                                            key={size}
                                            type="button"
                                            onClick={() => setSelectedSize(size)}
                                            className={`flex h-8 min-w-8 items-center justify-center !rounded !border px-1.5 text-sm font-medium transition ${selectedSize === size ? "border-secondary-10 bg-secondary-10 !text-white" : "border-gray-400 hover:border-secondary-10"}`}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="mt-6 flex flex-wrap items-center gap-4">
                            <div className="flex h-11 overflow-hidden rounded border border-gray-400">
                                <button
                                    type="button"
                                    onClick={() => setQty(Math.max(1, qty - 1))}
                                    disabled={qty === 1}
                                    className="flex w-10 items-center justify-center !border-r border-gray-400 transition hover:bg-gray-10 disabled:text-gray-300"
                                >
                                    <FiMinus size={20} />
                                </button>
                                <span className="flex w-14 items-center justify-center text-xl font-medium sm:w-20">{qty}</span>
                                <button
                                    type="button"
                                    onClick={() => setQty(Math.min(product.quantity, qty + 1))}
                                    disabled={qty >= product.quantity}
                                    className="flex w-10 items-center justify-center bg-secondary-10 !text-white transition hover:bg-red-600 disabled:opacity-60"
                                >
                                    <FiPlus size={20} />
                                </button>
                            </div>

                            <button
                                type="button"
                                onClick={addToCart}
                                disabled={!inStock}
                                className="h-11 flex-1 !rounded bg-secondary-10 px-4 font-medium sm:px-12 !text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:bg-gray-300 sm:flex-none"
                            >
                                {inStock ? "Buy Now" : "Out of Stock"}
                            </button>

                            <button
                                type="button"
                                onClick={toggleWishlist}
                                className="flex h-11 w-10 items-center justify-center !rounded !border border-gray-400 transition hover:bg-gray-10"
                            >
                                {wished ? <FaHeart size={18} className="text-secondary-10" /> : <CiHeart size={24} />}
                            </button>
                        </div>

                        <div className="mt-10 rounded border border-gray-400">
                            <div className="flex items-center gap-4 p-4">
                                <img src={iconDelivery} alt="" className="h-10 w-10" />
                                <div>
                                    <p className="font-medium">Free Delivery</p>
                                    <p className="mt-2 text-xs font-medium underline">Enter your postal code for Delivery Availability</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 border-t border-gray-400 p-4">
                                <img src={iconReturn} alt="" className="h-10 w-10" />
                                <div>
                                    <p className="font-medium">Return Delivery</p>
                                    <p className="mt-2 text-xs font-medium">
                                        Free 30 Days Delivery Returns. <span className="underline">Details</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
