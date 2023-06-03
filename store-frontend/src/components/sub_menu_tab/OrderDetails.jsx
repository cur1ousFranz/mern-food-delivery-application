import { useContext, useState } from "react";
import ConfirmationModal from '../modals/ConfirmationModal'
import axiosClient from "../../axios";
import { OrderContext } from "../../context/OrderContext";

const OrderDetails = ({ order }) => {

    const [showModal, setShowModal] = useState(false)
    const { dispatch } = useContext(OrderContext)

    const updateOrder = async () => {
        try {
            const response = await axiosClient.put(`/orders/${order._id}`, {
                status: 'Completed'
            })
            const data = await response.data
            if (response.status === 200) {
                dispatch({ type: 'REMOVE_ORDER', payload: data})
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div
            className="p-4 my-3 cursor-pointer border grid grid-cols-5 rounded-md hover:shadow-md">
            <p className="font-semibold">{order.food_name}</p>
            <div>
                {order.choice_options.map((choice, index) => (
                    <div key={index} className="px-4">

                        <p className="font-semibold text-sm text-gray-700">
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

                {order.has_instructions && order.instruction && (
                    <h1 className="mt-4 font-semibold px-2 py-4 shadow-sm rounded-sm text-gray-700 bg-gray-100">Note:
                        <span className="font-normal"> {order.instruction}</span>
                    </h1>
                )}

            </div>

            <p className="text-center">{order.food_quantity}</p>

            <p className="text-center">
                <span className="text-lg text-orange-500">₱ </span>
                {order.total_price.toLocaleString()}
            </p>

            <div className="space-y-3">
                <p
                    onClick={() => setShowModal(true)}
                    className={order.status === 'Pending'
                        ? "mx-auto text-sm px-2 py-1 rounded-xl w-fit h-fit text-gray-700 bg-yellow-300 hover:bg-yellow-400"
                        : "mx-auto text-sm px-2 py-1 rounded-xl w-fit h-fit text-gray-700 bg-green-300 hover:bg-green-400"}>
                    {order.status}
                </p>
            </div>

            {showModal && (
                <ConfirmationModal
                    title={'Set order as completed?'}
                    toggleModal={setShowModal}
                    submit={updateOrder}
                />
            )}
        </div>
    );
}

export default OrderDetails;