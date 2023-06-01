import { useContext, useEffect, useState } from "react";
import { OrderContext } from "../../context/OrderContext";
import axiosClient from "../../axios";
import { AuthContext } from "../../context/AuthContext";

import { io } from 'socket.io-client'
import { WEBSOCKET_URL } from '../../constants'
import SessionExpired from "../SessionExpired";

const Orders = () => {

    const { orders, dispatch } = useContext(OrderContext)
    const { store } = useContext(AuthContext)
    const [sessionExpired, setSessionExpired] = useState(false)

    useEffect(() => {

        const getStoreOrders = async () => {
            try {
                const response = await axiosClient.get(`/orders/store/${store.id}`)
                const data = await response.data
                if (response.status === 200) {
                    dispatch({ type: 'SET_ORDERS', payload: data })
                }
            } catch (error) {
                if (error.response.data.error === 'Session Expired') {
                    setSessionExpired(true)
                }
            }
        }

        getStoreOrders()

    }, [])

    // WEBSOCKETS ORDER
    useEffect(() => {
        const socket = io(WEBSOCKET_URL)

        socket.on('connect', () => {
            socket.on('send-order-notif', (order) => {
                dispatch({ type: 'ADD_ORDER', payload: order })
            })
        })

        // Create websocket room with store id
        if (store) {
            socket.emit('store-room', store.id, message => {
                // console.log(message)
            })
        }

        return () => {
            socket.off('connect')
            socket.off('send-message')
            socket.disconnect()
        }

    }, [])

    return (
        <div>
            <div className="p-4">
                {/* Get food name, quantity, choices, total, status, order time */}
                <div className="text-center grid grid-cols-5 p-4 font-semibold my-3 border rounded-sm text-gray-700">
                    <h1>Name</h1>
                    <h1>Choices</h1>
                    <h1>Quantity</h1>
                    <h1>Total</h1>
                    <h1>Status</h1>
                </div>
                {orders && orders.map(order => (
                    <div
                        key={order._id}
                        className="p-4 my-3 cursor-pointer border grid grid-cols-5 rounded-md hover:shadow-md">
                        <p className="font-semibold">{order.food_name}</p>
                        {/* <small className="text-muted px-1">{moment(order.created_at).fromNow()}</small> */}

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
                            <p className={order.status === 'Pending'
                                ? "mx-auto text-sm px-2 py-1 rounded-full w-fit h-fit text-gray-700 bg-yellow-300 hover:bg-yellow-400"
                                : "mx-auto text-sm px-2 py-1 rounded-full w-fit h-fit text-gray-700 bg-green-300 hover:bg-green-400"}>
                                {order.status}
                            </p>
                            {/* <p className="mx-auto text-sm px-2 py-1 rounded-full w-fit h-fit text-gray-700 bg-gray-300 hover:bg-gray-400">
                                Complete
                            </p> */}

                        </div>
                    </div>
                ))}
            </div>

            {sessionExpired && (
                <SessionExpired />
            )}
        </div>
    )
}

export default Orders;