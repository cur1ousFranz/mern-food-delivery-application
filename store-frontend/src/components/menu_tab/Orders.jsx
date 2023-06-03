import { useContext, useEffect, useState } from "react";
import { OrderContext } from "../../context/OrderContext";
import axiosClient from "../../axios";
import { AuthContext } from "../../context/AuthContext";

import { io } from 'socket.io-client'
import { WEBSOCKET_URL } from '../../constants'
import SessionExpired from "../SessionExpired";
import PendingOrders from "../sub_menu_tab/PendingOrders";
import CompletedOrders from "../sub_menu_tab/CompletedOrders";

const Orders = () => {

    const { orders, dispatch } = useContext(OrderContext)
    const { store } = useContext(AuthContext)
    const [sessionExpired, setSessionExpired] = useState(false)
    const [isPendingButton, setIsPendingButton] = useState(true)
    const [currentOrders, setCurrentOrders] = useState([])

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

    /**
     * TODO:: UPDATE ALSO THE COMPLETED ORDERS
     */

    return (
        <div className="p-4">
            <div>
                <div className="flex space-x6">
                    <button
                        onClick={() => setIsPendingButton(true)}
                        className={isPendingButton
                            ? "px-2 py-1 rounded-l-sm border bg-yellow-300"
                            : "px-2 py-1 rounded-l-sm border bg-gray-100 hover:bg-gray-300"}>
                        Pending Orders
                    </button>
                    <button
                        onClick={() => setIsPendingButton(false)}
                        className={!isPendingButton
                            ? "px-2 py-1 rounded-r-sm border bg-green-300"
                            : "px-2 py-1 rounded-r-sm border bg-gray-100 hover:bg-gray-300"}>
                        Completed Orders
                    </button>
                </div>
                {/* Get food name, quantity, choices, total, status, order time */}
                <div className="text-center grid grid-cols-5 p-4 font-semibold my-3 border rounded-sm text-gray-700">
                    <h1>Name</h1>
                    <h1>Choices</h1>
                    <h1>Quantity</h1>
                    <h1>Total</h1>
                    <h1>Status</h1>
                </div>

                {isPendingButton && (
                    <PendingOrders orders={currentOrders} />
                )}

                {!isPendingButton && (
                    <CompletedOrders orders={currentOrders} />
                )}
            </div>

            {sessionExpired && (
                <SessionExpired />
            )}
        </div>
    )
}

export default Orders;