import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FoodContext } from "../context/FoodContext";
import FoodDetails from "../components/FoodDetails";
import FoodCategories from "../components/FoodCategories";
import NotFound from "./NotFound";

const ShowStore = () => {
    const { id } = useParams()
    const [store, setStore] = useState()
    const { foods, dispatch } = useContext(FoodContext)
    const [foodList, setFoodList] = useState([]);
    const [search, setSearch] = useState('')
    const [message, setMessage] = useState(true)
    const [foodsLoading, setFoodsLoading] = useState(false)
    const [currentFoodCategory, setcurrentFoodCategory] = useState('All')
    const [error, setError] = useState(false)

    useEffect(() => {

        const getStoreDetails = async () => {
            try {
                const response = await axios.get(`/api/stores/${id}`)
                const data = response.data

                if (response.status === 200) {
                    setStore(data)
                }
            } catch (error) {
                const status = error.response.status
                if (status === 400 || status === 404) {
                    setError(true)
                }
            }

        }

        const getAllFoods = async () => {
            setFoodsLoading(true)
            const response = await axios.get('/api/foods')
            setFoodsLoading(false)
            const foodsData = response.data

            if (response.status === 200) {
                dispatch({ type: 'SET_FOODS', payload: foodsData })

                // Check if there is available food products in current selected store
                foodsData.map((food) => {
                    if (food.store_id === id && message) {
                        setMessage(false);
                    }
                })
            }
        }

        getStoreDetails()
        getAllFoods()

    }, [])

    useEffect(() => {
        // Initialize foodList with the foods from context API
        setFoodList(foods);

    }, [foods]);

    const handleSearchChange = (e) => {
        const searchValue = e.target.value;
        setSearch(searchValue);

        // Filter the foodList based on the search value
        const filteredFoodList = foods.filter((food) =>
            food.name.toLowerCase().includes(searchValue.toLowerCase())
        )

        setFoodList(filteredFoodList);
    };

    const selectCategory = (category) => {
        setcurrentFoodCategory(category)
    }


    return (
        <div className="px-6 md:px-24 py-8" >
            {!error && store && (
                <h1 className="font-semibold text-lg md:text-2xl">{store.store_name}</h1>
            )}
            
            {!error && (
                <div className="flex justify-between mt-4">
                    <div className="hidden md:block w-2/4">
                        {store && (
                            <FoodCategories categories={store.food_categories} selectCategory={selectCategory} currentFoodCategory={currentFoodCategory} />
                        )}
                    </div>
                    <div className="w-full h-fit p-1 md:w-1/3 flex border-b border-gray-400 ">
                        <input type="text" onChange={handleSearchChange} value={search} className="w-full px-2 rounded-md focus:outline-none" placeholder="Search Food" />
                        <img src="/spoon-fork.svg" className="w-8 h-8" alt="" />
                    </div>
                </div>

            )}

            {!error && (
                <div className="md:hidden">
                    {store && (
                        <FoodCategories categories={store.food_categories} selectCategory={selectCategory} currentFoodCategory={currentFoodCategory} />
                    )}
                </div>
            )}

            {!error && !foodsLoading && foodList && (
                <div className="grid grid-cols-2 gap-4 py-8 md:grid-cols-4">
                    {foodList.map((food) => {
                        if (food.store_id === id) {
                            if (currentFoodCategory === 'All') {
                                return (
                                    <FoodDetails food={food} key={food._id} />
                                )
                            }

                            if (currentFoodCategory === food.category) {
                                return (
                                    <FoodDetails food={food} key={food._id} />
                                )
                            }
                        }
                    })}
                </div>
            )}

            {!error && foodsLoading && (
                <div>
                    <p>Loading</p>
                </div>
            )}

            {!error && !foodsLoading && message && (
                <div className="text-center shadow-md border bg-gray-200 p-24">
                    <p className="text-2xl font-bold text-gray-500">Coming soon..</p>
                </div>
            )}

            {error && (
                <NotFound />
            )}
        </div>
    );
}

export default ShowStore;