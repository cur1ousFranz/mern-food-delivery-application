import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../../axios";
import numbersOnly from "../../numberkeys";
import { AuthContext } from "../../context/AuthContext";

const Signup = () => {
    const [businessTypes, setBusinessTypes] = useState([])
    const { dispatch } = useContext(AuthContext)

    const [storeName, setStoreName] = useState('')
    const [brandName, setBrandName] = useState('')
    const [storeAddress, setStoreAddress] = useState('')
    const [floorSuit, setFloorSuit] = useState('')
    const [businessType, setBusinessType] = useState('')
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const submitForm = async (e) => {
        e.preventDefault()

        if (password !== confirmPassword) {
            return
        }

        const formData = {
            store_name: storeName,
            brand_name: brandName,
            store_address: storeAddress,
            floor_suit: floorSuit,
            business_type: businessType,
            first_name: firstname,
            last_name: lastname,
            contact_number: phoneNumber,
            email: email,
            password: password,
        }

        try {
            const response = await axiosClient.post('/stores', formData)
            const data = await response.data

            if(response.status === 200) {
                dispatch({ type: 'LOGIN', payload: data})
                localStorage.setItem('store', JSON.stringify(data))
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (businessTypes.length) {
            setBusinessType(businessTypes[0].name)

        }
    }, [businessTypes])

    useEffect(() => {

        const getAllBusinessTypes = async () => {
            const response = await axiosClient.get('/business-type')
            const data = response.data

            if (response.status === 200) {
                setBusinessTypes(data)
            }
        }

        getAllBusinessTypes()

    }, [])

    return (
        <div className="px-12 flex justify-end bg-slate-100">
            <form onSubmit={submitForm} className="w-2/5 py-4 px-6 border mt-3 bg-white">
                <h1 className="font-semibold text-2xl">Get Started</h1>
                <div className="py-6 space-y-5">
                    <div>
                        <label>Store Name</label>
                        <input
                            onChange={(e) => setStoreName(e.target.value)}
                            value={storeName}
                            type="text"
                            className="px-2 py-2 w-full bg-gray-100 rounded-md border-gray-400"
                            placeholder="Ex. Sam's Pizza - 123 Main street" />

                    </div>
                    <div>
                        <label>Brand Name</label>
                        <input
                            onChange={(e) => setBrandName(e.target.value)}
                            value={brandName}
                            type="text"
                            className="px-2 py-2 w-full bg-gray-100 rounded-md border-gray-400"
                            placeholder="Ex. Sam's Pizza" />
                        <p className="text-xs">We’ll use this to help organize information that is shared across stores, such as menus.</p>
                    </div>
                    <div>
                        <label>Store Address</label>
                        <input
                            onChange={(e) => setStoreAddress(e.target.value)}
                            value={storeAddress}
                            type="text"
                            className="px-2 py-2 w-full bg-gray-100 rounded-md border-gray-400" />

                    </div>
                    <div>
                        <label>Floor / Suit (Optional)</label>
                        <input
                            onChange={(e) => setFloorSuit(e.target.value)}
                            value={floorSuit}
                            type="text"
                            className="px-2 py-2 w-full bg-gray-100 rounded-md border-gray-400" />

                    </div>
                    <div>
                        <label>Business Type</label>
                        <select
                            onChange={(e) => setBusinessType(e.target.value)}
                            className="px-2 py-2 w-full bg-gray-100 rounded-md border-gray-400">
                            {businessTypes && businessTypes.map(type => (
                                <option value={type.name} key={type._id}>{type.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="flex space-x-4">
                        <div>
                            <label>Firstname</label>
                            <input
                                onChange={(e) => setFirstname(e.target.value)}
                                value={firstname}
                                type="text"
                                className="px-2 py-2 w-full bg-gray-100 rounded-md border-gray-400" />

                        </div>
                        <div>
                            <label>Lastname</label>
                            <input
                                onChange={(e) => setLastname(e.target.value)}
                                value={lastname}
                                type="text"
                                className="px-2 py-2 w-full bg-gray-100 rounded-md border-gray-400" />

                        </div>
                    </div>
                    <div>
                        <label>Email</label>
                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            type="text"
                            className="px-2 py-2 w-full bg-gray-100 rounded-md border-gray-400" />

                    </div>
                    <div>
                        <label>Mobile Phone Number</label>
                        <input
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            onKeyDown={numbersOnly}
                            value={phoneNumber}
                            type="text"
                            className="px-2 py-2 w-full bg-gray-100 rounded-md border-gray-400" />

                    </div>
                    <div className="flex space-x-4">
                        <div>
                            <label>Password</label>
                            <input
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                                type="password"
                                className="px-2 py-2 w-full bg-gray-100 rounded-md border-gray-400" />

                        </div>
                        <div>
                            <label>Confirm Password</label>
                            <input
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                value={confirmPassword}
                                type="password"
                                className="px-2 py-2 w-full bg-gray-100 rounded-md border-gray-400" />

                        </div>
                    </div>
                    <p className="text-xs">
                        By clicking "Submit", you agree to Uber Eats Merchant Terms and Conditions and acknowledge you have read the Privacy Notice.
                    </p>

                    <button className="px-2 py-2 w-full rounded-md text-white bg-gray-700">
                        Submit
                    </button>
                    <hr />
                    <p className="text-sm ">Already have an account? <Link to={'/signin'}
                        className="underline text-blue-500"> Signin </Link>
                    </p>
                </div>
            </form>
        </div>
    );
}

export default Signup;