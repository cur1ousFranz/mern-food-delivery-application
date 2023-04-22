import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
    const { store } = useContext(AuthContext)
    const [profileDropdown, setProfileDropdown] = useState(false)
    
    const signoutUser = () => {

    }

    return (
        <nav className="py-4 px-6 border-b flex justify-between">
            <h1 className="text-lg">STORE FRONTEND</h1>
            <div>
                {store && (
                    <div className="relative">
                        <img onClick={() => setProfileDropdown(!profileDropdown)} src="person-circle.svg" className="inline-block w-6 cursor-pointer" alt="" />

                        {profileDropdown && (
                            <div className="origin-top-right absolute right-0 mr-4 mt-2 w-44 z-10 rounded-md shadow-lg">
                                <div className="rounded-md border shadow-xs text-sm bg-white">
                                    <div className="p-2 hover:bg-gray-100">
                                        <button onClick={signoutUser} className="w-full text-left px-4">Profile</button>
                                    </div>
                                    <div className="p-2 hover:bg-gray-100">
                                        <button onClick={signoutUser} className="w-full text-left px-4">Sign out</button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {!store && (
                    <Link to={'/signin'} className="">Signin</Link>
                )}
            </div>
        </nav>
    );
}

export default Navbar;