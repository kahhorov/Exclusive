import { FaStar } from "react-icons/fa";

function StarRating({ stars }) {
    return (
        <div style={{ display: "flex", gap: 2 }}>
            {[1, 2, 3, 4, 5].map((s) => (
                <span key={s} style={{ color: s <= Math.round(stars) ? "#FFAD33" : "#ddd", fontSize: 18 }}>
                    <FaStar />
                </span>
            ))}
        </div>
    );
}
export default StarRating