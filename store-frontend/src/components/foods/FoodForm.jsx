import { useState } from 'react';
import numbersOnly from '../../numberkeys'
import ChoiceDetails from './food_form/ChoiceDetails';
import ChoiceButton from './food_form/ChoiceButton';

const FoodForm = ({ categories }) => {
    const [hasChoices, setHasChoices] = useState(false)
    const [choices, setChoices] = useState([])
    const [selectedChoice, setSelectedChoice] = useState(null)
    const [showChoiceInput, setShowChoiceInput] = useState(false)
    const [choiceTitle, setChoiceTitle] = useState('')

    const addChoice = () => {
        if (choiceTitle) {
            const newObject = { title: toUpperCaseWords(choiceTitle), type: selectedChoice, options: [] }
            setChoices([...choices, newObject])
            setChoiceTitle('')
            setShowChoiceInput(false)
            setSelectedChoice(null)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(choices);
    }

    const toUpperCaseWords = (name) => {
        let words = name.split(" ");
        for (let i = 0; i < words.length; i++) {
            words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1).toLowerCase();
        }
        let result = words.join(" ");
        return result
    }

    return (
        <div className="flex justify-center">
            <form onSubmit={handleSubmit} className="w-full p-4 border rounded-md mt-6">
                <h1 className="font-semibold text-2xl">Create Food</h1>
                <div className="py-6 space-y-5">
                    <div>
                        <label>Food Name</label>
                        <input type="text" className="px-2 py-2 w-full border rounded-sm border-gray-400" placeholder="Food Name" />
                    </div>
                    <div>
                        <label>Description</label>
                        <input type="text" className="px-2 py-2 w-full border rounded-sm border-gray-400" placeholder="Description" />
                    </div>
                    <div>
                        <label>Category</label>
                        <select className="px-2 py-2 w-full border rounded-sm border-gray-400">
                            {categories.map(category => (
                                <option key={category._id} value={category.category_name}>{category.category_name}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label>Price</label>
                        <input onKeyDown={numbersOnly} type="text" className="px-2 py-2 w-full border rounded-sm border-gray-400" placeholder="Price" maxLength={6} />
                    </div>
                    <div className='space-x-2'>
                        <input onChange={() => setHasChoices(!hasChoices)} type="checkbox" checked={hasChoices} />
                        <label>Choices (Does food has multiple choices?)</label>
                    </div>

                    {hasChoices && (
                        <div>
                            {choices.map((choice, choiceIndex) => {
                                return (
                                    <ChoiceDetails
                                        choice={choice}
                                        choices={choices}
                                        setChoices={setChoices}
                                        choiceIndex={choiceIndex}
                                        key={choiceIndex}
                                        toUpperCaseWords={toUpperCaseWords} />
                                )

                            })}

                            {showChoiceInput && (
                                <div className='flex space-x-4'>
                                    <input onChange={(e) => setChoiceTitle(e.target.value)} value={choiceTitle} type="text" className="py-1 px-2 w-full border rounded-sm border-gray-400" placeholder="Choice Title" />

                                    <div className='flex space-x-2'>
                                        <span onClick={addChoice} className='mt-2 cursor-pointer'>
                                            <img src="/check-square-fill.svg" className='w-6' alt="" />
                                        </span>
                                        <span onClick={() => setShowChoiceInput(false)} className='mt-2 cursor-pointer'>
                                            <img src="/x-square-fill.svg" className='w-6' alt="" />
                                        </span>
                                    </div>
                                </div>
                            )}

                            {/* TODO:: UPDATE OPTION OR SUBMIT FORM*/}

                            <div className='flex justify-end space-x-2 mt-4 '>
                                <ChoiceButton title={'Radio Button'} toggle={setShowChoiceInput} setSelectedChoice={setSelectedChoice} type={'radio'} />
                                <ChoiceButton title={'Select Box'} toggle={setShowChoiceInput} setSelectedChoice={setSelectedChoice} type={'select'} />
                            </div>
                        </div>
                    )}

                    <button className="w-full px-2 py-2 rounded-sm text-white bg-gray-700 hover:bg-gray-800">
                        Create Food
                    </button>
                </div>
            </form>
        </div>
    );
}

export default FoodForm;