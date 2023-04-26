import { useContext, useState } from "react";
import { BasketContext } from "../../context/BasketContext";
import { v4 as uuidv4 } from 'uuid'
import ChoiceOptionDetails from "./ChoiceOptionDetails";

const ShowFood = ({ selectFood, selectedFood }) => {
    // TODO:: Dynamic update for prices (show food, basket)

    const { dispatch } = useContext(BasketContext)
    const [foodQuantity, setFoodQuantity] = useState(1)
    const [addToBasketLoading, setAddToBasketLoading] = useState(false)

    const [selectedRadioChoices, setSelectedRadioChoices] = useState([]);
    const [selectedCheckboxChoices, setSelectedCheckboxChoices] = useState([]);
    const [instruction, setInstruction] = useState('')
    const [choiceError, setChoiceError] = useState([])

    const handleRadioOption = (choiceIndex, choiceTitle, optionName, select_count) => {
        const updatedRadioChoices = [...selectedRadioChoices]
        const existingRadioChoice = updatedRadioChoices.find(
            (choice) => choice.choiceIndex === choiceIndex
        )

        if (existingRadioChoice) {
            existingRadioChoice.selectedOption = [optionName];
        } else {
            updatedRadioChoices.push({
                choiceIndex,
                choiceTitle,
                selectedOption: [optionName],
                select_count
            });
        }

        setSelectedRadioChoices(updatedRadioChoices)
    }

    const handleCheckboxOption = (choiceIndex, choiceTitle, optionName, event, select_count) => {
        const updatedCheckboxChoices = [...selectedCheckboxChoices]
        const existingCheckboxChoice = updatedCheckboxChoices.find(
            (choice) => choice.choiceIndex === choiceIndex
        )
      
        if (event.target.checked) {
            existingCheckboxChoice
                ? existingCheckboxChoice.selectedOption.push(optionName)
                : updatedCheckboxChoices.push({
                    choiceIndex,
                    choiceTitle,
                    selectedOption: [optionName],
                    select_count
                })
      
        } else {
            existingCheckboxChoice.selectedOption = [...existingCheckboxChoice.selectedOption.filter(
                (option) => option !== optionName
            )]
      
        }
      
        setSelectedCheckboxChoices(updatedCheckboxChoices)
      }
      

    const addToBasket = () => {

        /**
         * Validate the food choices that has required (true) property
         * and iterate through 'selectedCheckboxChoices' if there is options selected 
         * by checking their index
         */
        const choiceArr = []
        setChoiceError([])
        if (selectedFood.has_choices) {
            selectedFood.food_choices.forEach((choice, index) => {
                if (choice.type === 'checkbox' && choice.required) {
                    let exist = false
                    selectedCheckboxChoices.forEach(c => {
                        if (c.selectedOption.length && c.choiceIndex === index) {
                            exist = true
                        }
                    })

                    if (!exist) {
                        choiceArr.push(index)
                    }

                }

                if (choice.type === 'radio' && choice.required) {
                    let exist = false
                    selectedRadioChoices.forEach(radio => {
                        if (radio.selectedOption.length && radio.choiceIndex === index) {
                            exist = true
                        }
                    })

                    if (!exist) {
                        choiceArr.push(index)
                    }
                }
            })

            setChoiceError([...choiceArr])
        }

        if (choiceArr.length) {
            return
        }

        const arr = []
        if (selectedRadioChoices.length) {
            arr.push(...selectedRadioChoices)
        }
        if (selectedCheckboxChoices.length) {
            arr.push(...selectedCheckboxChoices)
        }

        const food = {
            uuid: uuidv4(),
            ...selectedFood,
            foodQuantity,
            instruction,
            choice_options: arr ? arr : []
        }

        setAddToBasketLoading(true)
        dispatch({ type: 'ADD_TO_BASKET', payload: food })

        setTimeout(() => {
            setAddToBasketLoading(false)
        }, 1000)
    }

    return (
        <div className="my-6 pb-12">
            <div className="px-4 md:px-10 flex flex-col space-y-12 md:flex-row md:space-x-12 md:space-y-6" >
                <div className="md:w-1/2" style={{ height: '22rem' }}>
                    <div className="flex space-x-2">
                        <span
                            className="cursor-pointer"
                            onClick={() => selectFood(false)} >
                            <img src="/arrow-left.svg" className="w-5 mt-0.5" alt="" />
                        </span>
                        <p className="">Back to menu</p>
                    </div>
                    <img
                        src="/food_image.png"
                        className="w-full mt-2 rounded-md h-full object-cover"
                        alt="" />
                </div>
                <div className="md:w-1/2 space-y-4 mt-6" style={{ height: '18rem' }}>
                    <div className="flex justify-between">
                        <h1 className="text-bold text-lg md:text-2xl text-orange-500">
                            {selectedFood.name}
                        </h1>
                        <div className="flex space-x-3 mt-2">
                            <img src="/heart.svg" className="w-4" alt="" />
                            <p className="font-semibold text-sm md:text-base">4.8 (23 ratings)</p>
                        </div>
                    </div>

                    <div className=" h-full overflow-auto">
                        <div>
                            <p className="text-gray-800">Description</p>
                            <p className="">{selectedFood.description}</p>
                        </div>

                        {selectedFood.has_choices && selectedFood.food_choices.map((choice, choiceIndex) => {
                            return (
                                <div key={choiceIndex} className='py-4 cursor-pointer'>
                                    <div className={choiceError.includes(choiceIndex)
                                        ? "p-4 rounded-sm border border-red-500 bg-slate-100"
                                        : "p-4 rounded-sm bg-slate-100"}>
                                        <div className="flex space-x-4">
                                            <h1 className='text-lg text-gray-700'>{choice.title}</h1>
                                            {choice.required && (
                                                <p className="text-xs text-red-500">*Required</p>
                                            )}
                                        </div>
                                        <p className="text-sm text-gray-600">Choose up to {choice.select_count}.</p>
                                    </div>

                                    <div className='p-4'>
                                        {choice.options.map((option, optionIndex) => (
                                            <ChoiceOptionDetails
                                                key={optionIndex}
                                                choice={choice}
                                                option={option}
                                                handleRadioOption={handleRadioOption}
                                                handleCheckboxOption={handleCheckboxOption}
                                                selectedCheckboxChoices={selectedCheckboxChoices}
                                                choiceIndex={choiceIndex}
                                            />
                                        )
                                        )}
                                    </div>

                                </div>
                            )

                        })}

                        {selectedFood.has_instructions && (
                            <div className="space-y-3 mt-3">
                                <div className='py-4 px-6 cursor-pointer shadow-sm rounded-md bg-slate-100'>
                                    <h1 className="text-lg text-gray-700">Special Instructions</h1>
                                </div>

                                <div className='px-1 cursor-pointer shadow-sm rounded-md bg-slate-100'>
                                    <textarea
                                        onChange={(e) => setInstruction(e.target.value)}
                                        className="p-4 max-h-56 min-h-fit bg-slate-100"
                                        style={{ width: "100%" }}
                                        rows="5"
                                        placeholder="Add note"></textarea>
                                </div>
                            </div>
                        )}
                    </div>

                    <p className="font-semibold text-2xl text-orange-500">
                        <span className="text-lg md:text-4xl">₱ </span>
                        {selectedFood.price.toLocaleString()}
                    </p>
                    <div className="flex">
                        <button
                            disabled={foodQuantity === 1}
                            onClick={() => setFoodQuantity(foodQuantity - 1)}
                            className={foodQuantity === 1
                                ? "py-2 px-4 border cursor-not-allowed border-e-0 border-gray-400"
                                : "py-2 px-4 border border-e-0 border-gray-400"}>
                            -
                        </button>
                        <p className="py-2 px-4 border border-gray-400">{foodQuantity}</p>
                        <button
                            onClick={() => setFoodQuantity(foodQuantity + 1)}
                            className="py-2 px-4 border border-s-0 border-gray-400">
                            +
                        </button>
                    </div>

                    <button
                        onClick={addToBasket}
                        className={addToBasketLoading
                            ? "uppercase w-full rounded-md py-2 px-4 bg-green-400 text-white"
                            : "uppercase w-full rounded-md py-2 px-4 bg-orange-500 hover:bg-orange-600 text-white"}>
                        {addToBasketLoading
                            ? 'ADDED!'
                            : 'ADD TO BASKET'}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ShowFood;