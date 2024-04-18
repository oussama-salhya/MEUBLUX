import React from 'react'
import styled from 'styled-components'
import { TiDeleteOutline } from 'react-icons/ti'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { decreaseAmount, increaseAmount, removeItem } from '../Features/cart/cartSlice'
// import Quantity from './Quantity'
import { Price, Quantity } from '../components'
const CartItem = ({ id, image, price, amount, name }) => {
    const dispatch = useDispatch()
    const increase = () => {
        dispatch(increaseAmount({ id }))
    }
    const decrease = () => {
        dispatch(decreaseAmount({ id }))
    }
    const remove = () => {
        dispatch(removeItem({ id }))
    }
    return (
        <Wrapper>
            <button type='button' className='remove-btn' onClick={remove}>
                <TiDeleteOutline />
            </button>
            <div className="container-img">
                <Link to={`/products/${id}`}>
                    <img src={image} alt={name} />
                </Link>
            </div>
            <div className="content">
                <div className="name-price">
                    <div className="name">
                        <Link className='link' to={`/products/${id}`}>
                            {name.toLowerCase()}
                        </Link>
                    </div>
                    <Quantity
                        increase={increase}
                        decrease={decrease}
                        amount={amount}
                    />
                </div>
                <div className="sub-total">
                    <Price price={price} />
                </div>
            </div>
        </Wrapper>
    )
}
const Wrapper = styled.div`
    position: relative;
    display: flex;
    /* align-items: center;
    width: 100%; */
    margin-bottom: 25px;
    .remove-btn{
        margin-right: 1.875rem;
    }
    .remove-btn svg{
        width: 35px;
        height: 35px;
    }

    .container-img img{
        max-width: 6.875rem;
    }
    .content {
        display: flex;
        align-items: center;
        width: 100%;
    }
    .content .name-price , .container-img{
        margin-right: 1.875rem;
    }
    .content .name{
        color: #000000;
        font-size: 18px;
        line-height: 1.3;
        font-weight: 600;
        text-transform : capitalize;
    }
    .quantity {
        margin-top : 5px;
    }
    .sub-total{
        margin-left: auto;
        text-align: right;
        line-height: 1;
    }
    .sub-total > span{
        font-size: 22px;
        line-height: 1;
        font-weight: 600;
        color: #000000;
        text-align: right;
    }
    @media screen and (max-width : 1200px){
        .container-img img{
            max-width: 5.625rem;
        }
        
    }
    @media screen and (max-width : 1000px){
        .remove-btn{
            position: absolute;
            left: -20px;
            top: -20px;
        }
        .remove-btn  svg{
            width: 20px;
        }
        .container-img img{
            max-width:4.375rem;
        }
        .content .name-price, .container-img{
            margin-right: 1.25rem;
        }
    }
    @media screen and (max-width : 500px){
        .content{
            flex-direction:column ; 
            align-items : flex-start; 
        }
        .content .name{
            font-size : 1rem;
        }
        .sub-total > span:last-child{
            font-size : 1rem;
        }
        .sub-total{
            margin-left : 0;
            text-align : left;
            margin-top: 10px;
        }

    }

`

export default CartItem
