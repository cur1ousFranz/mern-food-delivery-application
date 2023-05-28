import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const SessionExpired = () => {

    const { dispatch } = useContext(AuthContext)
    const navigate = useNavigate();

    const handleClick = () => {
        dispatch({ type: 'LOGOUT' })
        localStorage.removeItem('user')
        navigate('/signin')
    }

    return (
        <>
            <div className="modal-backdrop px-12">
                <div className="modal w-full md:w-1/4">
                    <header className="modal-header text-start">
                        <p className="text-center text-gray-600">Session Expired. <br /> Please signin again.</p>
                    </header>

                    <footer className="modal-footer">
                        <div className="flex justify-center space-x-3">
                            <button
                                onClick={handleClick}
                                className="px-3 py-2 bg-gray-800 hover:bg-gray-900 text-white text-sm"
                                type="button">
                                Ok
                            </button>
                        </div>
                    </footer >
                </div >
            </div>
        </>
    );
}

export default SessionExpired;