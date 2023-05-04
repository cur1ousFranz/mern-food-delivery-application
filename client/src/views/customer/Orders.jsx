import { useState } from "react";

const Orders = () => {

    const [currentTab, setCurrentTab] = useState('Order')

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
                    <div className="shadow-sm rounded-3xl border grid grid-cols-3 cursor-pointer hover:shadow-md">
                        <img src="/img/food1.jpeg" className="rounded-l-3xl" alt="" />

                        <div className="py-3 space-y-2">
                            <h1 className="font-bold text-xl">Chicken Menudo Family Size</h1>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam, ut.</p>
                            <p>Total: <span className="text-lg text-orange-500">₱</span> 100,200</p>
                            <p>Delivery: <span className="text-orange-800">Pending</span></p>
                        </div>

                        {/* Check if food has choices otherwise dont show this */}
                        <div className="px-2 py-3 space-y-2">
                            <h1 className="font-bold text-xl">Food Choices</h1>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Orders;