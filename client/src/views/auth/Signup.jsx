import { Link } from "react-router-dom";

const Signup = () => {
    return (
        <div className="flex justify-between py-6 px-24">
            <div></div>
            <div className="border shadow-sm rounded-md px-6 py-4 w-96">
                <h1 className="font-semibold text-2xl">Sign up</h1>
                <form action="" className="">
                    <div className="py-6 space-y-5">
                        <div>
                            <label>Email</label>
                            <input type="text" className="px-2 py-2 w-full border rounded-md border-gray-400" placeholder="Email" />
                        </div>
                        <div>
                            <label>Password</label>
                            <input type="text" className="px-2 py-2 w-full border rounded-md border-gray-400" placeholder="Password" />
                        </div>
                        <div>
                            <label>Confirm Password</label>
                            <input type="text" className="px-2 py-2 w-full border rounded-md border-gray-400" placeholder="Confirm Password" />
                        </div>
                        <button className="px-2 py-2 w-full rounded-md text-white bg-orange-500">Sign up</button>
                        <hr />
                        <p className="text-sm ">Already have an account? <Link to={'/signin'} className="underline text-blue-500">Signin</Link></p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Signup;