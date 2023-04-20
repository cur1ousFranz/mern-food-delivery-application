import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FoodContext } from "../../context/FoodContext";
import FoodDetails from "../../components/foods/FoodDetails";
import FoodCategories from "../../components/foods/FoodCategories";
import NotFound from "../../components/NotFound";
import ShowFood from "../../components/foods/ShowFood";

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
    const [viewFood, setViewFood] = useState(false)
    const [selectedFood, setSelectedFood] = useState(null)

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

    const selectFood = (value, food = null) => {
        setViewFood(value)
        setSelectedFood(food)
    }

    return (
        <div className="px-4 md:px-12 py-8" >
            {!error && store && (
                <h1 className="font-semibold text-xl md:text-4xl">{store.store_name}
                    <span className="inline-block ml-5">
                        <img src="/star-fill.svg" alt="" className="w-4 md:w-5" />
                    </span>
                </h1>
            )}

            {!error && store && (
                <div>
                    <div className="md:hidden grid grid-cols-2">
                        <div className="flex-row md:flex md:space-x-3">
                            <div className="flex space-x-1">
                                <img src="/star-fill.svg" className="w-4" alt="" />
                                <p className="inline-block">4.7 (43 ratings)</p>
                            </div>

                            <div className="flex space-x-1">
                                <img src="/clock-fill.svg" className="w-4" alt="" />
                                <p>Open 24 hours</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-between mt-4">
                        <div className="hidden md:block w-full">
                            <div className="flex-row md:flex md:space-x-3">
                                <div className="flex space-x-1">
                                    <img src="/star-fill.svg" className="w-4" alt="" />
                                    <p className="inline-block">4.7 (43 ratings)</p>
                                </div>

                                <div className="flex space-x-1">
                                    <img src="/clock-fill.svg" className="w-4" alt="" />
                                    <p>Open 24 hours</p>
                                </div>
                            </div>
                        </div>

                        {!viewFood && (
                            <div className="w-full h-fit p-1 md:w-2/4 flex border-b border-gray-400 ">
                                <input type="text" onChange={handleSearchChange} value={search} className="w-full px-2 rounded-md focus:outline-none" placeholder="Search Food" />
                                <img src="/spoon-fork.svg" className="w-8 h-8" alt="" />
                            </div>
                        )}
                    </div>
                </div>
            )}

            {!viewFood && (
                <div className="flex space-x-4">

                    <div className="hidden md:block w-1/4 py-6 max-h-screen sticky top-0 overflow-y-auto">
                        <h1 className="text-xl font-bold">Menu</h1>
                        <div className="mt-6">
                            {store && (
                                <FoodCategories categories={store.food_categories} selectCategory={selectCategory} currentFoodCategory={currentFoodCategory} />
                            )}
                        </div>
                    </div>

                    <div className="w-full">
                        {!error && !foodsLoading && foodList && (
                            <div className="grid grid-cols-2 gap-4 py-8 md:grid-cols-4">
                                {foodList.map((food) => {
                                    if (food.store_id === id) {
                                        if (currentFoodCategory === 'All') {
                                            return (
                                                <FoodDetails food={food} key={food._id} selectFood={selectFood} />
                                            )
                                        }

                                        if (currentFoodCategory === food.category) {
                                            return (
                                                <FoodDetails food={food} key={food._id} selectFood={selectFood} />
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
                    </div>
                </div>
            )}

            {viewFood && (
                <ShowFood selectFood={selectFood} selectedFood={selectedFood} />
            )}

            {error && (
                <NotFound />
            )}
        </div>
    );
}

export default ShowStore;