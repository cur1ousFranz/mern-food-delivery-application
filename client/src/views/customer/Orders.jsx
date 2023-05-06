import { useEffect, useState } from "react";
import OrderList from "../../components/order/OrderList";
import axiosClient from '../../axios'

const Orders = () => {

    const [currentTab, setCurrentTab] = useState('Order')
    const [orders, setOrders] = useState([])

    useEffect(() => {
        
        const getAllOrders = async () => {
            try {
                const response = await axiosClient.get('/orders')
                const data = await response.data
                if(response.status === 200) {
                    setOrders(data)
                }
            } catch (error) {
                console.log(error)
            }
        }

        getAllOrders()
    },[])

    return (
        <div className="px-4 md:px-12 py-6" >
            <h1 className="text-2xl font-semibold">Your Orders</h1>
            <div className="mt-3 flex space-x-4 p-4 rounded-md">
                <div className="hidden md:block w-1/4 max-h-screen sticky top-0 overflow-y-auto">
                    <h1
                        onClick={() => setCurrentTab('Order')}
                        className={currentTab === 'Order'
                            ? "cursor-pointer mt-4 p-4 rounded-sm bg-orange-200 text-gray-700"
                            : "cursor-pointer mt-4 p-4 rounded-sm hover:bg-orange-100 hover:text-gray-700"}>
                        {/* <span className="inline-block mr-2"><img src="/img/shop.svg" alt="" /></span> */}
                        Order
                    </h1>
                    <h1
                        onClick={() => setCurrentTab('Delivery')}
                        className={currentTab === 'Delivery'
                            ? "cursor-pointer p-4 rounded-sm bg-orange-200 text-gray-700"
                            : "cursor-pointer p-4 rounded-sm hover:bg-orange-100 hover:text-gray-700"}>
                        {/* <span className="inline-block mr-2"><img src="/img/gear-fill.svg" alt="" /></span> */}
                        Delivery
                    </h1>
                    <h1
                        onClick={() => setCurrentTab('Order History')}
                        className={currentTab === 'Order History'
                            ? "cursor-pointer p-4 rounded-sm bg-orange-200 text-gray-700"
                            : "cursor-pointer p-4 rounded-sm hover:bg-orange-100 hover:text-gray-700"}>
                        {/* <span className="inline-block mr-2"><img src="/img/key.svg" alt="" /></span> */}
                        Order History
                    </h1>
                </div>

                <div className="w-full p-4 border-l">

                    {/* IF TAB IS ORDER */}
                    {currentTab === 'Order' && (
                        <OrderList orders={orders} />
                    )}

                </div>
            </div>
        </div>
    );
}

export default Orders;