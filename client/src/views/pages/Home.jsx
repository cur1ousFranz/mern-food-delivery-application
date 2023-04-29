import { useContext, useEffect, useState } from "react"
import { StoreContext } from "../../context/StoreContext"
import axiosClient from "../../axios"
import StoreDetails from "../../components/store/StoreDetails"

const Home = () => {
    const { stores, dispatch } = useContext(StoreContext)
    const [businessTypes, setBusinessTypes] = useState([])
    const [storeCategory, setStoreCategory] = useState('')

    useEffect(() => {

        const getAllStores = async () => {

            const response = await axiosClient.get('/stores')
            const data = response.data

            if (response.status === 200) {
                dispatch({ type: 'SET_STORES', payload: data })
            }

        }

        const getAllBusinessTypes = async () => {
            const response = await axiosClient.get('/business-type')
            const data = response.data

            if (response.status === 200) {
                setBusinessTypes(data)
            }
        }

        getAllStores()
        getAllBusinessTypes()

    }, [])

    const getStoresByBusinessType = (businessType) => {
        return stores.filter(store => store.business_type === businessType);
    }

    const handleSmoothScroll = (event, name) => {
        event.preventDefault()
        document.getElementById(name).scrollIntoView({ behavior: "smooth" });

        // handle set current selected category
        setStoreCategory(name)
    }

    return (
        <div className="px-4 md:px-12 py-8" >
            <div className="grid grid-cols-3 gap-x-6">
                <div className="rounded-xl flex bg-lime-200">
                    <div className="w-2/3 p-4 flex flex-col justify-between">
                        <h1 className="text-2xl font-bold text-gray-800">Buy One Get One at Eva's x Cinco de Mayo</h1>
                        <p className="text-sm text-gray-700">Order now</p>
                    </div>
                    <div className="w-1/3">
                        <img src="/img/food1.jpeg" className="h-full rounded-r-xl object-cover" alt="" />
                    </div>
                </div>

                <div className="rounded-xl flex bg-orange-900">
                    <div className="w-2/3 p-4 flex flex-col justify-between">
                        <h1 className="text-2xl font-bold  text-white">
                            ₱0 Delivery Fee + up to 10% off
                        </h1>
                        <p className="text-sm mt-3 w-fit px-2 rounded-full  bg-white ">
                            Try free for 1 month
                        </p>
                    </div>
                    <div className="w-1/3">
                        <img src="/img/food2.jpeg" className="h-full rounded-r-xl object-cover" alt="" />
                    </div>
                </div>

                <div className="rounded-xl flex bg-slate-300">
                    <div className="w-2/3 p-4">
                        <h1 className="text-2xl font-bold text-gray-800">
                            Reusable Containers
                        </h1>
                        <p className="text-sm mt-3 text-gray-500">
                            Reduce packaging waste
                        </p>
                    </div>
                    <div className="w-1/3">
                        <img src="/img/food3.jpeg" className="h-full rounded-r-xl object-cover" alt="" />
                    </div>
                </div>

            </div>

            <div className="mt-14">
                <div className="flex">
                    <div className="hidden md:block  w-1/4 max-h-screen sticky top-0 overflow-y-auto">
                        <h1 className="font-bold text-2xl p-4 uppercase">All Stores</h1>
                        <div className="flex flex-col">
                            {businessTypes && businessTypes.map(type => (
                                <a
                                    href={`#${type.name}`}
                                    onClick={(e) => handleSmoothScroll(e, type.name)}
                                    key={type._id}
                                    className={storeCategory === type.name
                                        ? "text-lg p-4 font-semibold rounded-sm bg-orange-300 text-gray-700"
                                        : "text-lg p-4 font-semibold rounded-sm hover:bg-orange-200 hover:text-gray-700"}>
                                    {type.name}
                                </a>
                            ))}
                        </div>
                    </div>
                    <div className="w-full p-4">
                        {businessTypes && businessTypes.map(type => {
                            const storesByType = getStoresByBusinessType(type.name);

                            return (
                                <div key={type._id}>
                                    <h1 id={type.name} className="font-semibold text-xl uppercase">{type.name}</h1>
                                    <div className="grid grid-cols-2 gap-x-3 py-2 md:grid-cols-3">

                                        {storesByType.length > 0 && storesByType.map((store) => (
                                            <StoreDetails store={store} key={store._id} />
                                        ))}

                                    </div>
                                    {storesByType.length === 0 && (
                                        <div className="text-center shadow-md border bg-gray-200 p-24">
                                            <p className="text-2xl font-bold text-gray-500">No stores at the moment.</p>
                                        </div>
                                    )}
                                </div>
                            )

                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;