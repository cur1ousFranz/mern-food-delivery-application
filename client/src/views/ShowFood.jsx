const ShowFood = ({ selectFood, selectedFood }) => {
    return (
        <div className="my-6">
            <button className="py-1 px-3 mb-4 rounded-md h-fit bg-gray-200 hover:bg-gray-300" onClick={() => selectFood(false)}>Back</button>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-5 md:gap-y-0">
                <img src="/spag.jpg" className="w-full rounded-md object-cover" alt="" />
                <div className="py-6">
                    <h1 className="text-bold text-2xl text-orange-500">{selectedFood.name}</h1>
                    <div className="flex space-x-1 mt-2">
                        <img src="/heart.svg" className="w-6" alt="" />
                        <p className="font-semibold">107 Likes</p>
                    </div>
                    <p className="mt-6 font-bold">Description</p>
                    <p className="">{selectedFood.description}</p>
                    <p className=" font-semibold mt-10 text-2xl text-orange-500"><span className="text-4xl">₱ </span>{selectedFood.price}</p>
                    <div className="flex mt-6">
                        <p className="py-2 px-4 border">-</p>
                        <p className="py-2 px-4 border">1</p>
                        <p className="py-2 px-4 border">+</p>
                    </div>
                    <button className="mt-12 w-full rounded-md py-2 px-4 bg-orange-500 hover:bg-orange-600 text-white">Cart Now</button>
                </div>
            </div>
        </div>
    );
}

export default ShowFood;