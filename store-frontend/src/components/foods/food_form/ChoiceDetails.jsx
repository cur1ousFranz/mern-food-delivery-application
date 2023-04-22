import { useState } from "react";
import ChoiceOptionDetails from "./ChoiceOptionDetails";

const ChoiceDetails = ({ choice, toUpperCaseWords, choices, setChoices, choiceIndex }) => {
    const [optionInput, setOptionInput] = useState(false)
    const [currentChoiceIndex, setCurrentChoiceIndex] = useState(null)
    const [optionName, setOptionName] = useState('')

    const addOption = (index) => {
        if (optionName) {
            const data = [...choices]
            const options = data[index].options
            data[index] = { ...data[index], options: [...options, { option_name: toUpperCaseWords(optionName) }] }

            setChoices(data)
            setOptionName('')
            setOptionInput(false)
        }
    }

    const removeOption = (choiceIndex, optionIndex) => {
        let data = [...choices]
        const options = data[choiceIndex].options
        if (options.length > 2) {
            const updatedOptions = options.filter((option, index) => index !== optionIndex)
            data[choiceIndex] = { ...data[choiceIndex], options: [...updatedOptions] }

            setChoices(data)
        } else {
            console.log('qwdkugqwdiughkqkdw')
        }

    }

    const toggleOptionInput = (index) => {
        setCurrentChoiceIndex(index)
        setOptionInput(true)
    }

    return (
        <div className='my-3'>
            <div className='p-4 rounded-md bg-gray-100'>
                <h1 className='font-semibold'>Type</h1>
                <p className='px-2'>{toUpperCaseWords(choice.type)}</p>
                <h1 className='font-semibold mt-3'>Choice Title</h1>
                <p className='px-2'>{choice.title}</p>

                <div className='mt-3'>
                    <h1 className='font-semibold mb-1'>Options</h1>
                    {choice.options.map((option, optionIndex) => (
                        <ChoiceOptionDetails
                            option={option}
                            optionIndex={optionIndex}
                            choiceIndex={choiceIndex}
                            removeOption={removeOption}
                        />
                    ))}
                </div>

                {optionInput && currentChoiceIndex === choiceIndex && (
                    <div className='flex space-x-4'>
                        <input onChange={(e) => setOptionName(e.target.value)} value={optionName} type="text" className="py-1 px-2 w-full border rounded-sm border-gray-400" placeholder="Option Name" />

                        <div className='flex space-x-2'>
                            <span onClick={() => addOption(choiceIndex)} className='mt-2 cursor-pointer'>
                                <img src="/check-square-fill.svg" className='w-6' alt="" />
                            </span>
                            <span onClick={() => setOptionInput(false)} className='mt-2 cursor-pointer'>
                                <img src="/x-square-fill.svg" className='w-6' alt="" />
                            </span>
                        </div>
                    </div>
                )}

                <div className='flex justify-end mt-3'>
                    <button type='button' onClick={() => toggleOptionInput(choiceIndex)} className='py-1 px-2 text-white bg-gray-700 hover:bg-gray-800 text-sm'>Add Option</button>
                </div>
            </div>

        </div>
    );
}

export default ChoiceDetails;