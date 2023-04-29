import { Link } from "react-router-dom";

const StoreDetails = ({ store }) => {
    return (
        <Link to={'/stores/' + store._id}>
            <img 
            src="/img/store.png" 
            className="object-cover" 
            style={{ width: "100%", height: "170px" }}
            alt="" 
            />
            <div className="px-4 py-2">
                <p className="font-semibold truncate text-lg">{ store.store_name }</p>
            </div>
        </Link>
    );
}

export default StoreDetails;