import { useEffect, useState } from "react";
import axiosClient from "../../axios";
import { BASE_URL } from "../../constants";

const Order = ({ order }) => {

    const [food, setFood] = useState(null)
    useEffect(() => {
        const getFood = async () => {
            try {
                const response = await axiosClient.get(`/foods/${order.food_id}`)
                const data = await response.data
                if (response.status === 200) {
                    setFood(data)
                }
            } catch (error) {

            }
        }

        getFood()
    }, [])
    
    return (
        <div>
            {food && (
                <div className="grid cursor-pointer grid-cols-1 md:grid-cols-2">
                    <img
                        src={food.image
                            ? `${BASE_URL}/${food.image}`
                            : "/img/food_image.png"}
                        className="rounded-md"
                        alt="" />

                    <div>
                        <div className="space-y-2 mt-4 md:mt-0 md:px-6">
                            <h1 className="font-bold text-xl">{food.name}</h1>
                            <p className="text-sm">{food.description}</p>
                            <p>Total: <span className="text-lg text-orange-500">₱ </span>{order.total_price.toLocaleString()}</p>
                            <p>Delivery: <span className="text-orange-800">{order.status}</span></p>
                        </div>

                        {/* Check if food has choices otherwise dont show this */}
                        {order.has_choices && (
                            <div className="py-4 space-y-2 md:px-6">
                                <h1 className="font-bold text-xl">Food Choices</h1>

                                {order.choice_options.map((choice, index) => (
                                    <div key={index} className="flex space-x-2">
                                        <span>
                                            <img
                                                src="/img/check-circle-fill.svg"
                                                className="w-4 inline-block"
                                                alt="" /></span>
                                        <p className="font-semibold text-gray-700">
                                            {choice.choiceTitle}: {choice.selectedOption.map((option, index) => (
                                                <span
                                                    key={index}
                                                    className="text-sm font-normal me-1 text-gray-700">
                                                    {option.optionName},
                                                </span>
                                            ))}
                                        </p>


                                    </div>
                                ))}
                            </div>
                        )}

                        {order.has_instructions && order.instruction && (
                            <h1 className="mt-4 font-semibold px-2 py-4 shadow-sm rounded-sm text-gray-700 bg-gray-100">Note:
                                <span className="font-normal"> {order.instruction}</span>
                            </h1>
                        )}
                    </div>

                </div>
            )}
        </div>
    );
}

export default Order;