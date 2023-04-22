const ChoiceOptionDetails = ({ option, choiceIndex, optionIndex, removeOption}) => {
    return (
        <div>
            <div className='px-2 py-1 flex justify-between cursor-pointer hover:bg-gray-200'>
                <p>
                    {option.option_name}
                </p>

                <div className='flex space-x-2'>
                    <span>
                        <img src="/pencil-square.svg" alt="" />
                    </span>
                    <span onClick={() => removeOption(choiceIndex, optionIndex)}>
                        <img src="/x-square-fill.svg" alt="" />
                    </span>

                </div>
            </div>
            <hr />
        </div>
    );
}

export default ChoiceOptionDetails;