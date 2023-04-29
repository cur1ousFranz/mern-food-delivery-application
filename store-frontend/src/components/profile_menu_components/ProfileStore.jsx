import { useState } from "react"
import axiosClient from "../../axios"

const ProfileStore = ({ store, setStoreData }) => {
    const [image, setImage] = useState(null)
    const [imageError, setImageError] = useState('')

    const handleImageSubmit = async (e) => {
        e.preventDefault()
        setImageError('')

        if(!image) {
            setImageError('Please upload an image.')
            return
        }
        const formData = new FormData()
        formData.append('image', image)

        try {
            const response = await axiosClient.put(`/stores/${store.id}/image`, formData)
            const data = await response.data
            if (response.status === 200) {
                setStoreData(data)
            }
        } catch (error) {
            setImageError(error.response.data.error)
        }
    }

    return (
        <div>
            <div className="border rounded-md px-4 py-2">
                <h1 className="text-lg font-semibold text-gray-700">Food Categories</h1>
                <form  className="mt-3">
                    {/* TODO:: Dynamic input for food categories */}
                </form>
            </div>

            <div className="mt-10 border rounded-md px-4 py-2">
                <h1 className="text-lg font-semibold text-gray-700">Update Store Image</h1>
                <form onSubmit={handleImageSubmit} className="mt-3">
                    <label className="text-sm">Image file should not exceeds of 10 mb size</label>
                    <input
                        onChange={(e) => setImage(e.target.files[0])}
                        type="file"
                        className="px-2 py-2 w-full bg-gray-100 rounded-md border-gray-400" />
                    {imageError && (
                        <p className="text-sm absolute text-red-500">{imageError}</p>
                    )}
                    <div className="flex justify-end mt-3">
                        <button className="text-sm px-3 py-2 rounded-sm bg-gray-700 text-white">
                            Update
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ProfileStore;