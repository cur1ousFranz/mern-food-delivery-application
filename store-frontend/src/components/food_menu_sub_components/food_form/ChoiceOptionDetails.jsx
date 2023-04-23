const ChoiceOptionDetails = ({ choice, option, choiceIndex, optionIndex, removeOption }) => {
    return (
        <div>
            <div className='px-2 py-1 flex justify-between cursor-pointer hover:bg-gray-200'>
                <div className="flex space-x-4 px-4">
                    <div className="flex space-x-2">
                        <input 
                        type={choice.type} 
                        name={choice.title} />
                        
                        <p>{option.option_name}</p>
                    </div>
                    <p className="text-sm">₱ {option.option_price.toLocaleString()}</p>
                </div>
                <span onClick={() => removeOption(choiceIndex, optionIndex)}>
                    <img src="/x-square-fill.svg" alt="" />
                </span>
            </div>
            <hr />
        </div>
    );
}

export default ChoiceOptionDetails;