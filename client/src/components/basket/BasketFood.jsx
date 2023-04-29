import { useContext, useEffect, useState } from "react";
import { BasketContext } from "../../context/BasketContext";

const BasketFood = ({ food }) => {
    const { basket, dispatch } = useContext(BasketContext)
    const [foodQuantity, setFoodQuantity] = useState(food.foodQuantity)

    const removeFood = () => {
        dispatch({ type: 'REMOVE_TO_BASKET', payload: { uuid: food.uuid } })
    }

    useEffect(() => {
        const index = basket.findIndex(f => f.uuid === food.uuid)
        setFoodQuantity(basket[index].foodQuantity)

    }, [basket])

    useEffect(() => {
        dispatch({
            type: 'SET_FOOD_QUANTITY',
            payload: {
                uuid: food.uuid,
                foodQuantity
            }
        })

    }, [foodQuantity])

    return (
        <div className="p-2 w-full">
            <p className="font-semibold">{food.name}</p>
            <div className="flex space-x-12 w-full">
                <div className="w-1/2">
                    <img
                        src="/img/food_image.png"
                        className="rounded-md object-cover"
                        alt=""
                        style={{ minHeight: "7rem", maxHeight: "7rem" }} />
                </div>
                <div className="flex-row w-1/2">
                    <div className="mt-2 flex justify-end">
                        <button
                            onClick={removeFood}
                            className="py-1 text-xs  px-2 rounded-full w-fit shadow-sm bg-orange-400 hover:bg-orange-300">
                            <img src="/img/trash.svg" alt="" />
                        </button>
                    </div>
                    <div className="flex justify-start h-fit">
                        <button
                            onClick={() => setFoodQuantity(foodQuantity - 1)}
                            disabled={foodQuantity === 1}
                            className="px-2 border hover:border-gray-400 text-sm">-</button>
                        <p className="px-2 border hover:border-gray-400 text-sm">{foodQuantity}</p>
                        <button
                            onClick={() => setFoodQuantity(foodQuantity + 1)}
                            className="px-2 border hover:border-gray-400 text-sm">+</button>
                    </div>
                    <p className="mt-3 text-end font-semibold">
                        <span className="text-lg font-semibold text-orange-500">Total: ₱ </span>
                        {((food.price + food.choicesPrice) * food.foodQuantity).toLocaleString()}
                    </p>
                </div>
            </div>
            {food.has_choices && food.choice_options.map((choice, index) => (
                <div key={index}>
                    <p className="text-sm font-semibold text-gray-700">
                        {choice.choiceTitle}: {choice.selectedOption.map((option, index) => (
                            <span
                                key={index}
                                className="text-sm font-normal me-1 text-gray-700">
                                {option.optionName},
                            </span>
                        ))}
                    </p>


                </div>
            ))}
            {food.has_instructions && food.instruction && (
                <h1 className="mt-4 font-semibold p-2 shadow-sm rounded-sm text-sm text-gray-700 bg-slate-100">Note:
                    <span className="font-normal"> {food.instruction}</span>
                </h1>
            )}

            <hr className="mt-4" />
        </div>
    );
}

export default BasketFood;