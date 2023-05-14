import { useContext, useState } from "react";
import SessionExpired from "../SessionExpired";
import axiosClient from "../../axios";
import { AuthContext } from "../../context/AuthContext";
import alert from "../../alert";
import ConfirmationModal from "../modals/ConfirmationModal";

const Credentials = () => {

    const { user } = useContext(AuthContext)

    const [sessionExpired, setSessionExpired] = useState(false)
    const [newPassword, setNewPassword] = useState('')
    const [newConfirmPassword, setNewConfirmPassword] = useState('')
    const [formErrorFields, setFormErrorFields] = useState([])
    const [error, setError] = useState('')
    const [showModal, setShowModal] = useState(false)

    const handleForm = async (e) => {
        e.preventDefault()
        setFormErrorFields([])
        setError('')

        if (!newPassword) {
            setFormErrorFields([...formErrorFields, 'newPassword'])
            setError('Please fill in all fields')
            return
        }

        if (!newConfirmPassword) {
            setFormErrorFields([...formErrorFields, 'newConfirmPassword'])
            setError('Please fill in all fields')
            return
        }

        if (newPassword !== newConfirmPassword) {
            setFormErrorFields([...formErrorFields, 'newPassword'])
            setError('Password does not match!')
            return
        }

        try {
            const response = await axiosClient.put(`/users/customer/${user.id}/password`, {
                password: newPassword
            })
            const data = await response.data

            if (response.status === 200) {
                alert(data.data)
                setNewPassword('')
                setNewConfirmPassword('')
            }

        } catch (error) {
            if (error.response.data.error === 'Session Expired') {
                setSessionExpired(true)
                return
            }
        }

    }

    return (
        <>
            <form onSubmit={handleForm} className="px-12 space-y-4">
                <h1 className="text-xs text-gray-800">
                    For your account's security, do not share your password with anyone else
                </h1>
                <div>
                    <label className="text-gray-800">New Password</label>
                    <input
                        onChange={(e) => setNewPassword(e.target.value)}
                        value={newPassword}
                        type="password"
                        placeholder="***********"
                        className={formErrorFields && formErrorFields.includes('newPassword')
                            ? "px-2 py-2 w-full border border-red-500 bg-gray-100 rounded-md"
                            : "px-2 py-2 w-full bg-gray-100 rounded-md"} />
                </div>

                <div>
                    <label className="text-gray-800">Confirm New Password</label>
                    <input
                        onChange={(e) => setNewConfirmPassword(e.target.value)}
                        value={newConfirmPassword}
                        type="password"
                        placeholder="***********"
                        className={formErrorFields && formErrorFields.includes('newConfirmPassword')
                            ? "px-2 py-2 w-full border border-red-500 bg-gray-100 rounded-md"
                            : "px-2 py-2 w-full bg-gray-100 rounded-md"} />

                    {error && (
                        <p className="absolute text-sm text-red-500">{error}</p>
                    )}
                </div>

                <div className="flex justify-end">
                    <button
                        type="button"
                        onClick={() => setShowModal(true)}
                        className="px-6 py-2 rounded-md text-white bg-gray-800 hover:bg-gray-600">
                        Update
                    </button>
                </div>
            </form>

            {showModal && (
                <ConfirmationModal
                    toggleModal={setShowModal}
                    submit={handleForm}
                    title={"Proceed to update password?"}
                />
            )}

            {sessionExpired && (
                <SessionExpired />
            )}
        </>
    );
}

export default Credentials;