const FoodDetails = ({ food, selectFood }) => {
    return (
        <div className="border rounded-md">
            <img src="/gray-image.png" className="rounded-t-md h-100 object-cover" alt={food.name} />
            <div className="px-4 py-2">
                <p className="text-sm md:text-base font-semibold truncate">{food.name}</p>
                <p className="text-orange-500"><span className="text-lg">₱</span> {food.price}</p>
            </div>
            <button onClick={() => selectFood(true, food)} className={food.available ? "text-sm w-full py-1 md:py-2 rounded-b-md bg-orange-500 hover:bg-orange-400 text-white" : "text-sm w-full py-2 rounded-b-md cursor-not-allowed bg-gray-400 text-white"} disabled={!food.available}>
                { food.available ? 'Quick View' : 'Not available'}
            </button>
        </div>
    );
}

export default FoodDetails;