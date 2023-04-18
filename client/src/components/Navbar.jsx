import { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
    const { user } = useContext(AuthContext)
    const [profileDropdown, setprofileDropdown] = useState(false)
    const { dispatch } = useContext(AuthContext)

    const signoutUser = () => {
        dispatch({ type: 'LOGOUT' })
        localStorage.removeItem('user')
        setprofileDropdown(false)
    }

    return (
        <div className="py-6 px-6 border-b flex justify-between">
            <Link to={'/'} className="font-semibold text-xl">
                <img src="/kaon.svg" className="w-20 md:w-24 absolute -mt-2" alt="" />
            </Link>
            <div className="hidden md:flex space-x-8 mt-1 font-semibold">
                <NavLink to={'/'} className="hover:underline hover:text-orange-500">Home</NavLink>
                <NavLink to={'/stores'} className="hover:underline hover:text-orange-500">Stores</NavLink>
                <h1 className="hover:underline hover:text-orange-500">About</h1>
                <h1 className="hover:underline hover:text-orange-500">Services</h1>
                <h1 className="hover:underline hover:text-orange-500">Delivery</h1>
            </div>
            <div className="space-x-4 flex">
                <img src="/cart4.svg" className="inline-block w-6" alt="" />
                {user && (
                    <div>
                        <img onClick={() => setprofileDropdown(!profileDropdown)} src="person-circle.svg" className="inline-block w-6 cursor-pointer" alt="" />

                        {profileDropdown && (
                            <div className="origin-top-right absolute right-0 mr-4 mt-2 w-44 z-10 rounded-md shadow-lg">
                                <div className="rounded-md border shadow-xs text-start px-2 bg-white">
                                    <div className="p-2">
                                        <button onClick={signoutUser} className="w-full">Sign out</button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}
                {!user && (
                    <Link to={'/signin'} className="hidden md:block font-semibold mt-1 text-md text-orange-500">Sign in</Link>
                )}
            </div>
        </div>
    );
}

export default Navbar;