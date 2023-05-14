import { useState } from "react";
import Information from "../../components/profile/Information";
import Credentials from "../../components/profile/Credentials";

const Profile = () => {
    const [currentTab, setCurrentTab] = useState('Personal Information')

    return (
        <div className="px-4 md:px-12 py-6" >
            <h1 className="text-2xl font-semibold">Profile</h1>
            <div className="mt-3 flex space-x-4 p-4 rounded-md">
                <div className="hidden md:block w-1/4 max-h-screen sticky top-0 overflow-y-auto">
                    <h1
                        onClick={() => setCurrentTab('Personal Information')}
                        className={currentTab === 'Personal Information'
                            ? "cursor-pointer p-4 rounded-sm bg-orange-200 text-gray-700"
                            : "cursor-pointer p-4 rounded-sm hover:bg-orange-100 hover:text-gray-700"}>
                        {/* <span className="inline-block mr-2"><img src="/img/key.svg" alt="" /></span> */}
                        Personal Information
                    </h1>
                    <h1
                        onClick={() => setCurrentTab('Credentials')}
                        className={currentTab === 'Credentials'
                            ? "cursor-pointer mt-4 p-4 rounded-sm bg-orange-200 text-gray-700"
                            : "cursor-pointer mt-4 p-4 rounded-sm hover:bg-orange-100 hover:text-gray-700"}>
                        {/* <span className="inline-block mr-2"><img src="/img/shop.svg" alt="" /></span> */}
                        Credentials
                    </h1>
                    <h1
                        onClick={() => setCurrentTab('Payment Details')}
                        className={currentTab === 'Payment Details'
                            ? "cursor-pointer p-4 rounded-sm bg-orange-200 text-gray-700"
                            : "cursor-pointer p-4 rounded-sm hover:bg-orange-100 hover:text-gray-700"}>
                        {/* <span className="inline-block mr-2"><img src="/img/gear-fill.svg" alt="" /></span> */}
                        Payment Details
                    </h1>
                </div>

                <div className="w-full p-4 border-l">

                    {currentTab === 'Personal Information' && (
                       <Information />
                    )}

                    {currentTab === 'Credentials' && (
                       <Credentials />
                    )}

                </div>
            </div>
        </div>
    );
}

export default Profile;