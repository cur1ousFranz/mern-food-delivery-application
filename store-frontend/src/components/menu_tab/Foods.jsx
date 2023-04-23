import { useState } from "react";
import FoodForm from "../food_menu_sub_components/FoodForm";
import FoodTable from "../food_menu_sub_components/FoodTable";

const Foods = ({ foods, storeData }) => {
    const [openFoodForm, setOpenFoodForm] = useState(false)

    const handleFoodForm = () => {
        setOpenFoodForm(!openFoodForm)
    }

    return (
        <div className="p-8 w-full">
            <div className="px-6 py-4 shadow-sm border flex justify-end md:justify-between">
                <button
                    onClick={handleFoodForm}
                    className={
                        openFoodForm
                            ? "py-2 px-3 rounded-sm text-sm bg-gray-400 text-white"
                            : "py-2 px-3 rounded-sm text-sm bg-gray-500 hover:bg-gray-600 text-white"} >
                    {openFoodForm
                        ? 'Cancel'
                        : 'Add Food'}
                </button>
            </div>

            {!openFoodForm && (
                <div className="relative overflow-x-auto w-full">
                    <FoodTable foods={foods} />
                </div>
            )}

            {openFoodForm && storeData && (
                <div>
                    <FoodForm 
                    categories={storeData.food_categories} 
                    setOpenFoodForm={setOpenFoodForm} />
                </div>
            )}

        </div>
    );
}

export default Foods;