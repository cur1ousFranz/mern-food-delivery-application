import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axiosClient from '../../axios'
import Foods from "../../components/menu_tab/Foods";
import { FoodContext } from "../../context/FoodContext";
import Dashboard from "../../components/menu_tab/Dashboard";
import Orders from "../../components/menu_tab/Orders";
import SessionExpired from "../../components/SessionExpired";

const Store = () => {
    const { store } = useContext(AuthContext)
    const [storeData, setStoreData] = useState([])
    const { foods, dispatch } = useContext(FoodContext)
    const [selectedTab, setSelectedTab] = useState('Dashboard')
    const [sessionExpired, setSessionExpired] = useState(false)

    useEffect(() => {

        const getStoreDetails = async () => {
            try {
                const response = await axiosClient.get(`/stores/${store.id}`)
                const data = await response.data

                if(response.status === 200) {
                    setStoreData(data)
                }
            } catch (error) {
                if (error.response.data.error === 'Session Expired') {
                    setSessionExpired(true)
                }
            }

        }

        const getStoreFoods = async () => {
            try {
                const response = await axiosClient.get(`/foods/store/${store.id}`)
                const data = await response.data

                if(response.status === 200) {
                    dispatch({ type: 'SET_FOODS', payload: data})
                }
            } catch (error) {
                console.log(error)
            }
        }

        getStoreDetails()
        getStoreFoods()

    }, [store, dispatch])

    return (
        <div className="flex">
            <div className="hidden md:block w-1/5 py-6 max-h-screen sticky border-r top-0 overflow-y-auto">
                {storeData && (
                    <div className="">
                        <h1 className="text-xl px-3 font-semibold text-center">{storeData.store_name}</h1>
                        <div className="mt-6">
                            <h1
                                onClick={() => setSelectedTab('Dashboard')}
                                className={
                                    selectedTab === 'Dashboard'
                                        ? "px-4 py-4 bg-gray-200"
                                        : "px-4 py-4 hover:bg-gray-100"}>
                                <span className="inline-block me-3"><img src="/img/bar-chart.svg" alt=""/></span>
                                Dashboard
                            </h1>

                            <h1
                                onClick={() => setSelectedTab('Foods')}
                                className={
                                    selectedTab === 'Foods'
                                        ? "px-4 py-4 bg-gray-200"
                                        : "px-4 py-4 hover:bg-gray-100"}>
                                <span className="inline-block me-3"><img src="/img/stack.svg" alt=""/></span>
                                Foods
                            </h1>

                            <h1
                                onClick={() => setSelectedTab('Orders')}
                                className={
                                    selectedTab === 'Orders'
                                        ? "px-4 py-4 bg-gray-200"
                                        : "px-4 py-4 hover:bg-gray-100"}>
                                <span className="inline-block me-3"><img src="/img/card-list.svg" alt="" /></span>
                                Orders
                            </h1>

                            <h1
                                onClick={() => setSelectedTab('Delivery')}
                                className={selectedTab === 'Delivery'
                                    ? "px-4 py-4 bg-gray-200"
                                    : "px-4 py-4 hover:bg-gray-100"}>
                                <span className="inline-block me-3"><img src="/img/truck.svg" alt=""/></span>
                                Delivery
                            </h1>

                            <h1
                                onClick={() => setSelectedTab('Transactions')}
                                className={selectedTab === 'Transactions'
                                ? "px-4 py-4 bg-gray-200"
                                : "px-4 py-4 hover:bg-gray-100"}>
                                <span className="inline-block me-3"><img src="/img/card-checklist.svg" alt=""/></span>
                                Transactions
                            </h1>
                        </div>
                    </div>
                )}
            </div>
            <div className="w-full md:w-3/4">
                {selectedTab === 'Dashboard' && (
                    <Dashboard />
                )}

                {selectedTab === 'Foods' && storeData && foods && (
                    <Foods foods={foods} storeData={storeData} />
                )}

                {selectedTab === 'Orders' && storeData && foods && (
                    <Orders />
                )}

                
            </div>

            {sessionExpired && (
                <SessionExpired />
            )}
        </div>
    );
}

export default Store;