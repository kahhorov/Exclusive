import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import api, { getImageUrl } from "../../Axios/Api";
import StarRating from "../../components/Stars";
import { FaHeart } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { Breadcrumb } from "rsuite";

export default function ProductDetaill() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [selectedColor, setSelectedColor] = useState(null);
    const [selectedSize, setSelectedSize] = useState(null);
    const [activeImg, setActiveImg] = useState(0);
    const [qty, setQty] = useState(1);
    const [wished, setWished] = useState(false);
    const [postal, setPostal] = useState("");

    async function getDetaill() {
        try {
            setLoading(true);

            const res = await api.get(
                `/product/detail/?product_id=${id}`
            );

            const data = res.data;

            setProduct(data);

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
            toast.success("Savatga qo'shildi");
            navigate("/cart");
        } catch (err) {
            console.log(err);
            toast.error("Xatolik yuz berdi");
        }
    }

    useEffect(() => {

        getDetaill();
        getWishlist();
    }, [id]);

    // Loading
    if (loading) {
        return (
            <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3 text-gray-400">
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-red-500" />

                <span className="text-sm">
                    Yuklanmoqda...
                </span>
            </div>
        );
    }

    // Error
    if (error || !product) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center text-sm text-red-500">
                {error || "Mahsulot topilmadi"}
            </div>
        );
    }

    const pictures = product.pictures || [];
    const colors = product.properties?.color || [];
    const sizes = product.properties?.size || [];

    return (
        <div className="min-h-screen bg-gray-50 font-sans text-gray-900">

            <Breadcrumb className="border-b border-gray-200 bg-white px-12 py-3 text-sm text-gray-400">
                <Breadcrumb.Item>Account</Breadcrumb.Item>


                <Breadcrumb.Item className="text-gray-500">
                    {product.category?.title}
                </Breadcrumb.Item>


                <Breadcrumb.Item className="font-medium text-gray-900">
                    {product.title}
                </Breadcrumb.Item>
            </Breadcrumb>

            <main className="mx-auto grid max-w-5xl grid-cols-1 items-start gap-12 px-6 py-10 md:grid-cols-2">

                <div className="flex gap-3">

                    <div className="flex flex-col gap-2">

                        {pictures.length > 0 ? (
                            pictures.map((pic, i) => (
                                <button
                                    key={i}
                                    type="button"
                                    onClick={() => setActiveImg(i)}
                                    className={`
                                        h-[72px]
                                        w-[72px]
                                        overflow-hidden
                                        rounded-lg
                                        border-2
                                        bg-white
                                        transition
                                        ${activeImg === i
                                            ? "border-red-500 shadow-sm"
                                            : "border-gray-200 hover:border-gray-400"
                                        }
                                    `}
                                >
                                    <img
                                        src={
                                            getImageUrl(pic.file)
                                        }
                                        alt={`Rasm ${i + 1}`}
                                        className="h-full w-full object-cover"
                                    />
                                </button>
                            ))
                        ) : (
                            <div className="flex h-[72px] w-[72px] items-center justify-center rounded-lg bg-gray-100 text-xs text-gray-400">
                                Rasm yo'q
                            </div>
                        )}

                    </div>

                    <div className="relative flex aspect-square flex-1 items-center justify-center overflow-hidden rounded-xl border border-gray-200 bg-white">

                        {product.discount_percent > 0 && (
                            <span className="absolute left-3 top-3 rounded bg-red-500 px-2.5 py-1 text-xs font-bold text-white">
                                -{product.discount_percent}%
                            </span>
                        )}

                        {pictures.length > 0 &&
                            pictures[activeImg] ? (
                            <img
                                src={
                                    getImageUrl(pictures[activeImg].file)
                                }
                                alt={product.title}
                                className="h-full w-full object-cover"
                            />
                        ) : (
                            <span className="text-sm text-gray-300">
                                Rasm yo'q
                            </span>
                        )}

                    </div>

                </div>

                <div className="flex flex-col gap-5">

                    <h1 className="text-2xl font-bold leading-snug">
                        {product.title}
                    </h1>

                    <div className="flex flex-wrap items-center gap-2 text-sm">

                        <StarRating stars={product.stars} />

                        <span className="text-gray-400">
                            ({product.review_quantity} Reviews)
                        </span>

                        <span className="text-gray-200">
                            |
                        </span>

                        <span
                            className={
                                product.quantity > 0
                                    ? "font-medium text-green-600"
                                    : "font-medium text-red-500"
                            }
                        >
                            {product.quantity > 0
                                ? "In Stock"
                                : "Out of Stock"}
                        </span>

                    </div>

                    <div className="flex items-center gap-3">

                        {product.discount_percent > 0 ? (
                            <>
                                <span className="text-3xl font-bold text-red-500">
                                    {product.discount_price} so'm
                                </span>

                                <span className="text-lg text-gray-400 line-through">
                                    {product.price} so'm
                                </span>
                            </>
                        ) : (
                            <span className="text-3xl font-bold text-gray-900">
                                {product.price} so'm
                            </span>
                        )}

                    </div>

                    <p className="line-clamp-4 text-sm leading-relaxed text-gray-500">
                        {product.description}
                    </p>

                    <hr className="border-gray-200" />

                    {colors.length > 0 && (
                        <div className="flex items-center gap-4">

                            <span className="w-14 shrink-0 text-sm font-semibold">
                                Colour:
                            </span>

                            <div className="flex flex-wrap gap-2">

                                {colors.map((color) => (
                                    <button
                                        key={color}
                                        type="button"
                                        title={color}
                                        onClick={() =>
                                            setSelectedColor(color)
                                        }
                                        className={`
                                            h-6
                                            w-6
                                            rounded-full
                                            transition
                                            ${selectedColor === color
                                                ? "ring-2 ring-red-500 ring-offset-2"
                                                : "ring-1 ring-gray-300 hover:ring-gray-500"
                                            }
                                        `}
                                        style={{
                                            background: color,
                                        }}
                                    />
                                ))}

                            </div>

                            {selectedColor && (
                                <span className="text-xs capitalize text-gray-400">
                                    {selectedColor}
                                </span>
                            )}

                        </div>
                    )}

                    {sizes.length > 0 && (
                        <div className="flex items-center gap-4">

                            <span className="w-14 shrink-0 text-sm font-semibold">
                                Size:
                            </span>

                            <div className="flex flex-wrap gap-2">

                                {sizes.map((size) => (
                                    <button
                                        key={size}
                                        type="button"
                                        onClick={() =>
                                            setSelectedSize(size)
                                        }
                                        className={`
                                            min-w-[42px]
                                            rounded-md
                                            border
                                            px-3
                                            py-2
                                            text-sm
                                            font-semibold
                                            transition
                                            ${selectedSize === size
                                                ? "border-red-500 bg-red-500 text-white"
                                                : "border-gray-300 bg-white text-gray-700 hover:border-gray-500"
                                            }
                                        `}
                                    >
                                        {size}
                                    </button>
                                ))}

                            </div>

                        </div>
                    )}

                    <div className="flex items-center gap-3">

                        <div className="flex items-center overflow-hidden rounded-lg border border-gray-200">

                            <button
                                type="button"
                                onClick={() =>
                                    setQty(Math.max(1, qty - 1))
                                }
                                className="h-11 w-10 border-r border-gray-200 bg-white text-xl text-gray-700 transition hover:bg-gray-50"
                            >
                                −
                            </button>

                            <span className="w-11 select-none text-center text-base font-semibold">
                                {qty}
                            </span>

                            <button
                                type="button"
                                onClick={() =>
                                    setQty(
                                        Math.min(
                                            product.quantity,
                                            qty + 1
                                        )
                                    )
                                }
                                className="h-11 w-10 bg-red-500 text-xl text-white transition hover:bg-red-600"
                            >
                                +
                            </button>

                        </div>

                        <button
                            type="button"
                            disabled={product.quantity === 0}
                            onClick={addToCart}
                            className={`
                                h-11
                                flex-1
                                rounded-lg
                                text-sm
                                font-bold
                                text-white
                                transition
                                ${product.quantity > 0
                                    ? "cursor-pointer bg-red-500 hover:bg-red-600"
                                    : "cursor-not-allowed bg-gray-300"
                                }
                            `}
                        >
                            {product.quantity > 0
                                ? "Buy Now"
                                : "Tugagan"}
                        </button>

                        <button
                            type="button"
                            onClick={toggleWishlist}
                            className="flex h-11 w-11 items-center justify-center rounded-lg border border-gray-200 bg-white text-xl transition hover:bg-gray-50"
                        >
                            {wished ? (
                                <FaHeart className="text-red-500" />
                            ) : (
                                <CiHeart />
                            )}
                        </button>

                    </div>

                    {product.quantity > 0 &&
                        product.quantity <= 10 && (
                            <p className="text-xs font-medium text-red-500">
                                Faqat {product.quantity} ta qoldi!
                            </p>
                        )}

                    <div className="overflow-hidden rounded-xl border border-gray-200">

                        <div className="flex items-start gap-4 bg-white p-4">

                            <span className="mt-0.5 text-2xl">
                                🚚
                            </span>

                            <div>

                                <p className="text-sm font-bold">
                                    Bepul yetkazib berish
                                </p>

                                <p className="mt-1 text-xs text-gray-500">

                                    Pochta kodingizni kiriting:

                                    <input
                                        value={postal}
                                        onChange={(e) =>
                                            setPostal(e.target.value)
                                        }
                                        placeholder="mas. 100000"
                                        className="ml-1 w-20 border-0 border-b border-dashed border-red-400 bg-transparent text-xs text-red-500 outline-none"
                                    />

                                </p>

                            </div>

                        </div>

                        <div className="border-t border-gray-200" />

                        <div className="flex items-start gap-4 bg-white p-4">

                            <span className="mt-0.5 text-2xl">
                                🔄
                            </span>

                            <div>

                                <p className="text-sm font-bold">
                                    Qaytarish
                                </p>

                                <p className="mt-1 text-xs text-gray-500">

                                    30 kun ichida bepul qaytarish.{" "}

                                    <a
                                        href="#details"
                                        className="text-xs text-red-500 underline"
                                    >
                                        Batafsil
                                    </a>

                                </p>

                            </div>

                        </div>

                    </div>

                </div>

            </main>
        </div>
    );
}