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
                <div className="hidden md:block w-1/4 border-r max-h-screen sticky top-0 overflow-y-auto">
                    <h1
                        onClick={() => setCurrentTab('Store')}
                        className={currentTab === 'Store'
                            ? "cursor-pointer p-4 rounded-sm bg-orange-200 text-gray-700"
                            : "cursor-pointer p-4 rounded-sm hover:bg-orange-100 hover:text-gray-700"}>
                        <span className="inline-block mr-2"><img src="/shop.svg" alt="" /></span>
                        Store
                    </h1>
                    <h1
                        onClick={() => setCurrentTab('Credentials')}
                        className={currentTab === 'Credentials'
                            ? "cursor-pointer p-4 rounded-sm bg-orange-200 text-gray-700"
                            : "cursor-pointer p-4 rounded-sm hover:bg-orange-100 hover:text-gray-700"}>
                        <span className="inline-block mr-2"><img src="/key.svg" alt="" /></span>
                        Credentials
                    </h1>
                    <h1
                        onClick={() => setCurrentTab('Settings')}
                        className={currentTab === 'Settings'
                            ? "cursor-pointer p-4 rounded-sm bg-orange-200 text-gray-700"
                            : "cursor-pointer p-4 rounded-sm hover:bg-orange-100 hover:text-gray-700"}>
                        <span className="inline-block mr-2"><img src="/gear-fill.svg" alt="" /></span>
                        Settings
                    </h1>
                    <h1
                        onClick={() => setCurrentTab('Staffs')}
                        className={currentTab === 'Staffs'
                            ? "cursor-pointer p-4 rounded-sm bg-orange-200 text-gray-700"
                            : "cursor-pointer p-4 rounded-sm hover:bg-orange-100 hover:text-gray-700"}>
                        <span className="inline-block mr-2"><img src="/people.svg" alt="" /></span>
                        Staffs
                    </h1>
                </div>

                <div className="w-2/3">
                    {currentTab === 'Store' && (
                        <ProfileStore store={store} setStoreData={setStoreData} />
                    )}

                </div>
            </div>
        </div>
    );
}

export default Profile;