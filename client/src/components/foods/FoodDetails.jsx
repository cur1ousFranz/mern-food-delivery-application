const FoodDetails = ({ food, selectFood }) => {
    return (
        <div
            onClick={() => food.available ? selectFood(true, food) : ''}
            className={food.available
                ? "rounded-md cursor-pointer shadow-sm flex flex-col md:flex-row hover:shadow-xl"
                : "rounded-md border-l-4 border-gray-500 cursor-pointer shadow-sm flex hover:shadow-xl"}>
            <img
                src="/img/food_image.png"
                className=" rounded-t-md object-cover"
                style={{ height: "150px" }}
                alt={food.name} />
            <div className="w-full flex justify-between">
                <div className="px-4 py-2 w-full">
                    <div className="flex justify-between">
                        <p className="text-sm md:text-base font-semibold">{food.name}</p>
                        <img src="/img/heart.svg" className="hidden md:block w-5" alt="" />
                    </div>
                    <div className="flex justify-between">
                        <p className="text-orange-500">
                            <span className="text-lg">
                                ₱
                            </span>
                            {food.price.toLocaleString()}
                        </p>
                        <img src="/img/heart.svg" className="md:hidden w-5" alt="" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FoodDetails;