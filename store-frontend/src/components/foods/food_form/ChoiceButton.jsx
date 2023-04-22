const ChoiceButton = ({ title, toggle, setSelectedChoice, type }) => {
    return (
        <button onClick={() => {
            toggle(true)
            setSelectedChoice(type)
        }} type='button' className='px-2 py-1 text-sm bg-gray-600 hover:bg-gray-700 text-white'>
            {title}
        </button>
    );
}

export default ChoiceButton;