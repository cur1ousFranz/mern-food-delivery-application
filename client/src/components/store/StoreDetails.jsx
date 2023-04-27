import { Link } from "react-router-dom";

const StoreDetails = ({ store }) => {
    return (
        <Link to={'/stores/' + store._id} className="border">
            <img src="/img/store.png" className="object-cover" alt="" style={{ width: "100%", height: "200px" }}/>
            <div className="px-4 py-2">
                <p className="font-semibold truncate">{ store.store_name }</p>
                <p className="text-sm">{ store.contact_number }</p>
                <p className="text-orange-500">{ store.store_address }</p>
            </div>
        </Link>
    );
}

export default StoreDetails;