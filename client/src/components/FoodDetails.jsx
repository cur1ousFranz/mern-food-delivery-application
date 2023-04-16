const FoodDetails = ({ food }) => {
    return (
        <div className="border rounded-md">
            <img src="spag.jpg" className="rounded-t-md" alt="" />
            <div className="px-4 py-2">
                <p className="font-semibold truncate">{food.name}</p>
                <p className="text-sm">{food.description}</p>
                <p className="text-orange-500"><span className="text-lg">₱</span> {food.price}</p>
            </div>
            <button className={food.available ? "w-full py-2 rounded-b-md bg-orange-500 hover:bg-orange-400 text-white" : "w-full py-2 rounded-b-md cursor-not-allowed bg-gray-400 text-white"} disabled={!food.available}>
                { food.available ? 'Order Now' : 'Not available'}
            </button>
        </div>
    );
}

export default FoodDetails;