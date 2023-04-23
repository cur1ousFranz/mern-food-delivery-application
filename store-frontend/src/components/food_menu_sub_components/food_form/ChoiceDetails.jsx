import { useState } from "react";
import ChoiceOptionDetails from "./ChoiceOptionDetails";
import numbersOnly from "../../../numberkeys";

const ChoiceDetails = ({
    choice, toUpperCaseWords, choices, setChoices, choiceIndex, emptyChoicesIndex, removeChoice }) => {

    const [optionInput, setOptionInput] = useState(false)
    const [currentChoiceIndex, setCurrentChoiceIndex] = useState(null)
    const [optionName, setOptionName] = useState('')
    const [optionPrice, setOptionPrice] = useState('')

    const addOption = (index) => {
        if (optionName && optionPrice) {
            const data = [...choices]
            const options = data[index].options
            data[index] = { ...data[index], options: [...options, { option_name: toUpperCaseWords(optionName), option_price: formatOptionPrice(optionPrice) }] }

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

    const formatOptionPrice = (price) => {
        if (price === '0') {
            return price
        }

        return parseInt(price.replace(/^0+/, ''))
    }

    return (
        <div className='my-3'>
            <div className={emptyChoicesIndex.includes(choiceIndex) ? 'p-4 rounded-md border border-red-500 bg-gray-100' : 'p-4 rounded-md bg-gray-100'}>
                <button
                    onClick={() => removeChoice(choiceIndex)}
                    type="button"
                    className="float-right text-xs px-1 py-1 bg-gray-700 hover:bg-gray-800 text-white">
                    Remove
                </button>
                {emptyChoicesIndex.includes(choiceIndex) && (
                    <p className="text-xs absolute text-red-500">Choices must have atleast 2 options.</p>
                )}

                <h1 className='font-semibold mt-4'>{choice.title}</h1>

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
                                <img src="/check-square-fill.svg" className='w-6' alt="" />
                            </span>
                            <span
                                onClick={() => setOptionInput(false)}
                                className='mt-2 cursor-pointer'>
                                <img src="/x-square-fill.svg" className='w-6' alt="" />
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