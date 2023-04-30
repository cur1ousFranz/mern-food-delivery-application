import { useRef, useState } from "react"
import axiosClient from "../../axios"
import ConfirmationModal from "../modals/ConfirmationModal"
import alert from "../../alert"
import toUpperCaseWord from '../../toUpperCaseWord'

const ProfileStore = ({ store, setStoreData, storeData }) => {

    const [image, setImage] = useState(null)
    const [imageError, setImageError] = useState('')

    const [updateImageModal, setUpdateImageModal] = useState(false)
    const [createCategoryModal, setCreateCategoryModal] = useState(false)
    const [showCategoryForm, setShowCategoryForm] = useState(false)
    const [categoryName, setCategoryName] = useState('')

    const handleImageSubmit = async (e) => {
        e.preventDefault()
        setImageError('')

        if (!image) {
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
                alert('Image update successfully')
                setImage(null)
            }
        } catch (error) {
            setImageError(error.response.data.error)
        }
    }

    const handleCategorySubmit = async (e) => {
        if (!categoryName) {
            return
        }

        try {
            const food_categories = [
                ...storeData.food_categories,
                { category_name: toUpperCaseWord(categoryName) }
            ]

            const response = await axiosClient.put(`/stores/${store.id}`, { food_categories })
            const data = await response.data
            if (response.status === 200) {
                setStoreData(data)
                setCategoryName('')
                setShowCategoryForm(false)
                alert('Category added successfully')
            }

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <div className="border rounded-md px-4 py-2">
                <h1 className="text-lg font-semibold text-gray-700">Food Categories</h1>
                {/* TODO:: Dynamic input for food categories */}
                {storeData && storeData.food_categories && storeData.food_categories.length === 0 && !showCategoryForm && (
                    <div className="mt-3 px-6 py-3 text-center rounded-md text-gray-500 bg-gray-100">
                        <h1>No food categories yet.</h1>
                    </div>
                )}

                <div className="mt-3 max-h-52 overflow-y-auto">
                    {storeData && storeData.food_categories
                        && !showCategoryForm && storeData.food_categories.map(category => (
                            <div
                                key={category._id}
                                className="flex justify-between px-3 py-2 my-3 bg-gray-100">
                                <p>
                                    {category.category_name}
                                </p>
                                <span><img src="/img/trash.svg" alt="" /></span>
                            </div>
                        ))}
                </div>

                {showCategoryForm && (
                    <form onSubmit={e => e.preventDefault()} className="mt-3 p-3 border rounded-md">
                        <h1 className="text-sm font-bold text-gray-700">Create Category</h1>
                        <label className="text-sm">Category name</label>
                        <input
                            onChange={(e) => setCategoryName(e.target.value)}
                            type="text"
                            className="px-2 py-2 w-full bg-gray-100 rounded-md border-gray-400" />
                        <button
                            onClick={() => setCreateCategoryModal(true)}
                            type="button"
                            className="mt-3 text-sm px-3 py-2 rounded-sm bg-gray-700 hover:bg-gray-600 text-white">
                            Submit
                        </button>
                    </form>
                )}

                <div className="mt-3 flex justify-end">
                    <button
                        onClick={() => setShowCategoryForm(!showCategoryForm)}
                        className={showCategoryForm
                            ? "text-sm px-3 py-2 rounded-sm bg-red-600 hover:bg-red-500 text-white"
                            : "text-sm px-3 py-2 rounded-sm bg-gray-700 hover:bg-gray-600 text-white"}>
                        {showCategoryForm ? 'Close Form' : 'Create Category'}
                    </button>
                </div>
                {createCategoryModal && (
                    <ConfirmationModal
                        toggleModal={setCreateCategoryModal}
                        submit={handleCategorySubmit}
                        title={`Create "${categoryName}" as food category?`}
                    />
                )}
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
                        <button
                            onClick={() => setUpdateImageModal(true)}
                            type="button"
                            className="text-sm px-3 py-2 rounded-sm bg-gray-700 hover:bg-gray-600 text-white">
                            Update Image
                        </button>
                    </div>
                </form>
                {updateImageModal && (
                    <ConfirmationModal
                        toggleModal={setUpdateImageModal}
                        submit={handleImageSubmit}
                        title="Proceed to update image?" />
                )}
            </div>
        </div>
    );
}

export default ProfileStore;