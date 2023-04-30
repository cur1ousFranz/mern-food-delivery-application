import { useContext, useState } from 'react';
import numbersOnly from '../../numberkeys'
import ChoiceDetails from './food_form/ChoiceDetails';
import ChoiceButton from './food_form/ChoiceButton';
import axiosClient from '../../axios';
import alert from '../../alert';
import toUpperCaseWord from '../../toUpperCaseWord'
import { FoodContext } from '../../context/FoodContext';
import { Link } from 'react-router-dom';

const FoodForm = ({ categories, setOpenFoodForm }) => {
    const { dispatch } = useContext(FoodContext)

    const [selectedChoice, setSelectedChoice] = useState(null)
    const [showChoiceInput, setShowChoiceInput] = useState(false)
    const [choiceTitle, setChoiceTitle] = useState('')
    const [formError, setFormError] = useState('')
    const [formErrorFields, setFormErrorFields] = useState([])

    const [emptyChoicesIndex, setEmptyChoicesIndex] = useState([])

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [category, setCategory] = useState(categories.length ? categories[0].category_name : '')
    const [price, setPrice] = useState('')
    const [hasInstructions, setHasInstructions] = useState(false)
    const [hasChoices, setHasChoices] = useState(false)
    const [choices, setChoices] = useState([])
    const [image, setImage] = useState(null)

    const submitForm = async (e) => {
        e.preventDefault()
        setEmptyChoicesIndex([])
        setFormError('')
        setFormErrorFields([])

        if (hasChoices) {
            const indexes = []
            choices.forEach((choice, choiceIndex) => {
                if (choice.options.length < 2) {
                    indexes.push(choiceIndex)
                }
            })

            setEmptyChoicesIndex([...indexes])

            if (indexes.length) {
                return
            }
        }

        const foodData = {
            name: toUpperCaseWord(name),
            description,
            category,
            price,
            has_instructions: hasInstructions,
            has_choices: choices.length !== 0 ? true : false,
            food_choices: hasChoices ? choices : [],
            image: image
        }

        try {
            const response = await axiosClient.post('/foods', foodData, {
                headers: {
                    'Content-Type' : 'multipart/form-data'
                }
            })
            const data = await response.data
            if (response.status === 200) {
                dispatch({ type: 'ADD_FOOD', payload: data })
                alert('Food added successfully!')
                setOpenFoodForm(false)
            }
        } catch (error) {
            setFormError(error.response.data.error)
            setFormErrorFields(error.response.data.errorFields)
        }

    }

    const addChoice = () => {
        if (choiceTitle) {
            const newObject = {
                title: toUpperCaseWord(choiceTitle),
                type: selectedChoice,
                required: true,
                select_count: 1,
                options: []
            }

            setChoices([...choices, newObject])
            setChoiceTitle('')
            setShowChoiceInput(false)
            setSelectedChoice(null)
        }
    }

    const removeChoice = (choiceIndex) => {
        const data = choices.filter((choice, index) => index !== choiceIndex)
        setChoices([...data])
    }

    return (
        <div className="flex justify-center">
            <form onSubmit={submitForm} className="w-full p-4 border rounded-md mt-6">
                <h1 className="font-semibold text-2xl">Create Food</h1>
                {formError && (
                    <p className='absolute text-sm text-red-500'>*{formError}</p>
                )}

                <div className="py-6 space-y-5">
                    <div>
                        <label>Food Name</label>
                        <input
                            onChange={(e) => setName(e.target.value)}
                            type="text"
                            className={formErrorFields.includes('name') ? "px-2 py-2 w-full border rounded-sm border-red-500" : "px-2 py-2 w-full border rounded-sm border-gray-400"}
                            placeholder="Food Name" />
                    </div>
                    <div>
                        <label>Description</label>
                        <input
                            onChange={(e) => setDescription(e.target.value)}
                            type="text"
                            className={formErrorFields.includes('description') ? "px-2 py-2 w-full border rounded-sm border-red-500" : "px-2 py-2 w-full border rounded-sm border-gray-400"}
                            placeholder="Description" />
                    </div>
                    <div>
                        <label>Category
                            <Link to={'/profile'} className='text-sm text-blue-700'> (Add food categories)</Link>
                        </label>
                        <select
                            onChange={(e) => setCategory(e.target.value)}
                            className={formErrorFields.includes('category') ? "px-2 py-2 w-full border rounded-sm border-red-500" : "px-2 py-2 w-full border rounded-sm border-gray-400"}>
                            {categories.map(category => (
                                <option
                                    key={category._id}
                                    value={category.category_name}>
                                    {category.category_name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label>Price</label>
                        <input
                            onChange={(e) => setPrice(e.target.value)}
                            onKeyDown={numbersOnly}
                            type="text"
                            className={formErrorFields.includes('price') ? "px-2 py-2 w-full border rounded-sm border-red-500" : "px-2 py-2 w-full border rounded-sm border-gray-400"}
                            placeholder="Price"
                            maxLength={6} />
                    </div>

                    <div>
                        <label className="text-sm">Image file should not exceeds of 10 mb size</label>
                        <input
                            onChange={(e) => setImage(e.target.files[0])}
                            type="file"
                            className="px-2 py-2 w-full bg-gray-100 rounded-md border-gray-400" />
                        {/* {imageError && (
                            <p className="text-sm absolute text-red-500">{imageError}</p>
                        )} */}
                    </div>

                    <div className='space-x-2'>
                        <input
                            onChange={() => setHasInstructions(!hasInstructions)}
                            type="checkbox"
                            checked={hasInstructions} />
                        <label>Instructions (Does customer can provide instructions?)</label>
                    </div>

                    <div className='space-x-2'>
                        <input
                            onChange={() => setHasChoices(!hasChoices)}
                            type="checkbox"
                            checked={hasChoices} />
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
                                        emptyChoicesIndex={emptyChoicesIndex}
                                        removeChoice={removeChoice}
                                        key={choiceIndex}
                                        toUpperCaseWord={toUpperCaseWord} />
                                )

                            })}

                            {showChoiceInput && (
                                <div className='flex space-x-4'>
                                    <input
                                        onChange={(e) => setChoiceTitle(e.target.value)}
                                        value={choiceTitle}
                                        type="text"
                                        className="py-1 px-2 w-full border rounded-sm border-gray-400" placeholder="Choice Title" />

                                    <div className='flex space-x-2'>
                                        <span onClick={addChoice} className='mt-2 cursor-pointer'>
                                            <img
                                                src="/img/check-square-fill.svg"
                                                className='w-6'
                                                alt='' />
                                        </span>
                                        <span onClick={() => setShowChoiceInput(false)} className='mt-2 cursor-pointer'>
                                            <img
                                                src="/img/x-square-fill.svg"
                                                className='w-6'
                                                alt='' />
                                        </span>
                                    </div>
                                </div>
                            )}

                            <div className='flex justify-end space-x-2 mt-4 '>
                                <ChoiceButton
                                    title={'Radio Button'}
                                    toggle={setShowChoiceInput}
                                    setSelectedChoice={setSelectedChoice}
                                    type={'radio'} />
                                <ChoiceButton
                                    title={'Check Box'}
                                    toggle={setShowChoiceInput}
                                    setSelectedChoice={setSelectedChoice}
                                    type={'checkbox'} />
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