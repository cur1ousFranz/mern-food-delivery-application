const FoodCategories = ({
    categories,
    setcurrentFoodCategory,
    currentFoodCategory,
}) => {

    const handleSmoothScroll = (event, name) => {
        event.preventDefault()
        document.getElementById(name).scrollIntoView({ behavior: "smooth" });
    }

    return (
        <div>
            <div className="my-4 flex flex-col">
                {categories.map(category => (
                    <a
                        href={`#${category.category_name}`}
                        onClick={(e) => {
                            handleSmoothScroll(e, category.category_name)
                            setcurrentFoodCategory(category.category_name)
                        }}
                        className={currentFoodCategory === category.category_name
                            ? "px-2 py-4 rounded-sm cursor-pointer bg-orange-300"
                            : "px-2 py-4 rounded-sm cursor-pointer text-gray-700 hover:text-gray-900 hover:bg-orange-200"}
                        key={category._id}>
                        {category.category_name}
                    </a>
                ))}
            </div>
        </div>
    );
}

export default FoodCategories;