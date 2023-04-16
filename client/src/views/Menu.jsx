import axios from "axios";
import { useContext, useEffect, useState } from "react";
import FoodDetails from "../components/FoodDetails";
import { FoodContext } from "../context/FoodContext";
import Categories from "../components/Categories";

const Menu = () => {

    const { foods, dispatch } = useContext(FoodContext)
    const [foodList, setFoodList] = useState([]);
    const [search, setSearch] = useState('')

    const handleSearchChange = (e) => {
        const searchValue = e.target.value;
        setSearch(searchValue);

        // Filter the foodList based on the search value
        const filteredFoodList = foods.filter((food) =>
            food.name.toLowerCase().includes(searchValue.toLowerCase())
        )

        setFoodList(filteredFoodList);
    };

    useEffect(() => {
        const getAllFoods = async () => {
            const response = await axios.get('/api/foods')
            const foodsData = response.data

            if (response.status === 200) {
                dispatch({ type: 'SET_FOODS', payload: foodsData })
            }
        }

        getAllFoods()
    }, [])

    useEffect(() => {
        // Initialize foodList with the foods from context API
        setFoodList(foods);
    }, [foods]);

    return (
        <div className="px-6 md:px-24 py-8">
            <h1 className="font-semibold text-lg md:text-2xl">Menu</h1>
            <div className="flex justify-between mt-4">
                <div className="hidden md:block">
                    <Categories />
                </div>
                <div className="w-full p-1 md:w-1/4 flex border-b border-gray-400 ">
                    <input type="text" onChange={handleSearchChange} value={search} className="w-full px-2 rounded-md focus:outline-none" placeholder="Search Food" />
                    <img src="spoon-fork.svg" className="w-8 h-8" alt="" />
                </div>
            </div>
            <div className="md:hidden">
                <Categories />
            </div>
            { foodList && (
                <div className="grid grid-cols-2 gap-4 py-8 md:grid-cols-4">
                    {foodList.map((food) => (
                        <FoodDetails food={food} key={food._id} />
                    ))}
                </div>
            )}
            { foodList && foodList.length == 0 ? (
                <p className="text-center md:text-lg font-semibold text-gray-400">No food to show</p>
            ) : ''}

        </div>
    );
}

export default Menu;