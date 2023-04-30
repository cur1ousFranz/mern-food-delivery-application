import { useState } from "react";
import ChoiceOptionDetails from "./ChoiceOptionDetails";
import numbersOnly from "../../../numberkeys";

const ChoiceDetails = ({
    choice, toUpperCaseWord, choices, setChoices, choiceIndex, emptyChoicesIndex, removeChoice }) => {

    const [optionInput, setOptionInput] = useState(false)
    const [currentChoiceIndex, setCurrentChoiceIndex] = useState(null)
    const [optionName, setOptionName] = useState('')
    const [optionPrice, setOptionPrice] = useState('')

    const addOption = (index) => {
        if (optionName && optionPrice) {
            const data = [...choices]
            const options = data[index].options
            data[index] = { ...data[index], options: [...options, { option_name: toUpperCaseWord(optionName), option_price: formatOptionPrice(optionPrice) }] }

            setChoices(data)
            setOptionName('')
            setOptionPrice('')
            setOptionInput(false)
        }
    }

    const removeOption = (choiceIndex, optionIndex) => {
        let data = [...choices]
        const options = data[choiceIndex].options
        const updatedOptions = options.filter((option, index) => index !== optionIndex)
        data[choiceIndex] = { ...data[choiceIndex], options: [...updatedOptions] }

        setChoices(data)
    }

    const toggleOptionInput = (index) => {
        setCurrentChoiceIndex(index)
        setOptionInput(true)
    }

    const toggleChoiceRequired = (choiceIndex, value) => {
        const data = [...choices]
        data[choiceIndex] = { ...data[choiceIndex], required: value }

        setChoices(data)
    }

    const toggleChoiceSelectCount = (choiceIndex, value) => {
        const data = [...choices]
        data[choiceIndex] = { ...data[choiceIndex], select_count: parseInt(value) }
        setChoices(data)
    }

    const formatOptionPrice = (price) => {
        if (price === '0') {
            return price
        }

        return parseInt(price.replace(/^0+/, ''))
    }

    return (
        <div className='my-3'>
            <div
                className={emptyChoicesIndex.includes(choiceIndex)
                    ? 'p-4 rounded-md border border-red-500 bg-gray-100'
                    : 'p-4 rounded-md bg-gray-100'}>
                <button
                    onClick={() => removeChoice(choiceIndex)}
                    type="button"
                    className="float-right text-xs px-1 py-1 bg-gray-700 hover:bg-gray-800 text-white">
                    Remove
                </button>
                {emptyChoicesIndex.includes(choiceIndex) && (
                    <p className="text-xs absolute text-red-500">
                        Choices must have atleast 2 options.
                    </p>
                )}

                <div className="mt-4 flex space-x-6">
                    <h1 className='font-semibold'>{choice.title}</h1>
                    <div
                        className="flex space-x-2">
                        <p>|</p>
                        <input
                            onChange={(e) => toggleChoiceRequired(choiceIndex, e.target.checked)}
                            type="checkbox"
                            checked={choice.required}
                            className="w-4 accent-gray-800" />
                        <p className=" text-gray-700">This choice is required</p>
                    </div>

                    <div>
                        {choice.type === 'checkbox' && (
                            <div className="flex space-x-2">
                                <select
                                    onChange={(e) => toggleChoiceSelectCount(choiceIndex, e.target.value)}
                                    className="w-10 border border-gray-700 accent-gray-800">
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                </select>
                                <p className="text-gray-700">Options to be selected</p>
                            </div>
                        )}
                    </div>

                </div>



                <div className='mt-3'>
                    {choice.options.map((option, optionIndex) => (
                        <ChoiceOptionDetails key={optionIndex}
                            choice={choice}
                            option={option}
                            optionIndex={optionIndex}
                            choiceIndex={choiceIndex}
                            removeOption={removeOption}
                        />
                    ))}
                </div>

                {optionInput && currentChoiceIndex === choiceIndex && (
                    <div className='flex space-x-4'>
                        <div className="w-full space-y-2">
                            <input
                                onChange={(e) => setOptionName(e.target.value)}
                                value={optionName}
                                type="text"
                                className="py-1 px-2 w-full border rounded-sm border-gray-400"
                                placeholder="Option Name" />

                            <input
                                onChange={(e) => setOptionPrice(e.target.value)}
                                value={optionPrice}
                                onKeyDown={numbersOnly}
                                type="text"
                                className="py-1 px-2 w-full border rounded-sm border-gray-400"
                                placeholder="₱rice"
                                maxLength="5" />
                        </div>

                        <div className='flex space-x-2'>
                            <span
                                onClick={() => addOption(choiceIndex)}
                                className='mt-2 cursor-pointer'>
                                <img src="/img/check-square-fill.svg" className='w-6' alt="" />
                            </span>
                            <span
                                onClick={() => setOptionInput(false)}
                                className='mt-2 cursor-pointer'>
                                <img src="/img/x-square-fill.svg" className='w-6' alt="" />
                            </span>
                        </div>
                    </div>
                )}

                <div className='flex justify-end mt-3'>
                    <button
                        type='button'
                        onClick={() => toggleOptionInput(choiceIndex)}
                        className='py-1 px-2 text-white bg-gray-700 hover:bg-gray-800 text-sm'>
                        Add Option
                    </button>
                </div>
            </div>

        </div>
    );
}

export default ChoiceDetails;