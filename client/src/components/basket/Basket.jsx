import { useContext, useState } from "react";
import { BasketContext } from "../../context/BasketContext";
import BasketFood from "./BasketFood";
import { Link } from "react-router-dom";

const Basket = () => {
    const [basketDropdown, setBasketDropdown] = useState(false)
    const { basket } = useContext(BasketContext)

    return (
        <div className="relative">
            <div>
                <img
                    onClick={() => setBasketDropdown(!basketDropdown)}
                    src="/img/basket.svg"
                    className="inline-block w-6 cursor-pointer"
                    alt="" />
                {basket.length > 0 && (
                    <span className="rounded-full px-2 py-1 text-xs absolute -ms-2 -mt-2 bg-red-500 text-white">
                        {basket.length}
                    </span>
                )}
            </div>

            {basketDropdown && (
                <div
                    onMouseLeave={() => setBasketDropdown(!basketDropdown)}
                    className="absolute right-0 p-2 mt-2 w-96 z-10 rounded-md border bg-white"
                    style={{ minHeight: "500px" }}>
                    <div className="flex space-x-2">
                        <span>
                            <img
                                src="/img/basket.svg"
                                className="w-4 inline-block"
                                alt="" />
                        </span>
                        <h1 className="font-semibold mt-0.5">Basket</h1>
                    </div>
                    <div className="overflow-y-auto px-2 max-h-96">
                        {basket && basket.map((food, index) => (
                            <BasketFood food={food} key={index} />
                        ))}

                        {basket.length === 0 && (
                            <div className="text-center py-24">
                                <img
                                    src="/img/basket.svg"
                                    className="w-6 mx-auto"
                                    alt="" />
                                <p className="font-semibold text-gray-700">Basket is empty.</p>
                            </div>
                        )}
                    </div>
                    <Link
                        to={'/checkout'}
                        disabled={basket.length === 0}
                        className="absolute text-center bottom-0 w-full py-2 right-0 uppercase rounded-sm bg-orange-500 hover:bg-orange-600 text-white">
                        Checkout {basket.length > 0 ? `(${basket.length})` : ''}
                    </Link>
                </div>
            )}

        </div>
    );
}

export default Basket;