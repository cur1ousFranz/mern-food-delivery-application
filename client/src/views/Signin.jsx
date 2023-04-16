import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'
import { AuthContext } from "../context/AuthContext";

const Signin = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { dispatch } = useContext(AuthContext)
    const [error, setError] = useState(null)
    // const history = useNavigate()
    const submitForm = async (e) => {
        e.preventDefault()
        setError(null)
        
        try {
            const response = await axios.post('/api/users/login', {email, password})
            const user = response.data

            if(response.status === 200){
                localStorage.setItem('user', JSON.stringify(user))
                dispatch({ type: 'LOGIN', payload: user})
            }

        } catch (error) {
            if(error.response.data.error) {
                setError(error.response.data.error)
            }
        }
    }

    return (
        <div className="flex justify-between py-6 px-24">
            <div></div>
            <div className="border shadow-sm rounded-md px-6 py-4 w-96">
                <h1 className="font-semibold text-2xl">Sign in</h1>
                <form onSubmit={submitForm}>
                    <div className="py-6 space-y-5">
                        <div>
                            <label>Email</label>
                            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} className="px-2 py-2 w-full border rounded-md border-gray-400" placeholder="Email" />
                            { error && (
                                <p className="text-sm absolute text-red-500">{error}</p>
                            )}
                        </div>
                        <div>
                            <label>Password</label>
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}  className="px-2 py-2 w-full border rounded-md border-gray-400" placeholder="Password" />
                        </div>
                        <div className="flex justify-between">
                            <div className="flex items-center h-5">
                                <input type="checkbox" className="w-4s h-4 bg-gray-100 rounded border-gray-300 focus:ring-orange-500 dark:focus:ring-orange-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 accent-orange-500" />
                                <label className="ml-2 text-sm text-gray-900">
                                    Remember me
                                </label>
                            </div>
                            <p className="text-sm text-blue-500 underline">Forgot pasword?</p>
                        </div>
                        <button className="px-2 py-2 w-full rounded-md text-white bg-orange-500">Sign in</button>
                        <hr />
                        <p className="text-sm ">Don't have an account yet? <Link to={'/signup'} className="underline text-blue-500">Signup</Link></p>

                    </div>
                </form>
            </div>
        </div>
    );
}

export default Signin;