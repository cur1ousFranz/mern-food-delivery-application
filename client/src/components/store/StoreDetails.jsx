import { Link } from "react-router-dom";
import { BASE_URL } from "../../constants";

const StoreDetails = ({ store }) => {
    return (
        <Link to={'/stores/' + store._id}>
            <img
                src={store.image
                    ? `${BASE_URL}/${store.image}`
                    : "/img/store.png"}
                className="object-cover"
                style={{ width: "100%", height: "170px" }}
                alt=""
            />
            <div className="py-2">
                <p className="font-semibold truncate">{store.store_name}</p>
            </div>
        </Link>
    );
}

export default StoreDetails;