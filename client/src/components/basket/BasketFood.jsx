import { useContext, useEffect, useState } from "react";
import { BasketContext } from "../../context/BasketContext";

const BasketFood = ({ food }) => {
    const { basket, dispatch } = useContext(BasketContext)
    const [foodQuantity, setFoodQuantity] = useState(food.foodQuantity)

    const handleFoodQuantity = (operator) => {
        switch (operator) {
            case '-':
                setFoodQuantity(foodQuantity - 1)
                return
            case '+':
                setFoodQuantity(foodQuantity + 1)
        }
    }

    const removeFood = () => {
        dispatch({ type: 'REMOVE_TO_BASKET', payload: { uuid: food.uuid } })
    }

    useEffect(() => {
        const index = basket.findIndex(f => f.uuid === food.uuid)
        setFoodQuantity(basket[index].foodQuantity)

    }, [basket])

    useEffect(() => {
        dispatch({ type: 'SET_FOOD_QUANTITY', payload: { uuid: food.uuid, foodQuantity } })

    }, [foodQuantity])

    return (
        <div className="p-2 w-full">
            <p className="font-semibold">{food.name}</p>
            <div className="flex space-x-12 w-full">
                <div className="w-1/2">
                    <img
                        src="/food_image.png"
                        className="rounded-md object-cover"
                        alt=""
                        style={{ minHeight: "7rem", maxHeight: "7rem" }} />
                </div>
                <div className="flex-row">
                    <div className="flex h-fit">
                        <button
                            onClick={() => handleFoodQuantity('-')}
                            disabled={foodQuantity === 1}
                            className="px-2 border text-sm">-</button>
                        <p className="px-2 border text-sm">{foodQuantity}</p>
                        <button
                            onClick={() => handleFoodQuantity('+')}
                            className="px-2 border text-sm">+</button>
                    </div>
                    <p className="mt-3 text-center">
                        <span className="text-lg text-orange-500">₱ </span>
                        {(food.price * food.foodQuantity).toLocaleString()}
                    </p>
                    <div className="mt-2 flex justify-start">
                        <button onClick={removeFood} className="py-1 text-xs w-full px-2 text-white bg-orange-500  hover:bg-orange-600">Remove</button>
                    </div>
                </div>
            </div>
            <hr className="mt-4" />
        </div>
    );
}

export default BasketFood;