import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../../axios";
import { AuthContext } from "../../context/AuthContext";

const Signup = () => {

    const { dispatch } = useContext(AuthContext)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [passwordError, setPasswordError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const submitSignup = async (e) => {
        e.preventDefault()
        setPasswordError(false)
        setErrorMessage('')

        if (password !== confirmPassword) {
            setPasswordError(true)
            return
        }

        try {
            const response = await axiosClient.post('/customers', { email, password })
            const data = await response.data
            if(response.status === 200){
                dispatch({ type: 'LOGIN', payload: data})
                localStorage.setItem('user', JSON.stringify(data))
            }
        } catch (error) {
            setErrorMessage(error.response.data.error)

        }
    }

    return (
        <div className="flex justify-between py-6 px-24">
            <div></div>
            <div className="border shadow-sm rounded-md px-6 py-4 w-96">
                <h1 className="font-semibold text-2xl mb-1">Sign up</h1>
                { errorMessage && (
                    <p className="text-sm absolute text-red-500">{errorMessage}</p>
                )}
                <form onSubmit={submitSignup}>
                    <div className="py-6 space-y-5">
                        <div>
                            <label>Email</label>
                            <input
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                type="text"
                                className="px-2 py-2 w-full bg-gray-100 rounded-md" />
                        </div>
                        <div>
                            <label>Password</label>
                            <input
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                                type="password"
                                className={passwordError
                                    ? "px-2 py-2 w-full bg-gray-100 rounded-md border border-red-500"
                                    : "px-2 py-2 w-full bg-gray-100 rounded-md"} />
                            {passwordError && (
                                <p className="text-sm absolute text-red-500">Password does not match.</p>
                            )}
                        </div>
                        <div>
                            <label>Confirm Password</label>
                            <input
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                value={confirmPassword}
                                type="password"
                                className={passwordError
                                    ? "px-2 py-2 w-full bg-gray-100 rounded-md border border-red-500"
                                    : "px-2 py-2 w-full bg-gray-100 rounded-md"} />
                        </div>
                        <button
                            className="px-2 py-2 w-full rounded-md text-white bg-orange-500">
                            Sign up
                        </button>
                        <hr />
                        <p
                            className="text-sm ">
                            Already have an account? <Link
                                to={'/signin'}
                                className="underline text-blue-500">
                                Signin
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Signup;