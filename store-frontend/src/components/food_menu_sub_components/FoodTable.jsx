const FoodTable = ({ foods }) => {
    return (
        <table className="mx-auto shadow-md mt-6 w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" className="px-6 py-3 flex space-x-1">
                        <p>Food Name</p>
                        <div className="flex">
                            <span><img src="/img/sort-up.svg" alt="" /></span>
                        </div>
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
                {foods && foods.map(food => (
                    <tr className="bg-white border-b hover:bg-gray-100" key={food._id}>
                        <td className="px-6 py-4">
                            {food.name}
                        </td>
                        <td className="px-6 py-4">
                            {food.category}
                        </td>
                        <td className="px-6 py-4">
                            {food.available ? 'Yes' : 'No'}
                        </td>
                        <td className="px-6 py-4">
                            ₱ {food.price.toLocaleString()}
                        </td>
                    </tr>
                ))}

                {foods.length === 0 && (
                    <tr className="bg-white border-b hover:bg-gray-100">
                        <td colSpan={4} className="px-6 py-4 text-center">
                            No foods available.
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    );
}

export default FoodTable;