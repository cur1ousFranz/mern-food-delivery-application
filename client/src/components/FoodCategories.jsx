import { useState } from "react";

const FoodCategories = ({ categories, selectCategory, currentFoodCategory }) => {
    const handleClick = (category) => {
        selectCategory(category)
    }

    return (
        <div className="text-sm flex flex-wrap space-x-2 mt-2 md:text-base">
            <div className="flex space-x-2 hover:text-gray-700">
                <p className={currentFoodCategory === 'All' ? 'font-semibold cursor-pointer text-orange-500 underline' : 'cursor-pointer hover:underline hover:text-orange-500'} onClick={() => handleClick('All')}>All</p>
                <p className="text-gray-400">/</p>
            </div>
            {categories && categories.map((category) => (
                <div className="flex space-x-2 hover:text-gray-700" key={category._id} >
                    <p onClick={() => handleClick(category.category_name)} className={currentFoodCategory === category.category_name ? 'font-semibold cursor-pointer text-orange-500 underline' : 'cursor-pointer hover:underline hover:text-orange-500'}>{category.category_name}</p>
                    <p className="text-gray-400">/</p>
                </div>
            ))}
        </div>
    );
}

export default FoodCategories;