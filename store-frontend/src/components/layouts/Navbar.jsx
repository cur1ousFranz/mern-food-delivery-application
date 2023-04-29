import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
    const { store, dispatch } = useContext(AuthContext)
    const [profileDropdown, setProfileDropdown] = useState(false)

    const signoutUser = () => {
        dispatch({ type: 'LOGOUT' })
        localStorage.removeItem('store')
    }

    return (
        <nav className="py-4 px-6 border-b flex justify-between">
            <Link to={'/store'} className="text-lg">STORE FRONTEND</Link>
            <div>
                {store && (
                    <div className="relative">
                        <img
                            onClick={() => setProfileDropdown(!profileDropdown)}
                            src="person-circle.svg"
                            className="inline-block w-6 cursor-pointer"
                            alt="" />

                        {profileDropdown && (
                            <div
                                className="origin-top-right absolute right-0 mr-2 mt-1 w-44 z-10 rounded-md shadow-lg">
                                <div className="rounded-md border shadow-xs text-sm bg-white">
                                    <div className="p-2 w-full hover:bg-gray-100">
                                        <Link
                                            onClick={() => setProfileDropdown(false)}
                                            to={'/profile'}
                                            className="w-full text-left px-4">
                                            Profile
                                        </Link>
                                    </div>
                                    <div className="p-2 hover:bg-gray-100">
                                        <button
                                            onClick={signoutUser}
                                            className="w-full text-left px-4">
                                            Sign out
                                        </button>
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