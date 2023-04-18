import { useNavigate } from "react-router-dom";


const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="p-6 w-full">
            <button className="py-2 px-3 rounded-md bg-gray-200 hover:bg-gray-300" onClick={() => navigate(-1)}>Go back</button>
            <div className="my-12 flex justify-center">
                <span>
                    <img className="w-96" src="/img/404.svg" alt="" />
                </span>
            </div>
        </div>
    );
}

export default NotFound;