const ChoiceOptionDetails = ({
    choice,
    option,
    handleRadioOption,
    handleCheckboxOption,
    selectedCheckboxChoices,
    choiceIndex
}) => {
    const currentChoice = selectedCheckboxChoices.filter(
        (choice, index) => choice.choiceIndex === choiceIndex
    )[0]

    return (
        <div className="my-3">
            <div
                className="flex justify-between space-x-2">
                <p className="">{option.option_name}</p>
                <input
                    onChange={(event) => {
                        if (choice.type === 'radio') {
                            handleRadioOption(
                                choiceIndex,
                                choice.title,
                                option.option_name,
                                choice.select_count
                            )
                        }

                        if (choice.type === 'checkbox') {
                            handleCheckboxOption(
                                choiceIndex,
                                choice.title,
                                option.option_name,
                                event,
                                choice.select_count
                            )
                        }
                    }}
                    disabled={
                        (currentChoice
                            && !currentChoice.selectedOption.includes(option.option_name)
                            && currentChoice.select_count === currentChoice.selectedOption.length)
                            ? true : false
                    }

                    value={option.option_name}
                    type={choice.type}
                    name={choice.title}
                    className="w-4 accent-gray-800" />
            </div>
            <p className="text-xs font-semibold text-gray-600">
                + ₱ {option.option_price.toLocaleString()}
            </p>
            <hr className="mt-3" />
        </div>
    );
}

export default ChoiceOptionDetails;