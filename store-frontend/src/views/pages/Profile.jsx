import { useContext, useEffect, useState } from "react";
import axiosClient from '../../axios'
import { AuthContext } from "../../context/AuthContext";
import ProfileStore from "../../components/profile_menu_components/ProfileStore";

const Profile = () => {
    const { store } = useContext(AuthContext)
    const [storeData, setStoreData] = useState([])
    const [currentTab, setCurrentTab] = useState('Store')

    useEffect(() => {
        const getStoreDetails = async () => {
            try {
                const response = await axiosClient.get(`/stores/${store.id}`)
                const data = await response.data

                if (response.status === 200) {
                    setStoreData(data)
                }
            } catch (error) {
                console.log(error)
            }
        }

        getStoreDetails()

    }, [])

    return (
        <div className="px-4 md:px-12 py-6" >
            <h1 className="text-2xl font-semibold">Profile</h1>
            <div className="mt-3 flex space-x-4 p-4 rounded-md">
                <div className="hidden md:block w-1/4 max-h-screen sticky top-0 overflow-y-auto">
                    <div className="flex justify-center border-b py-3">
                        <img
                            src={storeData.image 
                                ? `http://localhost:4000/${storeData.image}` 
                                : "/img/store.png"}
                            className="object-cover w-72"
                            alt="" />
                    </div>
                    <h1
                        onClick={() => setCurrentTab('Store')}
                        className={currentTab === 'Store'
                            ? "cursor-pointer mt-4 p-4 rounded-sm bg-orange-200 text-gray-700"
                            : "cursor-pointer mt-4 p-4 rounded-sm hover:bg-orange-100 hover:text-gray-700"}>
                        <span className="inline-block mr-2"><img src="/img/shop.svg" alt="" /></span>
                        Store
                    </h1>
                    <h1
                        onClick={() => setCurrentTab('Credentials')}
                        className={currentTab === 'Credentials'
                            ? "cursor-pointer p-4 rounded-sm bg-orange-200 text-gray-700"
                            : "cursor-pointer p-4 rounded-sm hover:bg-orange-100 hover:text-gray-700"}>
                        <span className="inline-block mr-2"><img src="/img/key.svg" alt="" /></span>
                        Credentials
                    </h1>
                    <h1
                        onClick={() => setCurrentTab('Settings')}
                        className={currentTab === 'Settings'
                            ? "cursor-pointer p-4 rounded-sm bg-orange-200 text-gray-700"
                            : "cursor-pointer p-4 rounded-sm hover:bg-orange-100 hover:text-gray-700"}>
                        <span className="inline-block mr-2"><img src="/img/gear-fill.svg" alt="" /></span>
                        Settings
                    </h1>
                    <h1
                        onClick={() => setCurrentTab('Staffs')}
                        className={currentTab === 'Staffs'
                            ? "cursor-pointer p-4 rounded-sm bg-orange-200 text-gray-700"
                            : "cursor-pointer p-4 rounded-sm hover:bg-orange-100 hover:text-gray-700"}>
                        <span className="inline-block mr-2"><img src="/img/people.svg" alt="" /></span>
                        Staffs
                    </h1>
                </div>

                <div className="w-2/3">
                    {currentTab === 'Store' && (
                        <ProfileStore
                            store={store}
                            setStoreData={setStoreData}
                            storeData={storeData} />
                    )}

                </div>
            </div>
        </div>
    );
}

export default Profile;