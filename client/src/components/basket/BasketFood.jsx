import { useContext, useEffect, useState } from "react";
import { BasketContext } from "../../context/BasketContext";

const BasketFood = ({ food }) => {
    const { dispatch } = useContext(BasketContext)
    const [foodCount, setFoodCount] = useState(food.foodCount)

    const handleFoodCount = (operator) => {
        switch (operator) {
            case '-':
                setFoodCount(foodCount - 1)
                return
            case '+':
                setFoodCount(foodCount + 1)
        }
    }

    const removeFood = () => {
        dispatch({ type: 'REMOVE_TO_BASKET', payload: { id: food._id } })
    }

    useEffect(() => {
        dispatch({ type: 'SET_FOOD_COUNT', payload: { id: food._id, foodCount } })

    }, [foodCount])

    return (
        <div className="p-2 w-full">
            <p className="text-sm">{food.name}</p>
            <div className="flex space-x-12 w-full">
                <div className="w-1/2">
                    <img src="/gray-image.png" className="rounded-md" alt="" />
                </div>
                <div className="flex-row">
                    <div className="flex h-fit">
                        <button onClick={() => handleFoodCount('-')} disabled={foodCount === 1} className="px-2 border text-sm">-</button>
                        <p className="px-2 border text-sm">{foodCount}</p>
                        <button onClick={() => handleFoodCount('+')} className="px-2 border text-sm">+</button>
                    </div>
                    <p className="mt-3 text-center">
                        <span className="text-lg text-orange-500">₱</span>
                        {food.price * food.foodCount}
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