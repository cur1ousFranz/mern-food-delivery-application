import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FoodContext } from "../../context/FoodContext";
import FoodDetails from "../../components/foods/FoodDetails";
import FoodCategories from "../../components/foods/FoodCategories";
import NotFound from "../../components/NotFound";
import ShowFood from "../../components/foods/ShowFood";
import axiosClient from "../../axios";

const ShowStore = () => {
    // TODO:: PAGINATION IN FOOD LIST (STORE SIDE)

    const { id } = useParams()
    const [store, setStore] = useState()
    const { foods, dispatch } = useContext(FoodContext)
    const [foodList, setFoodList] = useState([]);
    const [search, setSearch] = useState('')
    const [foodsLoading, setFoodsLoading] = useState(false)
    const [currentFoodCategory, setcurrentFoodCategory] = useState('All')
    const [error, setError] = useState(false)
    const [viewFood, setViewFood] = useState(false)
    const [selectedFood, setSelectedFood] = useState(null)

    // const [currentPage, setCurrentPage] = useState(1)
    // const [moreDataAvailable, setMoreDataAvailable] = useState(true)

    useEffect(() => {

        const getStoreDetails = async () => {
            try {
                const response = await axiosClient.get(`/stores/${id}`)
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
            const response = await axiosClient.get(`/foods/store/${id}`)
            setFoodsLoading(false)
            const foodsData = response.data

            if (response.status === 200) {
                dispatch({ type: 'SET_FOODS', payload: foodsData })

            }
        }

        getStoreDetails()
        getAllFoods()

    }, [])

    useEffect(() => {
        // Listen to foods changes and set data to foodList
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

    const selectFood = (value, food = null) => {
        setViewFood(value)
        setSelectedFood(food)
    }

    // const viewMoreFoods = async () => {
    //     try {
    //         const response = await axiosClient.get(`/foods/store/${id}?limit=10&page=${currentPage}`)
    //         const data = await response.data
    //         if (response.status === 200) {
    //             dispatch({ type: 'SET_FOODS', payload: [...foodList, ...data] })
    //             setCurrentPage(currentPage + 1)

    //             if(data.length < 10) {
    //                 setMoreDataAvailable(false)
    //             }
    //         }
    //     } catch (error) {
    //         const status = error.response.status
    //         if (status === 400 || status === 404) {
    //             setError(true)
    //         }
    //     }
    // }

    return (
        <div className="px-4 md:px-12 py-8" >
            {!error && store && (
                <h1 className="font-semibold text-xl md:text-4xl">{store.store_name}
                    <span className="inline-block ml-5">
                        <img src="/img/star-fill.svg" alt="" className="w-4 md:w-5" />
                    </span>
                </h1>
            )}

            {!error && store && (
                <div>
                    <div className="md:hidden grid grid-cols-2">
                        <div className="flex-row md:flex md:space-x-3">
                            <div className="flex space-x-1">
                                <img src="/img/star-fill.svg" className="w-4" alt="" />
                                <p>4.7 (43 ratings)</p>
                            </div>

                            <div className="flex space-x-1">
                                <img src="/img/clock-fill.svg" className="w-4" alt="" />
                                <p>Open 24 hours</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-between mt-4">
                        <div className="hidden md:block w-full">
                            <div className="flex-row md:flex md:space-x-3">
                                <div className="flex space-x-1">
                                    <img src="/img/star-fill.svg" className="w-4" alt="" />
                                    <p>4.7 (43 ratings)</p>
                                </div>

                                <div className="flex space-x-1">
                                    <img src="/img/clock-fill.svg" className="w-4" alt="" />
                                    <p>Open 24 hours</p>
                                </div>
                            </div>
                        </div>

                        {!viewFood && (
                            <div className="w-full h-fit p-1 md:w-2/4 flex border-b border-gray-400 ">
                                <input
                                    type="text"
                                    onChange={handleSearchChange}
                                    value={search}
                                    className="w-full px-2 rounded-md focus:outline-none"
                                    placeholder="Search Food" />
                                <img src="/img/spoon-fork.svg" className="w-8 h-8" alt="" />
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
                                <FoodCategories
                                    categories={store.food_categories}
                                    setcurrentFoodCategory={setcurrentFoodCategory}
                                    currentFoodCategory={currentFoodCategory} />
                            )}
                        </div>
                    </div>

                    <div className="w-full">
                        {store && store.food_categories.map(category => (
                            <div key={category._id} className="mt-3">
                                <h1
                                    className="font-semibold text-lg px-4 py-3 rounded-md bg-gray-100 text-gray-600"
                                    id={category.category_name}>
                                    {category.category_name}
                                </h1>
                                {!error && !foodsLoading && foodList && (
                                    <div className="grid grid-cols-2 gap-4 py-4">
                                        {foodList.map((food) => {
                                            if (category.category_name === food.category) {
                                                return (
                                                    <FoodDetails
                                                        food={food}
                                                        key={food._id}
                                                        selectFood={selectFood} />
                                                )
                                            }
                                        })}
                                    </div>
                                )}
                            </div>
                        ))}

                        {!error && foodsLoading && (
                            <div>
                                <p>Loading</p>
                            </div>
                        )}

                        {!error && !foodsLoading && foodList && foodList.length === 0 && (
                            <div className="text-center shadow-md border bg-gray-200 p-24">
                                <p className="text-2xl font-bold text-gray-500">Coming soon..</p>
                            </div>
                        )}

                        {/* {!error && !foodsLoading && foodList && foodList.length > 0 && moreDataAvailable && (
                            <div className="flex justify-center w-full">
                                <button
                                    onClick={viewMoreFoods}
                                    className="px-3 py-2 bg-orange-500 text-white">
                                    View More
                                </button>
                            </div>
                        )} */}

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