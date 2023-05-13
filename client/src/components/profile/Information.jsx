import { useEffect, useState } from "react"
import axiosClient from "../../axios"
import { useContext } from "react"
import { AuthContext } from "../../context/AuthContext"
import SessionExpired from "../SessionExpired"
import alert from '../../alert'

const Information = () => {

    const { user } = useContext(AuthContext)
    const [name, setName] = useState('')
    const [contactNumber, setContactNumber] = useState('')
    const [address, setAddress] = useState('')
    const [sessionExpired, setSessionExpired] = useState(false)
    const [error, setError] = useState('')
    const [formErrorFields, setFormErrorFields] = useState([])

    useEffect(() => {

        const getCustomerData = async () => {
            try {
                const response = await axiosClient.get(`customers/${user.id}`)
                const data = await response.data

                if (response.status === 200) {
                    setName(data.name)
                    setContactNumber(data.contact_number)
                    setAddress(data.address)
                }
            } catch (error) {
                console.log(error)
            }
        }

        getCustomerData()
    }, [])

    const handleForm = async (e) => {
        e.preventDefault()
        setError('')
        setFormErrorFields([])

        try {
            const response = await axiosClient.put(`/customers/${user.id}`, {
                name,
                contact_number: contactNumber,
                address
            })

            const data = await response.data

            if (response.status === 200) {
                setName(data.name)
                setContactNumber(data.contact_number)
                setAddress(data.address)

                alert('Profile information updated')
            }
        } catch (error) {
            if (error.response.data.error === 'Session Expired') {
                setSessionExpired(true)
                return
            }
            
            if(error.response.data.error === 'Please fill in all fields.')
            setError(error.response.data.error)
            setFormErrorFields(error.response.data.errorFields)
        }
    }

    return (
        <>
            <form onSubmit={handleForm} className="px-12 space-y-4">
                <div>
                    <label>Name</label>
                    <input
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        type="text"
                        className={formErrorFields && formErrorFields.includes('name')
                            ? "px-2 py-2 w-full border border-red-500 bg-gray-100 rounded-md" 
                            : "px-2 py-2 w-full bg-gray-100 rounded-md"} />
                </div>

                <div>
                    <label>Contact Number</label>
                    <input
                        onChange={(e) => setContactNumber(e.target.value)}
                        value={contactNumber}
                        type="text"
                        className={formErrorFields && formErrorFields.includes('contact_number')
                            ? "px-2 py-2 w-full border border-red-500 bg-gray-100 rounded-md" 
                            : "px-2 py-2 w-full bg-gray-100 rounded-md"} />
                </div>

                <div>
                    <label>Address</label>
                    <input
                        onChange={(e) => setAddress(e.target.value)}
                        value={address}
                        type="text"
                        className={formErrorFields && formErrorFields.includes('address')
                            ? "px-2 py-2 w-full border border-red-500 bg-gray-100 rounded-md" 
                            : "px-2 py-2 w-full bg-gray-100 rounded-md"} />
                    {error && (
                        <p className="absolute text-sm text-red-500">{error}</p>
                    )}
                </div>

                <div className="flex justify-end">
                    <button
                        className="px-6 py-2 rounded-md text-white bg-gray-800 hover:bg-gray-600">
                        Save
                    </button>
                </div>
            </form>

            {sessionExpired && (
                <SessionExpired />
            )}
        </>
    );
}

export default Information;