import axios from "axios";
import { useContext, useEffect, useState } from "react";
import StoreDetails from "../../components/store/StoreDetails";
import { StoreContext } from "../../context/StoreContext";

const Stores = () => {
    const { stores, dispatch } = useContext(StoreContext)
    const [businessTypes, setBusinessTypes] = useState([])

    useEffect(() => {

        const getAllStores = async () => {

            const response = await axios.get('/api/stores')
            const data = response.data

            if (response.status === 200) {
                dispatch({ type: 'SET_STORES', payload: data })
            }

        }

        const getAllBusinessTypes = async () => {
            const response = await axios.get('/api/business-type')
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

    return (
        <div>
            {businessTypes && businessTypes.map(type => {
                const storesByType = getStoresByBusinessType(type.name);

                return (
                    <div className="px-6 md:px-24 py-8" key={type._id}>
                        <h1 className="font-semibold text-lg md:text-2xl">{type.name}</h1>
                        <div className="grid grid-cols-2 gap-4 py-8 md:grid-cols-4">

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
    );
}

export default Stores;