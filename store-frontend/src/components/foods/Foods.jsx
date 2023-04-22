import { useState } from "react";
import FoodForm from "./FoodForm";
import { CSSTransition } from 'react-transition-group'

const Foods = ({ foods, storeData }) => {
    const [openFoodForm, setOpenFoodForm] = useState(false)

    const handleFoodForm = () => {
        setOpenFoodForm(!openFoodForm)
    }

    return (
        <div className="p-8 w-full">
            <div className="border px-6 py-4 flex justify-between">
                <h1>Foods</h1>
                <button onClick={handleFoodForm} className={openFoodForm ? "py-2 px-3 rounded-sm text-sm bg-gray-400 text-white" : "py-2 px-3 rounded-sm text-sm bg-orange-500 hover:bg-orange-600 text-white"} >{openFoodForm ? 'Cancel' : 'Add Food'}</button>
            </div>

            {!openFoodForm && (
                <div className="relative overflow-x-auto">
                    <table className="mx-auto shadow-md mt-6 w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Food Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Category
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Available
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Price
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {foods.map(food => (
                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100" key={food._id}>
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {food.name}
                                    </th>
                                    <td className="px-6 py-4">
                                        {food.category}
                                    </td>
                                    <td className="px-6 py-4">
                                        {food.available ? 'Yes' : 'No'}
                                    </td>
                                    <td className="px-6 py-4">
                                        {food.price.toLocaleString()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {openFoodForm && storeData && (
                <div>
                    <FoodForm categories={storeData.food_categories} />
                </div>
            )}

        </div>
    );
}

export default Foods;