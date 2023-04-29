import { useContext, useEffect, useState } from "react";
import { BasketContext } from "../../context/BasketContext";

const CheckoutFood = ({ food }) => {
    const { dispatch } = useContext(BasketContext)
    const [foodQuantity, setFoodQuantity] = useState(food.foodQuantity)

    const removeFood = () => {
        dispatch({ type: 'REMOVE_TO_BASKET', payload: { uuid: food.uuid } })
    }

    useEffect(() => {
        dispatch({ type: 'SET_FOOD_QUANTITY', payload: { uuid: food.uuid, foodQuantity } })
    }, [foodQuantity])

    return (
        <div>
            <div className="grid grid-cols-4 gap-x-2">
                <img src="/img/food_image.png" className="w-36" alt="" />

                <h1 className="flex items-center">{food.name} qwdddddddddddd qwdddddd</h1>

                <div className="flex items-center space-x-0.5">
                    <button
                        onClick={() => setFoodQuantity(foodQuantity - 1)}
                        className="px-3 py-1 border text-sm border-gray-700 hover:border-gray-400"
                        disabled={foodQuantity === 1}
                    >
                        -
                    </button>
                    <p
                        className="px-3 py-1 border text-sm border-gray-700">
                        {food.foodQuantity}
                    </p>
                    <button
                        onClick={() => setFoodQuantity(foodQuantity + 1)}
                        className="px-3 py-1 border text-sm border-gray-700 hover:border-gray-400">
                        +
                    </button>
                </div>

                <div className="flex items-center justify-between">
                    <h1 className="flex items-center">
                        <span className="me-2 text-lg text-orange-500">₱</span>
                        {((food.price + food.choicesPrice) * food.foodQuantity).toLocaleString()}
                    </h1>
                    <button
                        onClick={removeFood}
                        className="py-2 h-fit text-xs px-2 rounded-full w-fit shadow-sm bg-orange-400 hover:bg-orange-300">
                        <img src="/img/trash.svg" alt="" />
                    </button>
                </div>
            </div>
            {food.has_choices && food.choice_options.map((choice, index) => (
                <div key={index} className="flex space-x-2">
                    <span><img src="/img/check-circle-fill.svg" className="w-4 inline-block" alt="" /></span>
                    <p className="font-semibold text-gray-700">
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
                <h1 className="mt-4 font-semibold px-2 py-4 shadow-sm rounded-sm text-gray-700 bg-gray-100">Note:
                    <span className="font-normal"> {food.instruction}</span>
                </h1>
            )}
            <hr className="mt-8"/>
        </div>
    );
}

export default CheckoutFood;