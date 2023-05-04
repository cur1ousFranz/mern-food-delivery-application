const ConfirmationModal = ({ toggleModal, submit, title }) => {

    const handleConfirm = () => {
        // Trigger to submit the form
        submit(new Event("submit"));
        toggleModal(false)
    }

    const handleCancel = () => {
        toggleModal(false)
    }

    const handleBackdropCancel = (e) => {
        if (e.target.classList.contains('modal-backdrop')) {
            toggleModal(false)
        }
    }

    return (
        <div onClick={handleBackdropCancel} className="modal-backdrop px-12">
            <div className="modal w-full md:w-1/3">
                <header className="modal-header text-xl text-start">
                    <p className="text-center">{title}</p>
                </header>

                <footer className="modal-footer mt-3">
                    <div className="flex justify-center space-x-3">
                        <button
                            onClick={handleCancel}
                            className="px-3 py-2 border border-gray-900 text-gray-900 text-sm"
                            type="button">
                            Cancel
                        </button>
                        <button
                            onClick={handleConfirm}
                            className="px-3 py-2 bg-gray-800 hover:bg-gray-900 text-white text-sm"
                            type="button">
                            Confirm
                        </button>
                    </div>
                </footer >
            </div >
        </div>
    )
}

export default ConfirmationModal;