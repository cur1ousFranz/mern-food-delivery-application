import { useContext, useState } from "react";
import { BasketContext } from "../../context/BasketContext";

const ShowFood = ({ selectFood, selectedFood }) => {

    const { basket, dispatch } = useContext(BasketContext)
    const [foodCount, setFoodCount] = useState(1)

    const addToBasket = () => {
        const food = {...selectedFood, foodCount}
        dispatch({type: 'ADD_TO_BASKET', payload: food})
    }

    return (
        <div className="my-6 pb-12">
            <div className="px-6 md:px-36 grid grid-cols-1 md:grid-cols-2 gap-x-12 md:gap-y-0" >
                <div >
                    <div className="flex space-x-2">
                        <span className="cursor-pointer" onClick={() => selectFood(false)} ><img src="/arrow-left.svg" className="w-5 mt-0.5" alt=""/></span>
                        <p className="">{selectedFood.name}</p>
                    </div>
                    <img src="/gray-image.png" className="w-full mt-2 rounded-md h-full object-cover" alt="" />
                </div>
                <div className="space-y-4 mt-10">
                    <div className="flex justify-between">
                        <h1 className="text-bold text-lg md:text-2xl text-orange-500">{selectedFood.name}</h1>
                        <div className="flex space-x-3 mt-2">
                            <img src="/heart.svg" className="w-4" alt="" />
                            <p className="font-semibold text-sm md:text-base">4.8 (23 ratings)</p>
                        </div>
                    </div>
                    <div>
                        <p className="font-bold">Description</p>
                        <p className="">{selectedFood.description}</p>
                    </div>
                    <p className="font-semibold text-2xl text-orange-500"><span className="text-lg md:text-4xl">₱ </span>{selectedFood.price}</p>
                    <div className="flex">
                        <button disabled={foodCount === 1} onClick={() => setFoodCount(foodCount - 1)} className={foodCount === 1 ? "py-2 px-4 border cursor-not-allowed border-e-0 border-gray-400" : "py-2 px-4 border border-e-0 border-gray-400"}>-</button>
                        <p className="py-2 px-4 border border-gray-400">{foodCount}</p>
                        <button onClick={() => setFoodCount(foodCount + 1)} className="py-2 px-4 border border-s-0 border-gray-400">+</button>
                    </div>
                    <button onClick={addToBasket} className="uppercase w-full rounded-md py-2 px-4 bg-orange-500 hover:bg-orange-600 text-white">Add To Basket</button>
                </div>
            </div>
        </div>
    );
}

export default ShowFood;