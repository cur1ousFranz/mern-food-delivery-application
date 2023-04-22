import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axiosClient from '../../axios'
import Foods from "../../components/foods/Foods";

const Store = () => {
    const { store } = useContext(AuthContext)
    const [storeData, setStoreData] = useState([])
    const [foods, setFoods] = useState([])
    const [selectedTab, setSelectedTab] = useState('Dashboard')

    useEffect(() => {

        const getStoreDetails = async () => {
            try {
                const response = await axiosClient.get(`/stores/${store.id}`)
                const data = await response.data
                setStoreData(data)
            } catch (error) {
                console.log(error)
            }

        }

        const getStoreFoods = async () => {
            try {
                const response = await axiosClient.get(`/foods/store/${store.id}`)
                const data = await response.data
                setFoods(data)
            } catch (error) {
                console.log(error)
            }
        }

        getStoreDetails()
        getStoreFoods()

    }, [])

    return (
        <div className="flex">
            <div className="hidden md:block w-1/5 py-6 max-h-screen sticky border-r top-0 overflow-y-auto">
                {storeData && (
                    <div className="">
                        <h1 className="text-xl px-2 font-bold text-center">{ storeData.store_name}</h1>
                        <div className="mt-6">
                            <h1 onClick={() => setSelectedTab('Dashboard')} className={ selectedTab === 'Dashboard' ? "px-4 py-4 bg-orange-200" : "px-4 py-4 hover:bg-orange-100"}>Dashboard</h1>
                            <h1 onClick={() => setSelectedTab('Foods')} className={ selectedTab === 'Foods' ? "px-4 py-4 bg-orange-200" : "px-4 py-4 hover:bg-orange-100"}>Foods</h1>
                            <h1 onClick={() => setSelectedTab('Orders')} className={ selectedTab === 'Orders' ? "px-4 py-4 bg-orange-200" : "px-4 py-4 hover:bg-orange-100"}>Orders</h1>
                            <h1 onClick={() => setSelectedTab('Delivery')} className={ selectedTab === 'Delivery' ? "px-4 py-4 bg-orange-200" : "px-4 py-4 hover:bg-orange-100"}>Delivery</h1>
                            <h1 onClick={() => setSelectedTab('Transactions')} className={ selectedTab === 'Transactions' ? "px-4 py-4 bg-orange-200" : "px-4 py-4 hover:bg-orange-100"}>Transactions</h1>
                            <h1 onClick={() => setSelectedTab('Sales')} className={ selectedTab === 'Sales' ? "px-4 py-4 bg-orange-200" : "px-4 py-4 hover:bg-orange-100"}>Sales</h1>
                        </div>
                    </div>
                )}
            </div>
            <div className="w-3/4">
                {selectedTab === 'Foods' && storeData && (
                    <Foods foods={foods} storeData={storeData} />
                )}
            </div>
        </div>
    );
}

export default Store;