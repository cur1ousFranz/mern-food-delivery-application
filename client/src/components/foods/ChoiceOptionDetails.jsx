const ChoiceOptionDetails = ({ choice, option, handleRadioOption, handleCheckboxOption, index }) => {
    return (
        <div className="my-3">
            <div
                className="flex justify-between space-x-2">
                <p className="">{option.option_name}</p>
                <input
                    onChange={(event) => {
                        if (choice.type === 'radio') {
                            handleRadioOption(index, choice.title, option.option_name)
                        }

                        if (choice.type === 'checkbox') {
                            handleCheckboxOption(index, choice.title, option.option_name, event)
                        }
                    }}
                    value={option.option_name}
                    type={choice.type}
                    name={choice.title} className="w-4 accent-gray-800" />
            </div>
            <p className="text-xs font-semibold text-gray-600">
                + ₱ {option.option_price.toLocaleString()}
            </p>
            <hr className="mt-3" />
        </div>
    );
}

export default ChoiceOptionDetails;