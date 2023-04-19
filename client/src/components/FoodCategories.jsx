import { useState } from "react";

const FoodCategories = ({ categories, selectCategory, currentFoodCategory }) => {
    const handleClick = (category) => {
        selectCategory(category)
    }

    return (
        <div>
            <div className="my-4 space-y-4">
                <p onClick={() => handleClick('All')} className={currentFoodCategory === 'All' ? "p-2 rounded-md cursor-pointer text-lg bg-orange-200" : "p-2 rounded-md cursor-pointer text-lg text-gray-700 hover:text-gray-900 hover:bg-orange-200"}>
                    All
                </p>
                {categories.map(category => (
                    <p onClick={() => handleClick(category.category_name)} className={currentFoodCategory === category.category_name ? "p-2 rounded-md cursor-pointer text-lg bg-orange-200" : "p-2 rounded-md cursor-pointer text-lg text-gray-700 hover:text-gray-900 hover:bg-orange-200"} key={category._id}>
                        {category.category_name}
                    </p>
                ))}
            </div>
        </div>
    );
}

export default FoodCategories;