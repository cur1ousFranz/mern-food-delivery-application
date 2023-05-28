import { useContext, useEffect, useState } from "react";
import { BasketContext } from "../../context/BasketContext";
import CheckoutFood from "../../components/checkout/CheckoutFood";
import { Link } from "react-router-dom";
import { AuthContext } from '../../context/AuthContext'
import { useNavigate } from "react-router-dom";
import axiosClient from "../../axios";
import alert from "../../alert";
import SessionExpired from "../../components/SessionExpired";

const Checkout = () => {
    const navigate = useNavigate();
    const { dispatch } = useContext(BasketContext)
    const { basket } = useContext(BasketContext)
    const [totalPrice, setTotalPrice] = useState(0)
    const { user } = useContext(AuthContext)
    const [sessionExpired, setSessionExpired] = useState(false)

    const paymentButton = async () => {
        if (!user) {
            navigate('/signin')
            return
        }

        // SKIP Payment flow, direct to place the error
        const orders = []
        basket.map(food => {
            const { _id, store_id, foodQuantity, has_choices,
                choice_options, has_instructions, instruction,
            } = food

            const total_price = (food.price + food.choicesPrice) * food.foodQuantity

            orders.push({
                food_id: _id,
                store_id,
                food_quantity: foodQuantity,
                has_choices,
                choice_options,
                has_instructions,
                instruction,
                total_price,
                payment_type: 'COD',
                status: 'Pending'
            })
        })

        try {
            for (const order of orders) {
                await axiosClient.post('/orders', order)
            }

            basket.forEach(food => {
                dispatch({ type: 'REMOVE_TO_BASKET', payload: { uuid: food.uuid } })
            })

            alert('Order placed successfully')

        } catch (error) {
            if (error.response.data.error === 'Session Expired') {
                setSessionExpired(true)
                return
            }
        }

    }

    useEffect(() => {
        if (basket) {
            let sumPrice = 0
            basket.forEach(food => {
                sumPrice += (food.price + food.choicesPrice) * food.foodQuantity

            })
            setTotalPrice(sumPrice)
        }
    }, [basket])

    useEffect(() => {
        const options = {
            top: 0,
            left: 0,
            behavior: 'smooth'
        }
        window.scrollTo(options)

    }, [])

    return (
        <div className="px-4 md:px-12 py-8 bg-slate-50" >
            <h1 className="uppercase md:text-2xl font-semibold text-gray-700">Checkout</h1>
            <div className="flex space-x-4 mt-3">
                <div className="w-2/3">

                    <div className="border rounded-md font-semibold p-4 shadow-sm bg-white">
                        <h1 className="font-semibold text-lg text-gray-700">Order Summary</h1>
                        <div className="mt-4 text-lg grid grid-cols-4 text-gray-700">
                            <h1>Food</h1>
                            <h1>Name</h1>
                            <h1>Quantity</h1>
                            <h1>Total</h1>
                        </div>
                    </div>

                    {basket.length > 0 && (
                        <div className="border max-h-screen overflow-auto rounded-md mt-4 p-4 shadow-sm text-gray-700 bg-white">
                            {basket.map(food => (
                                <CheckoutFood food={food} key={food.uuid} />
                            ))}
                        </div>
                    )}

                    {!basket.length && (
                        <div className="border rounded-md mt-4 font-semibold px-4 py-24 shadow-sm text-gray-500 bg-white">
                            <h1 className="text-center">Your basket is empty.</h1>
                        </div>
                    )}

                </div>
                <div className="w-1/3">
                    <div className="border rounded-md font-semibold p-4 shadow-sm text-gray-700 bg-white">
                        <h1 className="text-xl text-gray-700">Order Total</h1>
                        <h2 className="mt-3 text-gray-700">Taxes & Other fees
                            <span className="inline-block ml-2">
                                <img src="/img/info-circle-fill.svg" alt="" />
                            </span>
                        </h2>
                        <div className="mt-3 flex justify-between">
                            <h2 className=" text-gray-700">Discount</h2>
                            <p className=" text-gray-700">0%</p>
                        </div>
                        <div className="mt-3 flex justify-between">
                            <h2 className="font-semibold text-xl text-gray-700">Total</h2>
                            <p className="text-lg text-gray-700">
                                <span className="me-2 text-2xl text-orange-500">₱</span>
                                {totalPrice.toLocaleString()}
                            </p>
                        </div>
                        <div className="mt-3 flex justify-between">
                            {basket.length > 0 && (
                                <button
                                    onClick={paymentButton}
                                    className="uppercase w-full rounded-sm py-2 px-4 bg-orange-500 hover:bg-orange-400 text-white">
                                    Continue to Payment
                                </button>
                            )}

                            {basket.length === 0 && (
                                <Link to={'/'} className="uppercase text-center w-full rounded-sm py-2 px-4 bg-gray-500 hover:bg-gray-400 text-white">
                                    Add Item
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {sessionExpired && (
                <SessionExpired />
            )}
        </div>
    );
}

export default Checkout;