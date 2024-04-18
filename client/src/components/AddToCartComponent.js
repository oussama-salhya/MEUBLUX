import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addTocart } from '../Features/cart/cartSlice';
import Quantity from './Quantity'

const AddToCartComponent = ({ productAmountLeft }) => {
    const { id, stock, name, price, mainImage: image, colors } = useSelector(store => store.products.singleProduct)
    const [selectedColor, setSelectedColor] = useState(0)
    const [amount, setAmount] = useState(1);
    const dispatch = useDispatch()
    const increase = () => {
        setAmount((oldValue) => {
            if (oldValue + 1 <= productAmountLeft)
                return oldValue + 1
            return oldValue
        })
    }
    const decrease = () => {
        setAmount((oldValue) => {
            if (oldValue - 1 <= 0)
                return oldValue
            return oldValue - 1
        })
    }
    const addToCart = () => {
        dispatch(addTocart({ id, stock, name, price, amount, image }))
        setAmount(1)
    }
    return (
        <div className='add-to-cart'>
            <p className="info">
                <span>colors : </span>
                <span className="container-colors">
                    {
                        colors &&
                        colors.map((color, index) => {
                            return <span
                                className={`${selectedColor === index ? 'color selected' : 'color'}`}
                                key={index}
                                style={{ background: `${color}` }}
                                onClick={() => setSelectedColor(index)}
                            >

                            </span>
                        })
                    }
                </span>
            </p>
            <Quantity
                amount={amount}
                increase={increase}
                decrease={decrease}
            />
            <button
                className="dark-btn"
                onClick={addToCart}
            >
                add to cart
            </button>


        </div>
    )
}

export default AddToCartComponent
